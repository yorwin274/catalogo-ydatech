import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const { id } = await request.json();
    if (!id) return new Response(JSON.stringify({ error: 'Falta ID' }), { status: 400 });

    const { error } = await supabase.from('productos').delete().eq('id', id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error de servidor' }), { status: 500 });
  }
}
