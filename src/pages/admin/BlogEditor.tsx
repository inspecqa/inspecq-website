import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Save, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getBlogPost, createBlogPost, updateBlogPost } from "../../lib/adminService";

interface FormData {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    cover_image: string;
    tags: string;
    author: string;
    status: string;
}

const EMPTY: FormData = { title: "", slug: "", excerpt: "", body: "", cover_image: "", tags: "", author: "InspecQ Team", status: "Draft" };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const BlogEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [form, setForm] = useState<FormData>(EMPTY);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        if (!isEdit || !id) return;
        setLoading(true);
        getBlogPost(id).then(post => {
            if (!post) { setFetchError("Post not found."); return; }
            setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt ?? "", body: post.body, cover_image: post.cover_image ?? "", tags: (post.tags ?? []).join(", "), author: post.author, status: post.status });
        }).catch(() => setFetchError("Failed to load post.")).finally(() => setLoading(false));
    }, [id, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === "title" && !isEdit ? { slug: slugify(value) } : {}),
        }));
        if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const e: Partial<FormData> = {};
        if (!form.title.trim()) e.title = "Required";
        if (!form.slug.trim()) e.slug = "Required";
        if (!form.body.trim()) e.body = "Required";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = async (publish = false) => {
        if (!validate()) return;
        setLoading(true);
        const data = {
            title: form.title, slug: form.slug, excerpt: form.excerpt, body: form.body,
            cover_image: form.cover_image, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
            author: form.author, status: publish ? "Published" : form.status,
            published_at: publish ? new Date().toISOString() : undefined,
        };
        try {
            if (isEdit && id) await updateBlogPost(id, data);
            else await createBlogPost(data);
            setSaved(true);
            setTimeout(() => navigate("/admin/blog"), 900);
        } catch { setFetchError("Failed to save post."); } finally { setLoading(false); }
    };

    return (
        <AdminLayout>
            <div className={preview ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "max-w-3xl mx-auto"}>
                <div className="space-y-6">
                    <div>
                        <button onClick={() => navigate("/admin/blog")} className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"><ChevronLeft className="h-4 w-4 mr-1" />Back to Blog</button>
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">{isEdit ? "Edit Post" : "New Post"}</h1>
                            <div className="flex items-center space-x-2">
                                {saved && <div className="flex items-center space-x-1 text-green-600 text-sm"><CheckCircle className="h-4 w-4" /><span>Saved!</span></div>}
                                <button onClick={() => setPreview(!preview)} className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span>{preview ? "Hide" : "Preview"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {fetchError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"><AlertCircle className="h-5 w-5" /><p className="text-sm">{fetchError}</p></div>}

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
                        {([["title", "Title", true], ["slug", "URL Slug", true], ["excerpt", "Excerpt (short preview)", false]] as const).map(([name, label, req]) => (
                            <div key={name as string}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{label} {req && <span className="text-red-500">*</span>}</label>
                                <input name={name} value={form[name]} onChange={handleChange} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-teal-500 text-sm ${errors[name] ? "border-red-300" : "border-gray-300"}`} />
                                {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
                            </div>
                        ))}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input name="author" value={form.author} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 text-sm">
                                    <option>Draft</option><option>Published</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                            <input name="tags" value={form.tags} onChange={handleChange} placeholder="QA, Testing, Automation" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                            <input name="cover_image" value={form.cover_image} onChange={handleChange} placeholder="https://…" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 text-sm" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Body <span className="text-red-500">*</span></label>
                        <textarea name="body" value={form.body} onChange={handleChange} rows={16} placeholder="Write your post content here…" className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 resize-y font-mono text-sm ${errors.body ? "border-red-300" : "border-gray-300"}`} />
                        {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body}</p>}
                    </div>

                    <div className="flex items-center justify-end space-x-3 pb-8">
                        <button onClick={() => navigate("/admin/blog")} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
                        <button onClick={() => handleSubmit(false)} disabled={loading} className="flex items-center space-x-2 px-5 py-2.5 border border-teal-600 text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-50 disabled:opacity-50">
                            <Save className="h-4 w-4" /><span>{loading ? "Saving…" : "Save Draft"}</span>
                        </button>
                        <button onClick={() => handleSubmit(true)} disabled={loading} className="flex items-center space-x-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 disabled:opacity-50">
                            <CheckCircle className="h-4 w-4" /><span>{loading ? "Publishing…" : "Publish"}</span>
                        </button>
                    </div>
                </div>

                {preview && (
                    <div className="hidden lg:block sticky top-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-h-[85vh] overflow-y-auto">
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs text-gray-500 font-medium uppercase tracking-wider">Preview</div>
                            <div className="p-6">
                                {form.cover_image && <img src={form.cover_image} alt="Cover" className="w-full h-40 object-cover rounded-lg mb-4" />}
                                {(form.tags.split(",").map(t => t.trim()).filter(Boolean)).map(tag => <span key={tag} className="inline-block text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full mr-1 mb-2">{tag}</span>)}
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{form.title || "Post Title"}</h1>
                                {form.excerpt && <p className="text-gray-500 text-sm mb-4 italic">{form.excerpt}</p>}
                                <p className="text-xs text-gray-400 mb-4">By {form.author}</p>
                                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{form.body || <span className="text-gray-400 italic">Your content will appear here…</span>}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default BlogEditor;
