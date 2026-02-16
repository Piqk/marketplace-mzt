import { supabase } from '../services/supabase';

async function testConnection() {
  const { data, error } = await supabase
    .from('providers')
    .select('*');

  console.log(data, error);
}
