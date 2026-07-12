// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// En modo Servidor (SSR), Astro lee las variables usando process.env
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

// Inicializamos el cliente oficial conector
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
