import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqaubgzubayqdtdcslas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYXViZ3p1YmF5cWR0ZGNzbGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTI1NTUsImV4cCI6MjA4Njc2ODU1NX0._lt1BsAlBFpj_9vEQhjv08h384_EDdfoMo6NMEJv2j4';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
