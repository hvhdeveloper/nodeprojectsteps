//console.log("Hello World with Nodejs and Express 2");

import students from './data/students.json';
import express from 'express'; //LLAMADO A EXPRESS CON ES6!
import _ from 'lodash';

const PORT = 3000;

const BuildUrl = (version,path) => `/api/${version}/${path}`;
const BASE_URL = BuildUrl('v1','students');

const server  = express();

server.get(`${BASE_URL}/:id`, (req, res) => {
    //server.get(`${BASE_URL}/:id/:course`, (req, res) => { //Ejemplo recibo dos variables del url
    //res.json(students);
    //res.send(`Estos son los parametros:${req.params.id} y ${req.params.course}`);

    //CON LODASH PARA SACAR UN OBJ ESPECIFICADO CON ID DEL ARRAY STUDENTS:

    var student = _.find(students, student => student.id === req.params.id);
    if (student){
        console.log(student);
        res.json(student);

    }else{
        res.send(`El id ${req.params.id} del estudiante no se ha encontrado`);

    }

   /* //OTRO EJEMPLO SENCILLO creando un ARRAY DE OBJs y luego buscar id con: _.FIND de LODASH:
    var array1 = [{"id":'1',"name":'hek'},{"id":'2',"name":'hek2'},{"id":'3',"name":'hek3'},{"id":'4',"name":'hek4'},{"id":'5',"name":'hek5'}]; //SE CREA ASI EL ARRAY DE OBJETOS

    var elMae = _.find(array1, elMae => elMae.id == '3'); // recorre uno a uno y guarde elMae que es.
    if(elMae){res.send(elMae)}else{res.send("No esta")} //si lo encontró lo muestra todo, si no error.*/
})

//MULTIPLE HANDLERS SAMPLE

server.get(`/multiplehandlers`, (req,res,next) => {
    console.log("este es el primer handle\n\n");
    next(); //Solo con next() llamo al handler que sigue
}, (req,res) => { //cada funcion se separa con una coma (,)
    res.send("este es el segundo handle\n\n");
});

server.post(BASE_URL, (req, res) => {
    //end(); //Con esto podemos terminar requests.
    res.json(students);
})

server.put(BASE_URL, (req, res) => {
    //res.json(students);
})

server.delete(BASE_URL, (req, res) => {
    //res.json(students);
})


//server.set('port', process.env.PORT || PORT);

server.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
});
