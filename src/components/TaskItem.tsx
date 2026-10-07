import React from 'react';
import { Calendar, Trash2, Edit3, Check, AlertCircle } from 'lucide-react';
import { Task, Priority } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityBadgeStyles: Record<Priority, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', label: 'High' },
  medium: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Medium' },
  low: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Low' },
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const priorityStyle = priorityBadgeStyles[task.priority];

  // Check if overdue (if due date exists, not completed, and due date < today)
  const isOverdue = React.useMemo(() => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate < today;
  }, [task.dueDate, task.completed]);

  const formattedDueDate = React.useMemo(() => {
    if (!task.dueDate) return null;
    const [year, month, day] = task.dueDate.split('-').map(Number);
    if (!year || !month || !day) return task.dueDate;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [task.dueDate]);

  return (
    <div
      className={`group bg-white rounded-xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-md ${
        task.completed
          ? 'bg-slate-50/70 border-slate-200 opacity-80'
          : isOverdue
          ? 'border-rose-300 shadow-rose-100/50'
          : 'border-slate-200 hover:border-blue-200'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Custom Checkbox Button */}
        <button
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-slate-300 hover:border-blue-500 bg-white'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`text-base font-semibold leading-tight break-words ${
                task.completed ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {task.title}
            </h3>

            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${priorityStyle.bg} ${priorityStyle.text}`}
            >
              {priorityStyle.label}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p
              className={`text-sm mb-2.5 whitespace-pre-wrap leading-relaxed ${
                task.completed ? 'text-slate-400 line-through' : 'text-slate-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Footer Metadata: Due Date & Overdue Indicator */}
          {formattedDueDate && (
            <div className="flex items-center gap-1.5 text-xs font-medium mt-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span
                className={
                  task.completed
                    ? 'text-slate-400'
                    : isOverdue
                    ? 'text-rose-600 font-semibold'
                    : 'text-slate-500'
                }
              >
                {formattedDueDate}
              </span>

              {isOverdue && !task.completed && (
                <span className="inline-flex items-center gap-1 text-xs text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  <AlertCircle className="w-3 h-3" />
                  Overdue
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
