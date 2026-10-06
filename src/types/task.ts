export type Priority = 'low' | 'medium' | 'high';

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortOption = 'dueDate' | 'priority' | 'createdAt' | 'title';

export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // Format: YYYY-MM-DD
  createdAt: string; // ISO string
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}
