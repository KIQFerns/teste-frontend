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

  const handleOpen = (type) => {
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
        console.error("Error adding client:", error);
      }
    } else {
      console.log("Updating client");
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
      <Table users={users} onOpen={() => handleOpen("update")} />
      <ModalUsers
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={modalType}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
