// src/pages/api/crear-producto.js
import { supabase } from '../../lib/supabase.js';

// Función auxiliar para convertir el nombre del producto en un slug apto para URL
function generarSlug(texto) {
  return texto
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Reemplaza espacios por guiones
    .replace(/[^\w\-]+/g, '')       // Elimina caracteres especiales
    .replace(/\-\-+/g, '-');        // Reemplaza múltiples guiones por uno solo
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { nombre, categoria, precio, stock, detalles, imagen } = body;

    // Validación básica de campos obligatorios
    if (!nombre || !precio || !categoria) {
      return new Response(JSON.stringify({ error: 'Nombre, Categoría y Precio son obligatorios' }), { status: 400 });
    }

    const slug = generarSlug(nombre);

    // 🚀 INSERT LIMPIO: Ya no incluye la columna whatsapp_url
    const { data, error } = await supabase
      .from('productos')
      .insert([
        {
          nombre,
          slug,
          categoria,
          precio: parseFloat(precio),
          stock: parseInt(stock) || 0,
          descripcion: detalles ? detalles.substring(0, 60) : '', // Descripción corta para listados
          detalles: detalles || '',                               // Descripción larga para el zoom
          imagen: imagen || '/placeholder.png'
        }
      ])
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Producto registrado con éxito', data }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
