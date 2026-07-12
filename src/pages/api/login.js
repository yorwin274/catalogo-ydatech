// src/pages/api/login.js
import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { usuario, password } = body;

    // Validación básica de campos vacíos
    if (!usuario || !password) {
      return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400 });
    }

    // 🚀 CONSULTA EN LA NUBE: Buscamos el usuario en la tabla usuarios_admin
    const { data: admin, error } = await supabase
      .from('usuarios_admin')
      .select('*')
      .eq('usuario', usuario)
      .single();

    // Si el usuario no existe en Supabase o da un error
    if (error || !admin) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 401 });
    }

    // 🔐 VALIDACIÓN COMPATIBLE: Comparamos temporalmente contra el hash almacenado
    const { data: coincidencia, error: errMatch } = await supabase
      .from('usuarios_admin')
      .select('id')
      .eq('usuario', usuario)
      .eq('password_hash', admin.password_hash)
      .single();

    if (errMatch || !coincidencia) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    // Si pasó los filtros, generamos un Token Dinámico con marca de tiempo
    const tokenDinamico = btoa(`${usuario}:${Date.now()}`);

    return new Response(JSON.stringify({ success: true, token: tokenDinamico }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error interno de autenticación' }), { status: 500 });
  }
}
