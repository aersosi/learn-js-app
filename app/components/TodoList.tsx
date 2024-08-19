import {ITask} from "@/types/tasks";
import React from "react";
import Task from "@/app/components/Task";

interface ITodoListProps {
    tasks: ITask[],
}

const TodoList: React.FC<ITodoListProps> = ({tasks}) => {

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Task</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => <Task key={task.id} task={task}/>)}
                </tbody>
            </table>
        </div>
    )
};
export default TodoList;