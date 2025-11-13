import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Mail,
  FileText,
  BarChart3,
  Calendar,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Job Postings",
      value: "12",
      change: "+2 this month",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Form Submissions",
      value: "47",
      change: "+8 this week",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Newsletter Subscribers",
      value: "1,247",
      change: "+89 this week",
      icon: Mail,
      color: "bg-teal-500",
    },
    {
      title: "Open Positions",
      value: "8",
      change: "3 urgent",
      icon: Calendar,
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      action: "New form submission received",
      details: "Contact form from john.doe@example.com",
      time: "1 hour ago",
      type: "form",
    },
    {
      action: "New job application received",
      details: "Senior QA Engineer position",
      time: "2 hours ago",
      type: "application",
    },
    {
      action: "Newsletter subscriber added",
      details: "john.doe@example.com",
      time: "4 hours ago",
      type: "newsletter",
    },
    {
      action: "Newsletter sent",
      details: "Monthly QA Insights - December 2024",
      time: "2 days ago",
      type: "newsletter",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your admin panel.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              <p className="text-xs text-teal-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/careers/new"
              className="bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-4 text-center transition-colors duration-200"
            >
              <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <p className="font-medium text-teal-900">Add New Job</p>
            </Link>
            <Link
              to="/admin/forms"
              className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors duration-200"
            >
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-900">View Forms</p>
            </Link>
            <Link
              to="/admin/newsletter/compose"
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors duration-200"
            >
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-blue-900">Send Newsletter</p>
            </Link>
            <Link
              to="/admin/newsletter"
              className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition-colors duration-200"
            >
              <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="font-medium text-orange-900">Newsletter Stats</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "application"
                      ? "bg-teal-500"
                      : activity.type === "newsletter"
                      ? "bg-blue-500"
                      : activity.type === "form"
                      ? "bg-green-500"
                      : "bg-purple-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
