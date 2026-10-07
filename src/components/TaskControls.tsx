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
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm mb-6 space-y-4">
      {/* Search Bar & Status Tabs */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl self-start lg:self-auto border border-slate-200/50">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                statusFilter === status
                  ? 'bg-white text-blue-600 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Filters & Sorting Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-600">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="border border-slate-200 rounded-xl py-1.5 px-3 bg-slate-50/50 hover:bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-600">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-slate-200 rounded-xl py-1.5 px-3 bg-slate-50/50 hover:bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-2.5 py-1.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white text-slate-700 text-xs font-bold uppercase transition-colors"
            title="Toggle sort direction"
          >
            {sortOrder}
          </button>
        </div>
      </div>
    </div>
  );
};
