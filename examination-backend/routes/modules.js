const express = require('express');
const router = express.Router();

const Module = require('../models/Module');

router.post('/createModule', (req,res,next) => {
   let newModule = {
       moduleCode: req.body.moduleCode,
       admins: req.body.admins? req.body.admins:[],
       registeredStudents: req.body.registeredStudents? req.body.registeredStudents:[],
       resultAvailable: false,
       results: []
   };
   Module.createModule(newModule, (error,success) => {
       if(error){
           res.json({
               success:false,
               msg: error
           });
       } else {
           res.json(success);
       }
   });
});

module.exports = router;