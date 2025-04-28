import { useEffect, useState } from "react";

export default function ModalUsers({
  isOpen,
  onClose,
  type,
  onSubmit,
  userData,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);
  const [error] = useState("");

  const handleSubmit = async () => {
    const userData = { name, email, active };
    await onSubmit(userData);
    onClose();
  };

  useEffect(() => {
    if (type === "update" && userData) {
      setName(userData.name);
      setEmail(userData.email);
      setActive(userData.active);
    } else {
      setName("");
      setEmail("");
      setActive(true);
    }
  }, [type, userData, isOpen]);

  return (
    <dialog className="modal bg-black/40" open={isOpen}>
      <div className="modal-box w-full max-w-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg py-4 text-center">
          {type === "update" ? "Editar Usuário" : "Criar Usuário"}
        </h3>

        <form method="dialog" onSubmit={handleSubmit}>
          {error && <div className="alert alert-error mb-4">{error}</div>}

          <label className="input input-bordered flex items-center my-4 gap-2">
            Nome
            <input
              type="text"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </label>

          <label className="input input-bordered flex items-center my-4 gap-2">
            E-mail
            <input
              type="email"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex items-center my-4 gap-4">
            <span>Status:</span>
            <label className="swap">
              <input
                type="checkbox"
                checked={active}
                onChange={() => setActive(!active)}
                className="toggle toggle-primary ring-2 ring-offset-2 ring-primary focus:ring-4 focus:ring-primary"
              />
            </label>
          </label>

          <div className="flex gap-2 mt-4 justify-center">
            <button type="submit" className="btn btn-success grow">
              {type === "update" ? "Alterar" : "Criar"}
            </button>
            <button
              type="button"
              className="btn btn-ghost grow"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
