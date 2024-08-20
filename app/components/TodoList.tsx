import { ITopics } from "@/types/topics";
import React from "react";
import Topic from "@/app/components/Topic";

interface ITodoListProps {
  topics: ITopics[];
}

const TodoList: React.FC<ITodoListProps> = ({ topics }) => {
  return (
    <div className="my-12 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Topic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <Topic key={topic.id} topic={topic} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TodoList;
