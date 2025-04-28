import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const showError = (msg) => {
    showMessage(msg, "error");
  };

  const showSuccess = (msg) => {
    showMessage(msg, "success");
  };

  return (
    <MessageContext.Provider value={{ showError, showSuccess }}>
      {children}
      {message && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md w-full max-w-sm ${
            messageType === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {message}
        </div>
      )}
    </MessageContext.Provider>
  );
};
