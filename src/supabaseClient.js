import { createClient } from '@supabase/supabase-js';

// Hum direct values daal rahe hain taake .env ka koi masla hi na rahe
const supabaseUrl = "https://sqggweeywpjycedjlocu.supabase.co";
const supabaseAnonKey = "sb_publishable_3T_LiVYWVqnVmSI3rYP4qQ_RhEswmbK";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);