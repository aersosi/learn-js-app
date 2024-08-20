"use client";

import React, { FormEventHandler, useState } from "react";
import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "@/app/components/Modal";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <th>1</th>
      <td className="w-full">{task.text}</td>
      <td>
        <div className="flex gap-4">
          <FiEdit
            onClick={() => setModalOpenEdit(true)}
            cursor="pointer"
            className="text-primary"
            size={18}
          />
          <FiTrash2
            onClick={() => setModalOpenDelete(true)}
            cursor="pointer"
            className="text-red-500"
            size={18}
          />

          <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
            <form
              id="TextArea"
              onSubmit={handleSubmitEditTodo}
              className="flex flex-col gap-4"
            >
              <h3 className="bold text-lg">Edit Task</h3>
              <textarea
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Bio"
                className="modal-action textarea textarea-bordered textarea-md w-full"
              ></textarea>
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </Modal>
          <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
            <h3 className="bold text-lg">Are You sure to delete?</h3>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  handleDeleteTask(task.id);
                }}
              >
                Delete
              </button>
            </div>
          </Modal>
        </div>
      </td>
    </tr>
  );
};
export default Task;
