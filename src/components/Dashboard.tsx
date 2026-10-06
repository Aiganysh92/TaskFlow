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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Total Tasks Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Tasks</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Layers className="w-6 h-6" />
        </div>
      </div>

      {/* Active Tasks Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Active Tasks</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{stats.active}</p>
        </div>
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-500">Completed</p>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              {completionPercentage}%
            </span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.completed}</p>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
