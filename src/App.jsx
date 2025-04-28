import { useEffect, useState } from "react";
import "./App.css";
import ModalUsers from "./components/ModalUsers";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import { getAllUsers, createUser, updateUser } from "./services/userService";
import { useMessage } from "./context/MessageContext";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModaType] = useState("create");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { showError, showSuccess } = useMessage();

  const handleOpen = (type, user) => {
    setSelectedUser(user);
    setModaType(type);
    setIsOpen(true);
  };

  const handleSubmit = async (userData) => {
    if (modalType === "create") {
      try {
        await createUser(userData);
        fetchUsers();
        showSuccess("Usuário criado com sucesso!");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Ocorreu um erro ao salvar o usuário!";
        showError(errorMessage);
      }
    } else {
      try {
        await updateUser(selectedUser.id, userData);
        fetchUsers();
        showSuccess("Usuário atualizado com sucesso!");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Ocorreu um erro ao salvar o usuário!";
        showError(errorMessage);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Ocorreu um erro ao buscar os usuários!";
      showError(errorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar onOpen={() => handleOpen("create")} />
      <Table users={users} handleOpen={handleOpen} setUsers={setUsers} />
      <ModalUsers
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={modalType}
        onSubmit={handleSubmit}
        userData={selectedUser}
      />
    </>
  );
}

export default App;
