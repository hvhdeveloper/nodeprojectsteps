import students from './data/students.json';
import studentRoute from './routes/studentsRoute';
import express from 'express'; //LLAMADO A EXPRESS CON ES6!
import morgan from 'morgan';
import _ from 'lodash';
import bodyParser from 'body-parser';
import alert from 'alert';
import path from 'path';
import https from 'https';
import fs from 'fs';

//alert("APP INCIALIZADA");


const PORT = 3000;
const TLS_PORT = 3003;

const tlsOptions = {
    key: fs.readFileSync(path.join('key.pem')),
    cert: fs.readFileSync(path.join('cert.pem')),
    passphrase: 'hello'
}

const BuildUrl = (version,path) => `/api/middlewares/${version}/${path}`;
const BASE_URL = BuildUrl('v1','students');

const server  = express();

server.use(morgan('tiny')); // DEVUELVE URL DEL CLIENTE QUE LLAMO AL SERVIDOR CON LA APP
server.use(bodyParser.json());
server.use('/bajar',express.static('public'));

// USO EJS module para mostrar bonito en html

server.set('views', path.join('views')); // Incializarlo, el primer views se puede quitar.
server.set('view engine', 'ejs');

server.use(BASE_URL,studentRoute);

server.get('/',(req,res)=>{
    res.render('index',{
        VarStudentsDentroDeEjs : students  //Podria ir solo students
    });  
});

server.get('/download/images/:imagenName',(req,res)=>{
    res.download(path.join('public', 'images', req.params.imagenName));
});

server.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
});

https.createServer(tlsOptions, server).listen(TLS_PORT, () =>{
    console.log(`server started on HTTPS PORT ${TLS_PORT}`);

})