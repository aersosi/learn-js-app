import React from "react";
import {ITask} from "@/types/tasks";

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({task}) => {
    return (
        <tr key={task.id}>
            <th>1</th>
            <td>{task.text}</td>
            <td>Test</td>
        </tr>
    )
};
export default Task;