import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdtwwlgfnthdjtlqhidk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdHd3bGdmbnRoZGp0bHFoaWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjQ1NDYsImV4cCI6MjA2NTIwMDU0Nn0.OkLXhZrZK7DADiTn0Z9u4JzuFsK2T6XrSu6bIKAF2f8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 