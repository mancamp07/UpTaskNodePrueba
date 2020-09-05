const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//helpers con algunas funciones
const helpers = require('./helpers')

//crear la conexion a la base de datos
const db = require('./config/db');

//imprtar el modelo 
require('./models/Proyectos')

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//donde cargar los archivos estáticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine','pug');

//añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//para var dump a la aplicacion
app.use((req,res,next) => {
    res.locals.vardump = helpers.vardump;
    next();
});


//habilitar body parser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}));

//añadir la ruta
app.use('/', routes());

app.listen(3000);
//npm run start