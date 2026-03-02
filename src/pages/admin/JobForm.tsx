import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ChevronLeft,
    Save,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getJobPosting,
    createJobPosting,
    updateJobPosting,
} from "../../lib/adminService";

interface FormData {
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    status: string;
    description: string;
    requirements: string;
    benefits: string;
}

const EMPTY: FormData = {
    title: "",
    department: "Engineering",
    location: "",
    type: "Full-time",
    salary: "",
    status: "Draft",
    description: "",
    requirements: "",
    benefits: "",
};

const departments = [
    "Engineering", "Product", "Design", "Sales", "Marketing",
    "Customer Success", "Operations", "Finance", "HR",
];

const JobForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState<FormData>(EMPTY);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    // Load existing job if editing
    useEffect(() => {
        if (!isEdit || !id) return;
        setLoading(true);
        getJobPosting(id)
            .then((job) => {
                if (!job) { setFetchError("Job not found."); return; }
                setFormData({
                    title: job.title, department: job.department, location: job.location,
                    type: job.type, salary: job.salary ?? "", status: job.status,
                    description: job.description ?? "", requirements: job.requirements ?? "",
                    benefits: job.benefits ?? "",
                });
            })
            .catch(() => setFetchError("Failed to load job posting."))
            .finally(() => setLoading(false));
    }, [id, isEdit]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = (): boolean => {
        const required: (keyof FormData)[] = ["title", "location", "description"];
        const newErrors: Partial<FormData> = {};
        required.forEach((field) => {
            if (!formData[field].trim()) newErrors[field] = "This field is required.";
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            if (isEdit && id) {
                await updateJobPosting(id, formData);
            } else {
                await createJobPosting(formData);
            }
            setSaved(true);
            setTimeout(() => navigate("/admin/careers"), 1000);
        } catch (err) {
            setFetchError("Failed to save job posting. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const Field = ({
        label, name, type = "text", required = false, children,
    }: {
        label: string; name: keyof FormData; type?: string; required?: boolean;
        children?: React.ReactNode;
    }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children ?? (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors[name] ? "border-red-300" : "border-gray-300"
                        }`}
                />
            )}
            {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
        </div>
    );

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button
                            onClick={() => navigate("/admin/careers")}
                            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Careers
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEdit ? "Edit Job Posting" : "Create Job Posting"}
                        </h1>
                    </div>
                    {saved && (
                        <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Saved!</span>
                        </div>
                    )}
                </div>

                {fetchError && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm">{fetchError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                        <Field label="Job Title" name="title" required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500">
                                    {departments.map((d) => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                            <Field label="Location" name="location" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500">
                                    {["Full-time", "Part-time", "Contract", "Internship"].map((t) => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <Field label="Salary / Range" name="salary" />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500">
                                    {["Draft", "Active", "Inactive"].map((s) => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
                        {(["description", "requirements", "benefits"] as const).map((field) => (
                            <Field key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} name={field} required={field === "description"}>
                                <textarea
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder={
                                        field === "description" ? "Describe the role and responsibilities..."
                                            : field === "requirements" ? "List key requirements, skills needed..."
                                                : "Describe benefits, perks, culture..."
                                    }
                                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 resize-y ${errors[field] ? "border-red-300" : "border-gray-300"
                                        }`}
                                />
                            </Field>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4 pb-8">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/careers")}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center space-x-2 bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
                        >
                            <Save className="h-5 w-5" />
                            <span>{loading ? "Saving..." : isEdit ? "Update Job" : "Create Job"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default JobForm;
