"use client";

interface TaskCardProps {
  title: string;
  description?: string;
  id: string;
}

export default function TaskCard({ title, description, id }: TaskCardProps) {
  return (
    <article 
      className="bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2"
      aria-labelledby={`task-${id}-title`}
    >
      <h3 id={`task-${id}-title`} className="font-medium text-sm">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
      )}
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2">
          <button 
            className="text-xs text-gray-500 hover:text-gray-700"
            aria-label="Edit task"
          >
            Edit
          </button>
          <button 
            className="text-xs text-gray-500 hover:text-red-500"
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}