import students from './data/students.json';
import studentRoute from './routes/studentsRoute';
import express from 'express'; //LLAMADO A EXPRESS CON ES6!
import _ from 'lodash';

const PORT = 3000;

const BuildUrl = (version,path) => `/api/sampleRoute/${version}/${path}`;
const BASE_URL = BuildUrl('v1','students');

const server  = express();

server.use(BASE_URL,studentRoute); //LLAMA AL ROUTER studentsRoute.js en Folder routes

server.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
});
