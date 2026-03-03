import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, LayoutTemplate, Edit3, Trash2, Clock } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getTemplates, deleteTemplate, ProposalTemplate } from "../../lib/adminService";

const TemplatesList = () => {
    const [templates, setTemplates] = useState<ProposalTemplate[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const data = await getTemplates();
            setTemplates(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this template?")) return;

        // Optimistic delete
        const original = [...templates];
        setTemplates(prev => prev.filter(t => t.id !== id));

        try {
            await deleteTemplate(id);
        } catch {
            setTemplates(original);
            alert("Failed to delete template");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-12 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposal Templates</h1>
                        <p className="text-gray-600">Create reusable email templates with variables.</p>
                    </div>
                    <div>
                        <Link to="/admin/templates/new" className="flex items-center space-x-2 px-4 py-2 bg-teal-600 rounded-lg text-sm font-medium text-white hover:bg-teal-700 transition shadow-sm">
                            <Plus className="h-4 w-4" /><span>New Template</span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-48 animate-pulse">
                                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : templates.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-20 text-center">
                        <LayoutTemplate className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No templates found</h3>
                        <p className="text-gray-500 mt-1 max-w-md mx-auto">Create a template to speed up your proposal workflow.</p>
                        <Link to="/admin/templates/new" className="mt-6 inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                            <Plus className="h-4 w-4 mr-1" /> Create Template
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map(t => (
                            <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col hover:shadow-md transition-shadow">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-gray-900 leading-tight">{t.name}</h3>
                                        {t.is_default && <span className="flex-shrink-0 bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>}
                                    </div>
                                    <div className="space-y-2 mt-4 text-sm">
                                        <p className="text-gray-500"><span className="font-semibold text-gray-700">Category:</span> {t.category}</p>
                                        <p className="text-gray-500 line-clamp-2" title={t.subject}><span className="font-semibold text-gray-700">Subject:</span> {t.subject}</p>
                                    </div>
                                </div>
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between rounded-b-xl">
                                    <div className="flex items-center text-xs text-gray-400 font-medium">
                                        <Clock className="w-3.5 h-3.5 mr-1" /> {new Date(t.updated_at).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Link to={`/admin/templates/${t.id}/edit`} className="text-teal-600 hover:text-teal-800 font-medium text-sm flex items-center">
                                            <Edit3 className="h-4 w-4 mr-1" /> Edit
                                        </Link>
                                        {!t.is_default && (
                                            <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default TemplatesList;
