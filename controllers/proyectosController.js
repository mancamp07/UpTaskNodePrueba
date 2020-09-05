const Proyectos = require('../models/Proyectos');


//const { render } = require("pug");

exports.proyectosHome = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    
    res.render('index', {
        nombrePagina:'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req,res) => {

    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req,res) => {
    //res.send('Enviaste el formulario');
    //enviar a la consola lo que el usuario envía
    //console.log(req.body);
    const proyectos = await Proyectos.findAll();
    //validar que tengamos algo en el input
    const nombre  = req.body.nombre;
    let errores = [];
    
    if(!nombre){
        errores.push({'texto':'Agregar un nombre al proyecto'})
    }

    //si hay errores
    if(errores.length>0){
        res.render('nuevoProyecto', {
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        });
    }else{
        //no hay errores
        //insetar a la base de datos
        
        await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req,res,next) => {
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where:{
            url: req.params.url
        }
    });

    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    if(!proyecto){
        return next();
    }

    //render a la vista tereas
    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async (req,res) =>{
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where:{
            id: req.params.id
        }
    });

    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);


    //render a la vista
    res.render('nuevoProyecto', {
        nombrePagina:'Editar Proyecto',
        proyectos,
        proyecto
    })
}

//actulizar proyecto
exports.actualizarProyecto = async (req,res) => {
    //res.send('Enviaste el formulario');
    //enviar a la consola lo que el usuario envía
    //console.log(req.body);
    const proyectos = await Proyectos.findAll();
    //validar que tengamos algo en el input
    const nombre  = req.body.nombre;
    let errores = [];
    
    if(!nombre){
        errores.push({'texto':'Agregar un nombre al proyecto'})
    }

    //si hay errores
    if(errores.length>0){
        res.render('nuevoProyecto', {
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        });
    }else{
        //no hay errores
        //insetar a la base de datos
        
        await Proyectos.update(
           {nombre: nombre},
           {where: {id:req.params.id}}
        );
        res.redirect('/');
    }
}