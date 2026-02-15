import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const sendMessage = ({ bookingId, senderId, text }) => {
    const newMessage = {
      id: Date.now().toString(),
      bookingId,
      senderId,
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const getMessagesForBooking = (bookingId) => {
    return messages.filter((m) => m.bookingId === bookingId);
  };

  return (
    <ChatContext.Provider
      value={{ messages, sendMessage, getMessagesForBooking }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
