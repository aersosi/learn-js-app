import React from "react";

interface IModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}
const Modal: React.FC<IModalProps> = ({
  modalOpen,
  setModalOpen,
  children,
}) => {
  return (
    <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {/*<h3 className="font-bold text-lg">Hello!</h3>*/}
        {/*<p className="py-4">Press ESC key or click on ✕ button to close</p>*/}

        {children}
      </div>
    </dialog>
  );
};
export default Modal;
