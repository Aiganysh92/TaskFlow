import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenNewTaskModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewTaskModal }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-500/20">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              TaskFlow
              <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                v1.0
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Organize your tasks seamlessly
            </p>
          </div>
        </div>

        <button
          onClick={onOpenNewTaskModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
};
