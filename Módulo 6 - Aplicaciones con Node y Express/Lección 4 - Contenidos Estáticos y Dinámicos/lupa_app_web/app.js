const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars');

const indexRouter = require('./routes/index');

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine('.handlebars', engine({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    // Helper simple exigido: convierte texto a mayúsculas
    mayusculas: (texto) => texto.toUpperCase()
  }
}));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enrutador principal
app.use('/', indexRouter);

module.exports = app;