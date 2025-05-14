import { Status } from "../lib/types";
import BoardColumn from "./components/BoardColumn";
import TaskCard from "./components/TaskCard";

export default function BoardPage() {
  // Hard-coded example tasks for demonstration
  const exampleTask = {
    id: "example-task",
    title: "Example Task",
    description: "This is an example task to demonstrate the UI components.",
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <BoardColumn title="To Do" status={Status.todo}>
          <TaskCard 
            id={exampleTask.id} 
            title={exampleTask.title}
            description={exampleTask.description}
          />
        </BoardColumn>
        
        <BoardColumn title="Doing" status={Status.doing} />
        
        <BoardColumn title="Done" status={Status.done} />
      </div>
    </div>
  );
}