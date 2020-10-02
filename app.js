//console.log("Hello World with Nodejs and Express 2");

import students from './data/students.json';
import express from 'express'; //LLAMADO A EXPRESS CON ES6!

const PORT = 3000;
const server  = express();

server.set('port', process.env.PORT || PORT);

const BuildUrl = (version,path) => `/api/${version}/${path}`;

//const BuildUrl = (version,path) => `/api/${version}/${path}/:tagId`;
//Se le agrega el parametro para recibirlo luego con el server.get

server.get(BuildUrl('v1','students'), (req, res) => {
    res.json(students); //get Toma del URL agregandole :id por ej
    
    //var id = req.params.tagId; // ejemplo enviando parametros
    //res.send(id); // para desplegar el parametro
})

/* VERSION CON REQ.QUERY, EN EL URL IRIA URL?tagId=10

const BuildUrl = (version,path) => {
    var url =  `/api/${version}/${path}`;
    console.log(url);
     return (url);
 }
 
 server.get(BuildUrl('v1','students'), (req, res) => {
     var id = req.query.tagId;
     console.log(id);
     res.send(id);
     //res.json(students); //get Toma del URL se puede agregar :id por ej
 })*/

server.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
});
