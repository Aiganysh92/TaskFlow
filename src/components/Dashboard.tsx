import React from 'react';
import { Layers, Clock, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="mb-8">
      {/* Top Banner / Progress overview */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/10 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">
            <span>Productivity Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {stats.completed === stats.total && stats.total > 0
              ? '🎉 All tasks completed! Great job!'
              : stats.total === 0
              ? 'Welcome to TaskFlow! Get started by adding a task.'
              : `You have ${stats.active} active task${stats.active === 1 ? '' : 's'} pending.`}
          </h2>
        </div>

        {stats.total > 0 && (
          <div className="w-full md:w-64 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/20">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-blue-100">Overall Progress</span>
              <span className="text-white font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Tasks Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total Tasks</p>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.total}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-105 transition-transform">
            <Layers className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Active Tasks</p>
            <p className="text-3xl font-extrabold text-amber-600 tracking-tight">{stats.active}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-105 transition-transform">
            <Clock className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Completed</p>
            <p className="text-3xl font-extrabold text-emerald-600 tracking-tight">{stats.completed}</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>
      </div>
    </div>
  );
};
