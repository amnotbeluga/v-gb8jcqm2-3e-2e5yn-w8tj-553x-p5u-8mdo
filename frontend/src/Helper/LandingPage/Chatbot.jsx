import React, { useState } from 'react';
import { Bot } from "lucide-react";

function Chatbot() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#007bff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          zIndex: 9999,
        }}
        onClick={() => setShowChat(!showChat)}
      >
        <Bot size={28} />
      </div>

      {/* Chatbot iframe */}
      {showChat && (
        <iframe
          src="http://localhost:3000/"
          style={{
            position: "fixed",
            bottom: 10,
            right: 80,
            width: 600,
            height: 675,
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 9998,
          }}
          title="Chatbot"
        ></iframe>
      )}
    </>
  );
}

export default Chatbot;
