"use client";

import { Status } from "@/lib/types";

interface BoardColumnProps {
  title: string;
  status: Status;
  children?: React.ReactNode;
}

export default function BoardColumn({ title, status, children }: BoardColumnProps) {
  return (
    <section 
      className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-[500px] w-full min-w-[300px] max-w-md border"
      aria-label={`${title} column`}
    >
      <header className="flex items-center justify-between pb-4 border-b mb-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium">
          {children ? Array.isArray(children) ? children.length : 1 : 0}
        </div>
      </header>
      
      <div className="flex flex-col gap-2 flex-1">
        {children || (
          <div className="flex items-center justify-center h-32 border border-dashed rounded-md border-gray-300 text-gray-500 text-sm">
            No tasks yet
          </div>
        )}
      </div>
    </section>
  );
}