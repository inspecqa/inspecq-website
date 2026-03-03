import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, LayoutTemplate, Edit3, Trash2, Clock } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getColdTemplates, deleteColdTemplate, ColdEmailTemplate } from "../../lib/adminService";

const ColdTemplatesList = () => {
    const [templates, setTemplates] = useState<ColdEmailTemplate[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const data = await getColdTemplates();
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
        if (!confirm("Are you sure you want to delete this outreach template?")) return;
        const original = [...templates];
        setTemplates(prev => prev.filter(t => t.id !== id));
        try {
            await deleteColdTemplate(id);
        } catch (err) {
            console.error(err);
            setTemplates(original);
            alert("Failed to delete template.");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Outreach Templates</h1>
                        <p className="text-gray-600">Manage templates for your cold email campaigns.</p>
                    </div>
                    <Link to="/admin/cold-emails/templates/new" className="flex items-center space-x-2 px-4 py-2 bg-teal-600 rounded-lg text-sm font-medium text-white hover:bg-teal-700 transition shadow-sm">
                        <Plus className="h-4 w-4" /><span>New Template</span>
                    </Link>
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
                        <h3 className="text-lg font-medium text-gray-900">No outreach templates</h3>
                        <p className="text-gray-500 mt-1 max-w-sm mx-auto">Create your first cold email template to start sending campaigns.</p>
                        <Link to="/admin/cold-emails/templates/new" className="mt-6 inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                            <Plus className="h-4 w-4 mr-1" /> Create Template
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map(t => (
                            <div key={t.id} className="bg-white flex flex-col rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group overflow-hidden">
                                <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-bold text-gray-900 text-lg line-clamp-1 pr-2" title={t.name}>{t.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium mb-2 line-clamp-1">Subj: {t.subject}</p>
                                    <div className="text-xs text-gray-400 flex items-center mt-4">
                                        <Clock className="h-3.5 w-3.5 mr-1" />
                                        Updated {new Date(t.updated_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 bg-gray-50 p-3 flex justify-end gap-2">
                                    <Link to={`/admin/cold-emails/templates/${t.id}/edit`} className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded bg-white border border-gray-200 shadow-sm transition-colors text-xs font-medium flex items-center">
                                        <Edit3 className="h-3.5 w-3.5 mr-1.5" /> Edit
                                    </Link>
                                    <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded bg-white border border-gray-200 shadow-sm transition-colors">
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ColdTemplatesList;
