"use client";

import { useState } from "react";
import { Status, Task } from "@/app/lib/types";
import { mockTasks, getTasksByStatus } from "@/app/fixtures/tasks";
import BoardColumn from "./components/BoardColumn";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import EditTaskForm from "./components/EditTaskForm";
import TaskModal from "./components/TaskModal";

export default function BoardPage() {
  // State for managing tasks
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  
  // State for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle task creation
  const handleCreateTask = (formData: { title: string; description: string; status: Status }) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setTasks([...tasks, newTask]);
      setIsSubmitting(false);
      setIsCreateModalOpen(false);
    }, 500);
  };
  
  // Handle task editing
  const handleEditTask = (id: string, formData: { title: string; description: string; status: Status }) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const updatedTasks = tasks.map(task => 
        task.id === id ? {
          ...task,
          title: formData.title,
          description: formData.description,
          status: formData.status,
          updatedAt: new Date().toISOString()
        } : task
      );
      
      setTasks(updatedTasks);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
      setEditingTask(null);
    }, 500);
  };
  
  // Open edit modal for a task
  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Get tasks by status
  const todoTasks = getTasksByStatus(Status.todo);
  const doingTasks = getTasksByStatus(Status.doing);
  const doneTasks = getTasksByStatus(Status.done);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <BoardColumn title="To Do" status={Status.todo}>
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              onClick={() => handleEditClick(task)}
            />
          ))}
        </BoardColumn>

        <BoardColumn title="Doing" status={Status.doing}>
          {doingTasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              onClick={() => handleEditClick(task)}
            />
          ))}
        </BoardColumn>

        <BoardColumn title="Done" status={Status.done}>
          {doneTasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              onClick={() => handleEditClick(task)}
            />
          ))}
        </BoardColumn>
      </div>

      {/* Create Task Modal */}
      <TaskModal
        title="Create New Task"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </TaskModal>

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskModal
          title="Edit Task"
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
        >
          <EditTaskForm
            task={editingTask}
            onSubmit={handleEditTask}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingTask(null);
            }}
            isSubmitting={isSubmitting}
          />
        </TaskModal>
      )}
    </div>
  );
}
