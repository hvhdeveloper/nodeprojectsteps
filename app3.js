import students from './data/students.json';
import express from 'express'; //LLAMADO A EXPRESS CON ES6!
import _ from 'lodash';

const PORT = 3000;

const BuildUrl = (version,path) => `/api/sampleRoute/${version}/${path}`;
const BASE_URL = BuildUrl('v1','students');

const server  = express();

// AQUI VIENEN DOS GET, UNO MUESTRA TODO Y EL OTRO  USA FIND DE LODASH PARA MOSTRAR SOLO ESE ID
//http://localhost:3000/api/sampleRoute/v1/students/
//http://localhost:3000/api/sampleRoute/v1/students/2

server.get(BASE_URL, (req, res) => {
    res.json(students);
})

server.get(`${BASE_URL}/:id`, (req, res) => {
    console.log("entro");
    const student = _.find(students, student => student.id === req.params.id);
    if (student){
        console.log(student);
        res.json(student);

    }else{
        res.send(`El id ${req.params.id} del estudiante no se ha encontrado`);
    }
})

server.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
});
