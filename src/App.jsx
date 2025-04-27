import { useEffect, useState } from "react";
import "./App.css";
import ModalUsers from "./components/ModalUsers";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModaType] = useState("create");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpen = (type, user) => {
    console.log(user);
    setSelectedUser(user);
    setModaType(type);
    setIsOpen(true);
  };

  const handleSubmit = async (userData) => {
    if (modalType === "create") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users",
          userData
        );
        console.log("Client added:", response.data);
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/users/${selectedUser.id}`,
          userData
        );
        console.log("User updated:", response.data);
        setUsers((prevData) =>
          prevData.map((client) =>
            client.id === userData.id ? response.data : client
          )
        );
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar onOpen={() => handleOpen("create")} />
      <Table users={users} handleOpen={handleOpen} />
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
