import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TaskControls } from './components/TaskControls';
import { TaskItem } from './components/TaskItem';
import { EmptyState } from './components/EmptyState';
import { TaskFormModal } from './components/TaskFormModal';
import { useTasks } from './hooks/useTasks';
import { Task, TaskFormData } from './types/task';

export const App: React.FC = () => {
  const {
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
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpenNewTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditTaskModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleFormSubmit = (data: TaskFormData) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, data);
    } else {
      addTask(data);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const hasActiveFilters =
    Boolean(searchQuery) || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header onOpenNewTaskModal={handleOpenNewTaskModal} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard stats={stats} />

        <TaskControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onEdit={handleOpenEditTaskModal}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            hasFilters={hasActiveFilters || tasks.length > 0}
            onClearFilters={handleClearFilters}
            onOpenNewTaskModal={handleOpenNewTaskModal}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>TaskFlow &copy; {new Date().getFullYear()} — Streamlined Task Management</p>
      </footer>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default App;
