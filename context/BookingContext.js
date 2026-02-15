import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <BookingContext.Provider
      value={{ bookings, createBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
