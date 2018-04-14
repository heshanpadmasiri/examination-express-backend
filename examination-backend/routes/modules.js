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

router.get('/registeredModule', (req,res,next) => {
   let userId = req.query.userId;
   if(userId){
       Module.getRegisteredModules(userId, (error,success) => {
           if (error){
               res.json({
                   success:false,
                   msg: error
               });
           }  else {
               res.json({
                   success: true,
                   msg: success
               });
           }
       });
   } else {
       res.json({
           success:false,
           msg: 'userId must be non empty'
       });
   }
});

router.get('/adminModules',(req,res,next)=>{
    let userId = req.query.userId;
    if(userId){
        Module.getAdminModules(userId, (error,success) => {
            if (error){
                res.json({
                    success:false,
                    msg: error
                });
            }  else {
                res.json({
                    success: true,
                    msg: success
                });
            }
        });
    } else {
        res.json({
            success:false,
            msg: 'userId must be non empty'
        });
    }
});

module.exports = router;