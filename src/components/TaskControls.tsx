import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { FilterStatus, Priority, SortOption, SortOrder } from '../types/task';

interface TaskControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: FilterStatus;
  setStatusFilter: (status: FilterStatus) => void;
  priorityFilter: Priority | 'all';
  setPriorityFilter: (priority: Priority | 'all') => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export const TaskControls: React.FC<TaskControlsProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mb-6 space-y-4">
      {/* Top row: Search input and Status tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status filter tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg self-start md:self-auto">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-all ${
                statusFilter === status
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row: Priority filter & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-slate-600">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="border border-slate-300 rounded-md py-1 px-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-slate-300 rounded-md py-1 px-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-2 py-1 border border-slate-300 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium uppercase"
            title="Toggle sort direction"
          >
            {sortOrder}
          </button>
        </div>
      </div>
    </div>
  );
};
