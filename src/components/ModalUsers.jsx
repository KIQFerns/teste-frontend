import { useState } from "react";

export default function ModalUsers({ isOpen, onClose, type, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email };
      await onSubmit(userData);
      onClose();
    } catch (err) {
      console.error("Error adding User", err);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg py-4">
            {type === "update" ? "Editar Usuário" : "Criar usuário"}
          </h3>

          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center my-4 gap-2">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center my-4 gap-2">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <button type="submit" className="btn btn-success">
              {" "}
              {type === "update" ? "Alterar" : "Criar"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
