import { createClient } from '@supabase/supabase-js';

// HARDCODED for testing - replace with your actual values
const supabaseUrl = 'https://YOUR_PROJECT_REF.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 