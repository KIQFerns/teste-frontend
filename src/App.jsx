import { useEffect, useState } from "react";
import "./App.css";
import ModalUsers from "./components/ModalUsers";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import { getAllUsers, createUser, updateUser } from "./services/userService";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModaType] = useState("create");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpen = (type, user) => {
    setSelectedUser(user);
    setModaType(type);
    setIsOpen(true);
  };

  const handleSubmit = async (userData) => {
    try {
      if (modalType === "create") {
        const response = await createUser(userData);
        console.log("User added:", response.data);
      } else {
        const response = await updateUser(selectedUser.id, userData);
        console.log("User updated:", response.data);
      }
      fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
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
