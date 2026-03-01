import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Cargar reservas del usuario cuando inicia sesión
  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [user]);

  const fetchBookings = async () => {
  if (!user) return;

  setLoading(true);

  let query = supabase
    .from('bookings')
    .select(`
      *,
      providers ( name )
    `)
    .order('created_at', { ascending: false });

  // Primero obtenemos el rol del usuario
  const { data: userProfile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userProfile?.role === 'provider') {
    // Obtener provider_id primero
    const { data: provider } = await supabase
      .from('providers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (provider) {
      query = query.eq('provider_id', provider.id);
    }
  } else {
    // Es buyer
    query = query.eq('buyer_id', user.id);
  }

  const { data, error } = await query;

  if (error) {
    console.log('Error fetching bookings:', error);
  } else {
    setBookings(data);
  }

  setLoading(false);
};


  // ➕ Crear reserva real en DB
  const createBooking = async (bookingData) => {
    const { error } = await supabase.from('bookings').insert({
      provider_id: bookingData.providerId,
      buyer_id: user.id,
      package_name: bookingData.packageName,
      price: bookingData.price,
      event_date: bookingData.date,
      status: 'pending',
    });

    if (error) {
      console.log('Error creating booking:', error);
      alert('Error al crear la reserva');
      return;
    }

    await fetchBookings();
  };

  // 🔄 Actualizar estado (para proveedor)
  const updateBookingStatus = async (bookingId, status) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (error) {
      console.log('Error updating booking:', error);
      return;
    }

    await fetchBookings();
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        createBooking,
        updateBookingStatus,
        fetchBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
