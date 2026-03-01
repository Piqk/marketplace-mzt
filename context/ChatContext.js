import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  // 🔄 Cargar mensajes de un booking específico
  const fetchMessages = async (bookingId) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: true });

    if (error) {
      console.log('Error fetching messages:', error);
      return;
    }

    setMessages(data);
  };

  // ➕ Enviar mensaje real
  const sendMessage = async ({ bookingId, text }) => {
    if (!user) return;

    const { error } = await supabase.from('messages').insert({
      booking_id: bookingId,
      sender_id: user.id,
      text,
    });

    if (error) {
      console.log('Error sending message:', error);
    }
  };

  // ⚡ Realtime subscription
  const subscribeToMessages = (bookingId) => {
    const channel = supabase
      .channel(`messages-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        fetchMessages,
        sendMessage,
        subscribeToMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
