// src/pages/api/subir-imagen.js
import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('foto');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No se recibió ningún archivo de imagen' }), { status: 400 });
    }

    // Generamos un nombre único para evitar que las fotos se pisen entre sí
    const extension = file.name.split('.').pop();
    const nombreArchivo = `${Date.now()}.${extension}`;

    // Subimos el archivo binario directo al Storage de Supabase
    const { data, error } = await supabase.storage
      .from('productos-imagenes') // Asegúrate de tener creado este bucket en tu pestaña Storage
      .upload(nombreArchivo, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Solicitamos la URL pública definitiva de internet
    const { data: { publicUrl } } = supabase.storage
      .from('productos-imagenes')
      .getPublicUrl(nombreArchivo);

    return new Response(JSON.stringify({ success: true, url: publicUrl }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error interno al procesar la imagen' }), { status: 500 });
  }
}
