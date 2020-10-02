import express from 'express'; 
import _ from 'lodash';
import students from '../data/students.json';
import mongoose from 'mongoose';

const DB_pass = 'MDBcr2020';
const DB_name = 'Cluster0';

const DB_URL = `mongodb+srv://hectorvh:${DB_pass}@cluster0.77fjl.mongodb.net/${DB_name}retryWrites=true&w=majority`;

const router  = express.Router();

let studentsArray = students;

mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(err);
    });

const db = mongoose.connection;

db.once('open',() => {
    console.log('Hurra nos conectamos!');
})

const studentsSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    name: String,
    course: String
});

const studentsModel = mongoose.model('student', studentsSchema)

router.get(`/`, (req, res) => {
    //res.json(studentsArray); // ejemplo con array y el json
    studentsModel.find((err, estudiantes) => {
        console.log(estudiantes);
        if(err) res.status(500).send(err);
        res.json(estudiantes);
    });
});

router.get('/:id', (req, res) => {
    /*const student = _.find(studentsArray, student => student.id === req.params.id);
    if (student){
        console.log(student);
        res.json(student);
    }else{      
        res.send(`El id ${req.params.id} del estudiante no se ha encontrado`);
    }*/
    studentsModel.findById(req.params.id, (err, estudiante) => {
        if(err) res.status(500).send(err);
        if (estudiante){
            res.json(estudiante);
        }else{      
            res.status(404).send(`El id ${req.params.id} del estudiante no se ha encontrado`);
        }
    });
});

router.post(`/`, (req, res) => {
    console.log(req.body); // PARA PARSEAR OSEA MOSTRAR JSON DE SOLICITUD USAR BODY-PARSER
    /*studentsArray.push(req.body);
    res.status(200).send("OK");*/
    const id = new mongoose.Types.ObjectId();
    const studentToPersist = Object.assign({
        _id: id
    }, req.body);
        
    console.log(JSON.stringify(studentToPersist));
    const student = new studentsModel(studentToPersist);
    
    student.save().then((err, student) => {
        if(err) res.status(500).send(err);
        res.json(student);
    });
  
});

router.put(`/:id`, (req, res) => {
    //res.json(students);
    studentsModel.findById(req.params.id, (err, estudiante) => {
        //if(err) res.status(500).send(err);
        if (estudiante){
            estudiante.name = req.body.name;
            estudiante.course = req.body.course;
            estudiante.save().then((err, estudiante) => {
                if(err) res.status(500).send(err);
                res.json(estudiante);
            });
        }else{      
            res.status(404).send(`El id ${req.params.id} del estudiante no se ha encontrado`);
        }
    });
})

router.delete(`/:id`, (req, res) => {
    //res.json(students);
        //res.json(students);
        studentsModel.findByIdAndRemove(req.params.id, (err, estudiante) => {
            //if(err) res.status(500).send(err);
            if (estudiante){
                res.status(200).send(`El estudiante con id ${req.params.id} ha sido borradoo`);;
            }else{      
                res.status(404).send(`El id ${req.params.id} del estudiante no se ha encontrado`);
            }
        });
})

//ESTO QUE SIGUE ES SOLO PARA VALIDAR QUE ID ES UN NUMERO PERO CON ID AUTOMATICO NO VA....

/*router.param('id',(req,res,next,id) => { // PARA TRABAJAR LOS PARAMETROS RECIBIDOS POR APARTE
    if (isNaN(id)){ // if (isNaN(eq.params.id) Puedo usar tambien asi sin llamar id arriba. 
        next(`User Id not valid! ${id} is not a number`);
    } else {
        next();
    }
});*/

module.exports = router;