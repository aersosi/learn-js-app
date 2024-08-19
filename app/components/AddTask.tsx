'use client'

import {FiPlus} from "react-icons/fi";
import Modal from "@/app/components/Modal";
import {FormEventHandler, useState} from "react";
import {addTodo} from "@/api";
import { useRouter } from "next/navigation";
const AddTask = () => {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            text: newTaskValue,
        });
        setNewTaskValue("");
        setModalOpen(false);
        router.refresh();
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add new Task
                <FiPlus size={18}/>
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form id='TextArea' onSubmit={handleSubmitNewTodo} className="flex flex-col gap-4">
                    <h3 className="bold text-lg">Add new Task</h3>
                    <textarea
                        value={newTaskValue}
                        onChange={ e => setNewTaskValue(e.target.value)}
                        placeholder="Bio"
                        className="modal-action textarea textarea-bordered textarea-md w-full">
                    </textarea>
                    <button className="btn" type='submit'>Submit</button>
                </form>
            </Modal>
        </div>
    )
};
export default AddTask;