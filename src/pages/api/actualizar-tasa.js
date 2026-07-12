// src/pages/api/actualizar-tasa.js
import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { tasa } = body;

    if (!tasa) {
      return new Response(JSON.stringify({ error: 'Falta el valor de la tasa' }), { status: 400 });
    }

    // Hacemos el UPDATE en la fila única con ID = 1
    const { error } = await supabase
      .from('adjustes' in body ? 'adjustes' : 'ajustes') // Resguardo por si acaso
      .update({ tasa_euro: parseFloat(tasa) })
      .eq('id', 1);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
}
