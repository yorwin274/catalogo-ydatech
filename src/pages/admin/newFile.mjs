import { form, btnCrear, modoNuevaCategoria } from "./nuevo.astro.inline.mjs";

form?.addEventListener('submit', (e) => {
e.preventDefault();

btnCrear.textContent = 'Procesando registro...';
btnCrear.style.backgroundColor = '#f59e0b';

// Determinar qué valor de categoría tomar según el modo activo
const categoriaFinal = modoNuevaCategoria
? document.getElementById('prod-cat-text').value.trim()
: document.getElementById('prod-cat-select').value;

setTimeout(() => {
btnCrear.textContent = '¡Producto Agregado con Éxito! ✓';
btnCrear.style.backgroundColor = '#059669';

const datosNuevoItem = {
nombre: document.getElementById('prod-nombre').value.trim(),
categoria: categoriaFinal, // Guarda la categoría elegida o la nueva creada
precio: parseFloat(document.getElementById('prod-precio').value),
stock: parseInt(document.getElementById('prod-stock').value), descripcion: document.getElementById('prod-desc').value.trim(), detalles: document.getElementById('prod-detalles').value.trim(), imagen: /images/$
}, { document, getElementById }; ('prod-imagen').value.trim();
});
});
