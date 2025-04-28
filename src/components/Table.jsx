import { useState } from "react";
import { useMessage } from "../context/MessageContext";
import { deleteUser } from "../services/userService";

export default function Table({ users, handleOpen, setUsers }) {
  const { showError, showSuccess } = useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        showSuccess("Usuário excluído com sucesso!");
        setUsers((prevData) =>
          prevData.filter((user) => user.id !== userToDelete.id)
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Erro ao excluir o usuário. Tente novamente!";
        showError(errorMessage);
        console.error(error);
      }
    }
    closeDeleteModal();
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th className="p-4">Nome</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4 flex items-center">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${
                    user.active ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                {user.active ? "Ativo" : "Inativo"}
              </td>
              <td className="p-4">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleOpen("update", user)}
                >
                  Atualizar
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => openDeleteModal(user)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box p-8 bg-white text-gray-900 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
              Tem certeza que deseja excluir?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                className="btn btn-danger flex-1 py-2 px- font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
                onClick={confirmDelete}
              >
                Sim, excluir
              </button>
              <button
                className="btn btn-ghost flex-1 py-2 px-4 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition duration-300"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
