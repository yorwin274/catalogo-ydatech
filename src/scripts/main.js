// src/scripts/main.js
document.addEventListener('DOMContentLoaded', () => {
  const buscador = document.getElementById('buscador');
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const bloquesCategoria = document.querySelectorAll('.bloque-categoria');
  const mensajeSinResultados = document.getElementById('sin-resultados');

  let categoriaActiva = 'todos';
  
  function filtrarCatalogo() {
    const query = buscador ? buscador.value.toLowerCase().trim() : '';
    let productosVisiblesTotales = 0;

    bloquesCategoria.forEach(bloque => {
      const catDelBloque = bloque.getAttribute('data-categoria') || '';
      const tarjetasDelBloque = bloque.querySelectorAll('.tarjeta-contenedor');
      let productosVisiblesEnBloque = 0;

      // 🎯 MODIFICACIÓN: Si el usuario escribe una Marca en el buscador que coincide con el nombre del bloque, la dejamos pasar automáticamente
      const categoriaCoincide = (categoriaActiva === 'todos' || 
                                 categoriaActiva === catDelBloque || 
                                 catDelBloque.toLowerCase().includes(query));

      tarjetasDelBloque.forEach(tarjeta => {
        const nombreProducto = tarjeta.getAttribute('data-nombre') || '';
        const catDeLaTarjeta = (tarjeta.getAttribute('data-cat') || '').toLowerCase();
        
        // 🚀 EL TRUCO: Coincide si el texto del buscador está en el NOMBRE del accesorio O en su CATEGORÍA
        const coincideBuscador = nombreProducto.includes(query) || catDeLaTarjeta.includes(query);

        if (categoriaCoincide && coincideBuscador) {
          tarjeta.style.display = 'block';
          productosVisiblesEnBloque++;
          productosVisiblesTotales++;
        } else {
          tarjeta.style.display = 'none';
        }
      });

      if (productosVisiblesEnBloque === 0) {
        bloque.style.display = 'none';
      } else {
        bloque.style.display = 'block';
      }
    });

    if (productosVisiblesTotales === 0 && (query !== '' || categoriaActiva !== 'todos')) {
      mensajeSinResultados?.classList.remove('hidden');
    } else {
      mensajeSinResultados?.classList.add('hidden');
    }
  }

  if (buscador) {
    buscador.addEventListener('input', filtrarCatalogo);
  }

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(btn => {
        btn.classList.remove('bg-[#5c3aff]', 'text-white', 'shadow-sm', 'shadow-indigo-100');
        btn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
      });

      boton.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
      boton.classList.add('bg-[#5c3aff]', 'text-white', 'shadow-sm', 'shadow-indigo-100');

      categoriaActiva = boton.getAttribute('data-filter') || 'todos';
      
      // 🚀 MODIFICACIÓN EXTRA: Si el botón presionado es una marca (no una categoría real de la tabla), vaciamos el input y le asignamos el valor del filtro para cruzar los datos de inmediato
      const filtrosBase = ['todos', 'audio', 'carga', 'cables']; // Añade aquí tus categorías base en minúsculas si tienes más
      if (!filtrosBase.includes(categoriaActiva.toLowerCase()) && categoriaActiva !== 'todos') {
        if (buscador) buscador.value = categoriaActiva;
        categoriaActiva = 'todos'; // Reseteamos para que busque de forma global en todas las carpetas
      } else if (categoriaActiva === 'todos' || filtrosBase.includes(categoriaActiva.toLowerCase())) {
        // Si vuelve a presionar una categoría normal, limpiamos el texto residual de marca
        if (buscador && filtrosBase.includes(categoriaActiva.toLowerCase())) buscador.value = '';
      }

      filtrarCatalogo();
    });
  });
});
