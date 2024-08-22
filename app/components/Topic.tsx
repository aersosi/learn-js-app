"use client";

import React, { FormEventHandler, useState, useCallback } from "react";
import { ITopicProps } from "@/types/topics";
import { FiEdit, FiTrash2, FiCheck, FiRotateCcw } from "react-icons/fi";
import Modal from "@/app/components/Modal";
import { deleteAnswer, editAnswer } from "@/api/api";
import { useRouter } from "next/navigation";

const Topic: React.FC<ITopicProps> = React.memo(
  ({ topic, category, subcategory, index }) => {
    const router = useRouter();

    const [editState, setEditState] = useState({
      isEditing: false,
      tempEdit: topic.answer,
      isCleared: false,
      currentAnswer: topic.answer,
    });

    const handleSubmitEditAnswer: FormEventHandler<HTMLFormElement> = async (
      e
    ) => {
      e.preventDefault();
      try {
        if (editState.tempEdit === "") {
          await deleteAnswer(topic.id, category, subcategory);
        } else {
          await editAnswer(
            {
              id: topic.id,
              question: topic.question,
              answer: editState.tempEdit,
            },
            category,
            subcategory
          );
        }
        setEditState((prev) => ({
          ...prev,
          isEditing: false,
          currentAnswer: editState.tempEdit,
          isCleared: false,
        }));
        router.refresh();
      } catch (error) {
        console.error("Failed to update answer:", error);
      }
    };

    const handleEditClick = useCallback(() => {
      setEditState((prev) => ({
        ...prev,
        isEditing: true,
        tempEdit: prev.currentAnswer,
        isCleared: false,
      }));
    }, []);

    const handleCancelEdit = useCallback(() => {
      setEditState((prev) => ({
        ...prev,
        isEditing: false,
        tempEdit: prev.currentAnswer,
        isCleared: false,
      }));
    }, []);

    return (
      <div key={topic.id} className="mb-8 flex justify-between gap-4">
        <div className="flex flex-col gap-4">
          <span>{`${index + 1}. ${topic.question}`}</span>
          <span className="flex items-center gap-4 opacity-50">
            <FiCheck size={24} className="text-green-500" />
            {editState.currentAnswer}
          </span>
        </div>
        <div className="flex gap-4">
          <FiEdit
            onClick={handleEditClick}
            cursor="pointer"
            className="text-green-500"
            size={18}
          />

          <Modal
            modalOpen={editState.isEditing}
            setModalOpen={(isOpen) =>
              setEditState((prev) => ({ ...prev, isEditing: isOpen }))
            }
          >
            <form
              id="TextArea"
              onSubmit={handleSubmitEditAnswer}
              className="flex flex-col gap-4"
            >
              <h3 className="bold text-lg">Edit Answer</h3>

              <p>{topic.question}</p>
              <textarea
                value={editState.tempEdit}
                onChange={(e) =>
                  setEditState((prev) => ({
                    ...prev,
                    tempEdit: e.target.value,
                  }))
                }
                placeholder="Bio"
                className="modal-action textarea textarea-bordered textarea-md mb-4 mt-2 w-full"
              ></textarea>
              <div className="flex items-center justify-between gap-4">
                {!editState.isCleared ? (
                  <button
                    type="button"
                    data-tip="Delete answer"
                    className="btn btn-circle btn-ghost tooltip tooltip-right relative text-red-500"
                    onClick={() =>
                      setEditState((prev) => ({
                        ...prev,
                        tempEdit: "",
                        isCleared: true,
                      }))
                    }
                  >
                    <FiTrash2 size={18} className="absolute inset-[13px]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    data-tip="Undo delete answer"
                    className="btn btn-circle btn-ghost btn-md tooltip tooltip-right"
                    onClick={() =>
                      setEditState((prev) => ({
                        ...prev,
                        tempEdit: prev.currentAnswer,
                        isCleared: false,
                      }))
                    }
                  >
                    <FiRotateCcw size={18} className="absolute inset-[14px]" />
                  </button>
                )}

                <span className="flex gap-4">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm">
                    Save
                  </button>
                </span>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
);

Topic.displayName = "Topic";

export default Topic;
