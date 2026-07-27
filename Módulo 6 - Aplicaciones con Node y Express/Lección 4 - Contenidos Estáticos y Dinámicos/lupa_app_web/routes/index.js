const express = require('express');
const router = express.Router();

// Datos dinámicos del servidor
const tiendaInfo = {
  nombre: "MiniShop",
  bienvenida: "¡Encuentra los mejores estilos al mejor precio!"
};

// Arreglo de productos (corregidos los enlaces de imagen rotos del PDF)
const productos = [
  { nombre: "Camiseta Básica", precio: 15, disponible: true, imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
  { nombre: "Pantalón Jeans", precio: 30, disponible: false, imagen: "https://images.unsplash.com/photo-1583005008627-cf9c4e1a9d6d?w=600" },
  { nombre: "Zapatos Deportivos", precio: 50, disponible: true, imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { nombre: "Chaqueta de Cuero", precio: 80, disponible: true, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
  { nombre: "Gorra Clásica", precio: 12, disponible: true, imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600" }
];

// Función para manejar métodos no permitidos
const methodNotAllowed = (req, res) => res.status(405).send('Método no permitido');

// GET /: Renderiza home.handlebars
router.route('/')
    .get((req, res) => {
      res.render('home', { tiendaInfo, productos });
    })
    .all(methodNotAllowed); // Responde 405 si se usa POST, PUT, DELETE, etc.

// GET /about: Renderiza about.handlebars
router.route('/about')
    .get((req, res) => {
      res.render('about', { tiendaInfo });
    })
    .all(methodNotAllowed);

// GET y POST /contact: Formulario de contacto y su procesamiento
router.route('/contact')
    .get((req, res) => {
      res.render('contact', { tiendaInfo });
    })
    .post((req, res) => {
      const { nombre } = req.body;
      res.render('success', { nombre, tiendaInfo });
    })
    .all(methodNotAllowed);

module.exports = router;