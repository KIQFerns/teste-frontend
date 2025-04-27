import { useState } from "react";
import "./App.css";
import ModalUsers from "./components/ModalUsers";
import NavBar from "./components/NavBar";
import Table from "./components/Table";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen()} />
      <Table />
      <ModalUsers isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default App;
