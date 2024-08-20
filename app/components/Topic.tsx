"use client";

import React, { FormEventHandler, useState } from "react";
import { ITopics } from "@/types/topics";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "@/app/components/Modal";
import { deleteTodo, editTodo } from "@/api/api";
import { useRouter } from "next/navigation";

interface TopicProps {
  topic: ITopics;
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  const router = useRouter();

  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [topicToEdit, setTopicToEdit] = useState<string>(topic.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: topic.id,
      text: topicToEdit,
    });
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTopic = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={topic.id}>
      <th>1</th>
      <td className="w-full">{topic.text}</td>
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
              <h3 className="bold text-lg">Edit Topic</h3>
              <textarea
                value={topicToEdit}
                onChange={(e) => setTopicToEdit(e.target.value)}
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
                  handleDeleteTopic(topic.id);
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
export default Topic;
