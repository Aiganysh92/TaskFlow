import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('TaskFlow App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders application header and dashboard stat cards', () => {
    render(<App />);

    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('Active Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('allows adding a new task', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click "New Task" button
    const newTaskBtn = screen.getByRole('button', { name: /new task/i });
    await user.click(newTaskBtn);

    // Modal opens
    expect(screen.getByText('Create New Task')).toBeInTheDocument();

    // Fill form
    const titleInput = screen.getByPlaceholderText('Enter task title');
    await user.type(titleInput, 'Buy groceries');

    const descInput = screen.getByPlaceholderText('Add additional details or notes...');
    await user.type(descInput, 'Milk, Eggs, Bread');

    const createBtn = screen.getByRole('button', { name: /create task/i });
    await user.click(createBtn);

    // Task is added to the list
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Milk, Eggs, Bread')).toBeInTheDocument();
  });

  it('allows marking a task as completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const initialTaskTitle = 'Complete TaskFlow Project Implementation';
    expect(screen.getByText(initialTaskTitle)).toBeInTheDocument();

    const toggleButtons = screen.getAllByRole('button', { name: /mark task complete/i });
    await user.click(toggleButtons[0]);

    const completedButtons = screen.getAllByRole('button', { name: /mark task incomplete/i });
    expect(completedButtons.length).toBeGreaterThan(0);
  });

  it('allows editing a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    const editBtns = screen.getAllByRole('button', { name: /edit task/i });
    await user.click(editBtns[0]);

    expect(screen.getByText('Edit Task')).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Enter task title');
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Task Title');

    const saveBtn = screen.getByRole('button', { name: /save changes/i });
    await user.click(saveBtn);

    expect(screen.getByText('Updated Task Title')).toBeInTheDocument();
  });

  it('allows deleting a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    const taskTitle = 'Set Up Docker Multi-Stage Build';
    expect(screen.getByText(taskTitle)).toBeInTheDocument();

    // Find the task card element containing taskTitle
    const taskHeading = screen.getByText(taskTitle);
    const taskCard = taskHeading.closest('div.group') as HTMLElement;
    expect(taskCard).toBeInTheDocument();

    const deleteBtn = within(taskCard).getByRole('button', { name: /delete task/i });
    await user.click(deleteBtn);

    expect(screen.queryByText(taskTitle)).not.toBeInTheDocument();
  });

  it('filters tasks by search query', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    await user.type(searchInput, 'Vitest');

    expect(screen.getByText('Write Comprehensive Vitest Unit Tests')).toBeInTheDocument();
    expect(screen.queryByText('Set Up Docker Multi-Stage Build')).not.toBeInTheDocument();
  });

  it('filters tasks by status tab (Active / Completed)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const activeTab = screen.getByRole('button', { name: /^active$/i });
    await user.click(activeTab);

    // Should only show active tasks
    expect(screen.getByText('Complete TaskFlow Project Implementation')).toBeInTheDocument();
    expect(screen.queryByText('Set Up Docker Multi-Stage Build')).not.toBeInTheDocument();

    const completedTab = screen.getByRole('button', { name: /^completed$/i });
    await user.click(completedTab);

    // Should only show completed tasks
    expect(screen.getByText('Set Up Docker Multi-Stage Build')).toBeInTheDocument();
    expect(screen.queryByText('Complete TaskFlow Project Implementation')).not.toBeInTheDocument();
  });

  it('persists tasks to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    const newTaskBtn = screen.getByRole('button', { name: /new task/i });
    await user.click(newTaskBtn);

    const titleInput = screen.getByPlaceholderText('Enter task title');
    await user.type(titleInput, 'LocalStorage Test Task');

    const createBtn = screen.getByRole('button', { name: /create task/i });
    await user.click(createBtn);

    const saved = localStorage.getItem('taskflow_tasks');
    expect(saved).not.toBeNull();
    expect(saved).toContain('LocalStorage Test Task');
  });
});
