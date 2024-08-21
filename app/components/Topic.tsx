"use client";

import React, { FormEventHandler, useState } from "react";
import { ITopicProps } from "@/types/topics";
import { FiEdit, FiTrash2, FiCheck } from "react-icons/fi";
import Modal from "@/app/components/Modal";
import { deleteAnswer, editAnswer } from "@/api/api";
import { useRouter } from "next/navigation";

const Topic: React.FC<ITopicProps> = ({
  topic,
  category,
  subcategory,
  index,
}) => {
  const router = useRouter();

  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [topicToEdit, setTopicToEdit] = useState<string>(topic.answer);

  const handleSubmitEditAnswer: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      await editAnswer(
        {
          id: topic.id,
          question: topic.question,
          answer: topicToEdit,
        },
        category,
        subcategory
      );
      setModalOpenEdit(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to edit topic:", error);
    }
  };

  const handleDeleteAnswer = async () => {
    try {
      await deleteAnswer(topic.id, category, subcategory);
      setModalOpenDelete(false);
      setTopicToEdit("");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  return (
    <div key={topic.id} className="mb-8 flex justify-between gap-4">
      <div className="flex flex-col gap-4">
        <span>{`${index + 1}. ${topic.question}`}</span>{" "}
        {/* Display the question number */}
        <span className="flex items-center gap-4 opacity-50">
          <FiCheck size={24} className="text-green-500" />
          {topic.answer}
        </span>
      </div>
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
            onSubmit={handleSubmitEditAnswer}
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
          <h3 className="bold text-lg">
            Are you sure you want to delete your answer?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={handleDeleteAnswer}>
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Topic;
