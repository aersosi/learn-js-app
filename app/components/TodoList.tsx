import { ICurriculum } from "@/types/curriculum";
import React from "react";
import Task from "@/app/components/Task";

interface ITodoListProps {
  tasks: ICurriculum[];
}

const TodoList: React.FC<ITodoListProps> = ({ tasks }) => {
  return (
    <div className="my-12 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TodoList;
