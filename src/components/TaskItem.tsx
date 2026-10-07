import React from 'react';
import { Calendar, Trash2, Edit3, Check, AlertCircle } from 'lucide-react';
import { Task, Priority } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityBadgeStyles: Record<Priority, { bg: string; text: string; dot: string; label: string }> = {
  high: { bg: 'bg-rose-50 border-rose-200/80', text: 'text-rose-700', dot: 'bg-rose-500', label: 'High' },
  medium: { bg: 'bg-amber-50 border-amber-200/80', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Medium' },
  low: { bg: 'bg-blue-50 border-blue-200/80', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Low' },
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const priorityStyle = priorityBadgeStyles[task.priority];

  // Check if overdue
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
      className={`group relative bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md ${
        task.completed
          ? 'bg-slate-50/60 border-slate-200/70 opacity-75'
          : isOverdue
          ? 'border-rose-200 shadow-sm shadow-rose-100/50'
          : 'border-slate-100 hover:border-blue-200 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Custom Checkbox Button */}
        <button
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-lg border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'border-slate-300 hover:border-blue-500 bg-white'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`text-base font-bold leading-snug break-words ${
                task.completed ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {task.title}
            </h3>

            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${priorityStyle.bg} ${priorityStyle.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
              {priorityStyle.label}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p
              className={`text-sm mb-3 whitespace-pre-wrap leading-relaxed ${
                task.completed ? 'text-slate-400 line-through' : 'text-slate-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Due Date & Overdue Tag */}
          {formattedDueDate && (
            <div className="flex items-center gap-2 text-xs font-semibold mt-2">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  task.completed
                    ? 'bg-slate-100 border-slate-200 text-slate-400'
                    : isOverdue
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-slate-50 border-slate-200/60 text-slate-500'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDueDate}</span>
              </div>

              {isOverdue && !task.completed && (
                <span className="inline-flex items-center gap-1 text-xs text-rose-700 font-bold bg-rose-100/80 px-2 py-1 rounded-lg">
                  <AlertCircle className="w-3.5 h-3.5" />
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
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
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
