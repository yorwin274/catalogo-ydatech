// src/pages/api/actualizar-producto.js
import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { id, nombre, categoria, precio, stock, detalles, imagen } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Falta el ID del producto para actualizar' }), { status: 400 });
    }

    // 🚀 COMANDO UPDATE SIMPLIFICADO: Modifica solo los datos reales del producto
    const { error } = await supabase
      .from('productos')
      .update({
        nombre: nombre,
        categoria: categoria,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        detalles: detalles,
        descripcion: detalles ? detalles.substring(0, 60) : '', // Descripción corta actualizada
        imagen: imagen // Mantiene o reemplaza la URL del Storage
      })
      .eq('id', id); // Filtra exactamente por la fila correcta

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Producto actualizado correctamente' }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error interno en el servidor' }), { status: 500 });
  }
}
