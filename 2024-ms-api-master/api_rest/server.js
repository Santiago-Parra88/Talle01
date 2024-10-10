const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const db = require('./db');
const routes = require('./network/routes');

const app = express();

db(config.DB_URL);

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:9191', // Permitir solo este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

//app.options('*', cors()); // Permitir preflight requests para cualquier ruta

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use('/', express.static('public'));

// Rutas
routes(app);

app.listen(config.PORT, () => {
    console.log(`La aplicación se encuentra arriba en http://localhost:${config.PORT}/`);
});
