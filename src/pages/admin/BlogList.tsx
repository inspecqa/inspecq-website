import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus, Edit, Trash2, Eye, RefreshCw, AlertCircle,
    Clock, CheckCircle, FileText, Search,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getBlogPosts, deleteBlogPost, updateBlogPost, BlogPost } from "../../lib/adminService";

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        setLoading(true); setError(null);
        try { setPosts(await getBlogPosts()); }
        catch { setError("Failed to load blog posts."); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this post permanently?")) return;
        setPosts(prev => prev.filter(p => p.id !== id));
        try { await deleteBlogPost(id); } catch { fetchData(); }
    };

    const handleTogglePublish = async (post: BlogPost) => {
        const newStatus = post.status === "Published" ? "Draft" : "Published";
        const published_at = newStatus === "Published" ? new Date().toISOString() : undefined;
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
        try { await updateBlogPost(post.id, { status: newStatus, published_at }); } catch { fetchData(); }
    };

    const filtered = posts.filter(p =>
        !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.excerpt ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { label: "Total Posts", value: posts.length, color: "bg-teal-500" },
        { label: "Published", value: posts.filter(p => p.status === "Published").length, color: "bg-green-500" },
        { label: "Drafts", value: posts.filter(p => p.status === "Draft").length, color: "bg-yellow-500" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog CMS</h1>
                        <p className="text-gray-600">Create, edit and publish blog posts</p>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={fetchData} disabled={loading} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                        <Link to="/admin/blog/new" className="flex items-center space-x-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                            <Plus className="h-5 w-5" /><span>New Post</span>
                        </Link>
                    </div>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"><AlertCircle className="h-5 w-5" /><p className="text-sm">{error}</p></div>}

                <div className="grid grid-cols-3 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                            <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}><FileText className="h-5 w-5 text-white" /></div>
                            <p className="text-2xl font-bold text-gray-900">{loading ? "—" : s.value}</p>
                            <p className="text-sm text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…" className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500" />
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-white border border-gray-200 rounded-xl animate-pulse" />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No blog posts yet.</p>
                        <Link to="/admin/blog/new" className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                            <Plus className="h-4 w-4" /><span>Write your first post</span>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map(post => (
                            <div key={post.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="flex items-center space-x-3 mb-1">
                                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${post.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                            {post.status === "Published" ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                            {post.status}
                                        </span>
                                        <span className="text-xs text-gray-400">{post.author}</span>
                                        {(post.tags ?? []).map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>)}
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900 truncate">{post.title}</h3>
                                    {post.excerpt && <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>}
                                    <p className="text-xs text-gray-400 mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0">
                                    <button onClick={() => handleTogglePublish(post)} className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${post.status === "Published" ? "border-yellow-300 text-yellow-700 hover:bg-yellow-50" : "border-green-300 text-green-700 hover:bg-green-50"}`}>
                                        {post.status === "Published" ? "Unpublish" : "Publish"}
                                    </button>
                                    <Link to={`/admin/blog/${post.id}/edit`} className="text-blue-600 hover:text-blue-900 p-1"><Edit className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900 p-1"><Trash2 className="h-4 w-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Blog;
