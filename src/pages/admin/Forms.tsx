import React, { useState } from "react";
import {
  Mail,
  User,
  Calendar,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const Forms = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      type: "Contact Form",
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Tech Corp",
      service: "Test Automation",
      message:
        "We are looking for comprehensive test automation services for our web application...",
      submitted: "2025-01-15 10:30 AM",
      status: "New",
      source: "Contact Page",
    },
    {
      id: 2,
      type: "Demo Request",
      name: "Sarah Johnson",
      email: "sarah.j@startup.io",
      company: "StartupXYZ",
      demoType: "Platform Overview",
      preferredTime: "2:00 PM - 2:30 PM",
      teamSize: "6-20 people",
      useCase: "web-testing",
      submitted: "2025-01-14 2:15 PM",
      status: "Contacted",
      source: "Demo Page",
    },
    {
      id: 3,
      type: "Free Trial",
      name: "Mike Chen",
      email: "mike@company.com",
      company: "Enterprise Inc",
      teamSize: "21-50 people",
      useCase: "automation",
      submitted: "2025-01-13 4:45 PM",
      status: "Converted",
      source: "Free Trial Page",
    },
    {
      id: 4,
      type: "Newsletter Signup",
      name: "Lisa Wang",
      email: "lisa.wang@tech.com",
      submitted: "2025-01-12 9:20 AM",
      status: "Subscribed",
      source: "Blog Page",
    },
    {
      id: 5,
      type: "Career Application",
      name: "David Park",
      email: "david.park@email.com",
      position: "Senior QA Engineer",
      experience: "5+ years",
      resume: "david_park_resume.pdf",
      submitted: "2025-01-11 11:00 AM",
      status: "Under Review",
      source: "Careers Page",
    },
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const stats = [
    {
      title: "Total Submissions",
      value: submissions.length.toString(),
      change: "+5 this week",
      icon: Mail,
      color: "bg-blue-500",
    },
    {
      title: "New Submissions",
      value: submissions.filter((s) => s.status === "New").length.toString(),
      change: "2 pending review",
      icon: AlertCircle,
      color: "bg-orange-500",
    },
    {
      title: "Contact Forms",
      value: submissions
        .filter((s) => s.type === "Contact Form")
        .length.toString(),
      change: "+1 today",
      icon: User,
      color: "bg-teal-500",
    },
    {
      title: "Demo Requests",
      value: submissions
        .filter((s) => s.type === "Demo Request")
        .length.toString(),
      change: "+2 this week",
      icon: Calendar,
      color: "bg-purple-500",
    },
  ];

  const formTypes = [
    "all",
    "Contact Form",
    "Demo Request",
    "Free Trial",
    "Newsletter Signup",
    "Career Application",
  ];

  const statusTypes = [
    "all",
    "New",
    "Contacted",
    "Under Review",
    "Converted",
    "Subscribed",
    "Closed",
  ];

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesStatus =
      filterStatus === "all" || submission.status === filterStatus;
    const matchesType = filterType === "all" || submission.type === filterType;
    return matchesStatus && matchesType;
  });

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      setSubmissions(submissions.filter((sub) => sub.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Converted":
        return "bg-green-100 text-green-800";
      case "Subscribed":
        return "bg-teal-100 text-teal-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Contact Form":
        return User;
      case "Demo Request":
        return Calendar;
      case "Free Trial":
        return CheckCircle;
      case "Newsletter Signup":
        return Mail;
      case "Career Application":
        return User;
      default:
        return Mail;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Form Management
            </h1>
            <p className="text-gray-600">
              Manage all form submissions and inquiries
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Email notifications active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              <p className="text-xs text-teal-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {formTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {statusTypes.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Form Submissions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => {
                  const TypeIcon = getTypeIcon(submission.type);
                  return (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.company || "No company"}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {submission.submitted}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.email}
                        </div>
                        {submission.service && (
                          <div className="text-sm text-gray-500">
                            Interest: {submission.service}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TypeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {submission.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={submission.status}
                          onChange={(e) =>
                            handleStatusChange(submission.id, e.target.value)
                          }
                          className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(
                            submission.status
                          )}`}
                        >
                          {statusTypes
                            .filter((s) => s !== "all")
                            .map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="text-teal-600 hover:text-teal-900 p-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(submission.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submission Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submission Details
                  </h3>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.type}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        selectedSubmission.status
                      )}`}
                    >
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>

                {selectedSubmission.company && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.company}
                    </p>
                  </div>
                )}

                {selectedSubmission.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {selectedSubmission.message}
                    </p>
                  </div>
                )}

                {selectedSubmission.service && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Service Interest
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.service}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Submitted
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.submitted}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Source
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.source}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Forms;
