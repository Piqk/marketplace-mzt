import { supabase } from '../services/supabase';

export async function getProviders() {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Error fetching providers:', error);
    return [];
  }

  // Adaptar al formato que tu UI ya usa
  return data.map((provider) => ({
    id: provider.id,
    name: provider.name,
    category: provider.category,
    description: provider.description,
    priceFrom: provider.price_from,
    rating: 5, // temporal hasta que hagas sistema de reviews real
    reviews: 0,
    verified: true,
  }));
}
