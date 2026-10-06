import React from 'react';
import { ClipboardList, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  onOpenNewTaskModal?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  onClearFilters,
  onOpenNewTaskModal,
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm my-6">
      <div className="inline-flex p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        {hasFilters ? 'No matching tasks found' : 'No tasks yet'}
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        {hasFilters
          ? 'Try adjusting your search query or filters to find what you are looking for.'
          : 'Get started by creating your first task and stay organized effortlessly.'}
      </p>

      {hasFilters ? (
        onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Clear Filters
          </button>
        )
      ) : (
        onOpenNewTaskModal && (
          <button
            onClick={onOpenNewTaskModal}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        )
      )}
    </div>
  );
};
