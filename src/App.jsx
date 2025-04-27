import { useState } from "react";
import "./App.css";
import ModalUsers from "./components/ModalUsers";
import NavBar from "./components/NavBar";
import Table from "./components/Table";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModaType] = useState("create");

  const handleOpen = (type) => {
    setModaType(type);
    setIsOpen(true);
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("create")} />
      <Table onOpen={() => handleOpen("update")} />
      <ModalUsers
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalType}
      />
    </>
  );
}

export default App;
