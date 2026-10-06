import { useState, useEffect, useMemo } from 'react';
import { Task, TaskFormData, FilterStatus, Priority, SortOption, SortOrder } from '../types/task';

const STORAGE_KEY = 'taskflow_tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete TaskFlow Project Implementation',
    description: 'Build responsive React + Vite + TypeScript application with dashboard and filters.',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Write Comprehensive Vitest Unit Tests',
    description: 'Cover task creation, filtering, dashboard metrics, and localStorage persistence.',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Set Up Docker Multi-Stage Build',
    description: 'Configure Dockerfile with Nginx serving production static build.',
    completed: true,
    priority: 'low',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  const addTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: data.title.trim(),
      description: data.description.trim() || undefined,
      priority: data.priority,
      dueDate: data.dueDate || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, data: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: data.title.trim(),
              description: data.description.trim() || undefined,
              priority: data.priority,
              dueDate: data.dueDate || undefined,
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter === 'active' && task.completed) return false;
        if (statusFilter === 'completed' && !task.completed) return false;

        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = task.title.toLowerCase().includes(q);
          const matchesDesc = task.description
            ? task.description.toLowerCase().includes(q)
            : false;
          if (!matchesTitle && !matchesDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          comparison = a.dueDate.localeCompare(b.dueDate);
        } else if (sortBy === 'priority') {
          const priorityWeights: Record<Priority, number> = {
            high: 3,
            medium: 2,
            low: 1,
          };
          comparison = priorityWeights[b.priority] - priorityWeights[a.priority];
        } else if (sortBy === 'createdAt') {
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

  return {
    tasks,
    filteredTasks,
    stats,
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
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  };
};
