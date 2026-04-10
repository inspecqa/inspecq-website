import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, BarChart3, RefreshCw, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

interface ScorecardLead {
  id: string;
  email: string;
  score: number;
  band: string;
  category_scores: Record<string, number>;
  created_at: string;
}

const bandColors: Record<string, string> = {
  "High Priority": "bg-red-100 text-red-800",
  "At risk": "bg-red-100 text-red-800",
  "Needs work": "bg-amber-100 text-amber-800",
  Developing: "bg-teal-100 text-teal-800",
  Strong: "bg-green-100 text-green-800",
};

const ScorecardLeads = () => {
  const [leads, setLeads] = useState<ScorecardLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) throw new Error("Supabase client not initialized");
      const { data, error: sbError } = await supabase
        .from("scorecard_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (sbError) throw sbError;
      setLeads(data as ScorecardLead[]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load scorecard leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Compute average category scores for the bar chart
  const computeChartData = () => {
    if (leads.length === 0) return [];
    const totals: Record<string, number> = {};
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      if (lead.category_scores) {
        Object.entries(lead.category_scores).forEach(([cat, score]) => {
          totals[cat] = (totals[cat] || 0) + score;
          counts[cat] = (counts[cat] || 0) + 1;
        });
      }
    });

    return Object.keys(totals).map((cat) => ({
      name: cat,
      avgScore: Math.round(totals[cat] / counts[cat]),
    }));
  };

  const chartData = computeChartData();

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              QA Scorecard Leads
            </h1>
            <p className="text-gray-600">
              Review submissions from the QA Scorecard assessment tool.
            </p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-teal-500 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Scorecard Leads</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? "—" : leads.length}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Users who have completed the 20-question assessment and generated
              a QA maturity report.
            </p>
          </div>

          <div className="lg:col-span-2 border border-gray-200 bg-white rounded-xl p-5 shadow-sm min-h-[300px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-teal-600" /> Average
              Category Scores
            </h3>
            {loading ? (
              <div className="flex items-center justify-center h-48 space-x-2 text-teal-600">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : chartData.length > 0 ? (
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <RechartsTooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Bar dataKey="avgScore" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                Not enough data yet
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-800">Recent Assessments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Total Score</th>
                  <th className="px-6 py-4">Maturity Band</th>
                  <th className="px-6 py-4">Date Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-teal-600 mb-2" />
                      Loading...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No scorecard leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          {l.email}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">
                        {l.score}
                        <span className="text-gray-400 font-normal text-sm">
                          /100
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                            bandColors[l.band] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {l.band}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(l.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ScorecardLeads;
