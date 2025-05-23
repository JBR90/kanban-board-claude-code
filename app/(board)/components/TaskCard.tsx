"use client";

interface TaskCardProps {
  title: string;
  description?: string;
  id: string;
  onClick?: () => void;
}

export default function TaskCard({ title, description, id, onClick }: TaskCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <article 
      className="bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2"
      aria-labelledby={`task-${id}-title`}
      onClick={handleClick}
    >
      <h3 id={`task-${id}-title`} className="font-medium text-sm">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-700 line-clamp-3">
          {description}
        </p>
      )}
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2">
          <button 
            className="text-xs text-gray-700 hover:text-gray-900 font-medium"
            aria-label="Edit task"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
          >
            Edit
          </button>
          <button 
            className="text-xs text-gray-700 hover:text-red-600 font-medium"
            aria-label="Delete task"
            onClick={(e) => e.stopPropagation()}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}