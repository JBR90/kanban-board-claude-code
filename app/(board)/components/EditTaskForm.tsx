"use client";

import { useState, useEffect } from "react";
import { Status, Task } from "@/app/lib/types";

interface EditTaskFormProps {
  task: Task;
  onSubmit: (id: string, formData: { title: string; description: string; status: Status }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function EditTaskForm({ 
  task, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [errors, setErrors] = useState<{ title?: string }>({});

  // Update form when task changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status);
  }, [task]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Always validate on submit
    const isValid = validateForm();
    
    if (isValid) {
      onSubmit(task.id, {
        title: title.trim(),
        description: description.trim(),
        status
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4" 
      onKeyDown={handleKeyDown}
      aria-label="Edit task form"
    >
      <div className="space-y-2">
        <label 
          htmlFor="edit-title" 
          className="text-sm font-medium"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter task title"
          required
          aria-required="true"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "edit-title-error" : undefined}
          autoFocus
        />
        {errors.title && (
          <p id="edit-title-error" className="text-sm text-red-500">
            {errors.title}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <label 
          htmlFor="edit-description" 
          className="text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description (optional)"
          aria-describedby="edit-description-hint"
        />
        <p id="edit-description-hint" className="text-xs text-gray-500">
          Optional. Add details about the task.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="edit-status"
          className="text-sm font-medium"
        >
          Status
        </label>
        <select
          id="edit-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={Status.todo}>To Do</option>
          <option value={Status.doing}>Doing</option>
          <option value={Status.done}>Done</option>
        </select>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}