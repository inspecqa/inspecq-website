import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Send,
  Users,
  TrendingUp,
  Mail,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const Newsletter = () => {
  const [subscribers] = useState([
    {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      subscribed: "2025-01-15",
      status: "Active",
    },
    {
      id: 2,
      email: "jane.smith@company.com",
      name: "Jane Smith",
      subscribed: "2025-01-14",
      status: "Active",
    },
    {
      id: 3,
      email: "mike.johnson@startup.io",
      name: "Mike Johnson",
      subscribed: "2025-01-13",
      status: "Active",
    },
    {
      id: 4,
      email: "sarah.wilson@tech.com",
      name: "Sarah Wilson",
      subscribed: "2025-01-12",
      status: "Unsubscribed",
    },
  ]);

  const [campaigns] = useState([
    {
      id: 1,
      subject: "QA Best Practices for 2025",
      status: "Sent",
      sent: "2025-01-15",
      opens: 89,
      clicks: 23,
      recipients: 1247,
    },
    {
      id: 2,
      subject: "New Testing Tools Review",
      status: "Draft",
      sent: null,
      opens: 0,
      clicks: 0,
      recipients: 0,
    },
    {
      id: 3,
      subject: "Mobile Testing Trends",
      status: "Scheduled",
      sent: "2025-01-20",
      opens: 0,
      clicks: 0,
      recipients: 1250,
    },
  ]);

  const stats = [
    {
      title: "Total Subscribers",
      value: subscribers.length.toString(),
      change: "+12 this week",
      icon: Users,
      color: "bg-teal-500",
    },
    {
      title: "Active Subscribers",
      value: subscribers.filter((s) => s.status === "Active").length.toString(),
      change: "94% active rate",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Campaigns Sent",
      value: campaigns.filter((c) => c.status === "Sent").length.toString(),
      change: "1 this month",
      icon: Mail,
      color: "bg-purple-500",
    },
    {
      title: "Avg Open Rate",
      value: "7.1%",
      change: "+0.5% vs last month",
      icon: Eye,
      color: "bg-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Newsletter Management
            </h1>
            <p className="text-gray-600">
              Manage subscribers and email campaigns
            </p>
          </div>
          <Link
            to="/admin/newsletter/compose"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Compose Newsletter</span>
          </Link>
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

        {/* Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Email Campaigns
            </h2>
            <Link
              to="/admin/newsletter/compose"
              className="text-teal-600 hover:text-teal-700 font-medium text-sm"
            >
              Create New Campaign
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.subject}
                        </div>
                        <div className="text-sm text-gray-500">
                          {campaign.sent
                            ? `Sent: ${campaign.sent}`
                            : "Not sent yet"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === "Sent"
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.recipients > 0
                        ? campaign.recipients.toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {campaign.status === "Sent" ? (
                        <div className="text-sm">
                          <div className="text-gray-900">
                            {campaign.opens} opens
                          </div>
                          <div className="text-gray-500">
                            {campaign.clicks} clicks
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-teal-600 hover:text-teal-900 p-1"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {campaign.status === "Draft" && (
                          <button
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Send"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscribers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Subscribers
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscriber
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {subscriber.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subscriber.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subscriber.subscribed}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscriber.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Newsletter;
