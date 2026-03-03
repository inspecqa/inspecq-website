import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Mail, Settings, LogOut,
  Menu, X, FileText, Briefcase, BookOpen, Activity, FlaskConical, Target, Send, LayoutTemplate, Megaphone
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import inspecqLogo from "../../assets/logo.png"

interface AdminLayoutProps { children: React.ReactNode; }

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Leads CRM", href: "/admin/leads", icon: Target },
    { name: "Proposals", href: "/admin/proposals", icon: Send },
    { name: "Cold Campaigns", href: "/admin/cold-emails", icon: Megaphone },
    { name: "Templates", href: "/admin/templates", icon: LayoutTemplate },
    { name: "Forms", href: "/admin/forms", icon: FileText },
    { name: "Trials", href: "/admin/trials", icon: FlaskConical },
    { name: "Careers", href: "/admin/careers", icon: Users },
    { name: "Applications", href: "/admin/applications", icon: Briefcase },
    { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { name: "Blog", href: "/admin/blog", icon: BookOpen },
    { name: "Activity", href: "/admin/activity", icon: Activity },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (item: typeof navigation[0]) => {
    if (item.exact) return location.pathname === item.href;
    return location.pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile backdrop */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 lg:shrink-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 shrink-0">
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <img src={inspecqLogo} alt="InspecQ Logo" className="h-8 w-8" />
            <span className="text-lg font-bold text-gray-900">InspecQ Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>

        {/* Nav */}
        <nav className="mt-4 px-3 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map(item => (
              <li key={item.name}>
                <Link to={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-sm ${isActive(item) ? "bg-teal-50 text-teal-700 font-semibold border-r-2 border-teal-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200 shrink-0">
          <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" /><span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center h-12 px-4 bg-white border-b border-gray-200 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"><Menu className="h-5 w-5" /></button>
          <span className="ml-3 text-sm font-medium text-gray-700">InspecQ Admin</span>
        </div>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
