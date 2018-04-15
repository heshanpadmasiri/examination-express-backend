const express = require('express');
const router = express.Router();
const passport = require('passport');
const Module = require('../models/Module');

router.post('/createModule', passport.authenticate('jwt', { session: false }) ,(req,res,next) => {
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

router.post('/updateResults', passport.authenticate('jwt', { session: false }), (req,res,next) => {
    let result = {
        moduleCode:req.body.moduleCode,
        userId:req.body.userId,
        results:req.body.results
    };
    if(result.userId && result.moduleCode && result.results){
        Module.updateResults(result, (err,success) => {
            if (err){
                res.json({
                    success:false,
                    msg: err
                });
            }  else {
                res.json({
                    success:true,
                    msg: 'Successfully updated'
                });
            }
        });
    } else {
        res.json({
            success:false,
            msg:'incomplete parameters'
        });
    }
});

router.post('/registerToModule', passport.authenticate('jwt', { session: false }), (req,res,next)=> {
   let userId = req.body.userId;
   let moduleId = req.body.moduleId;
   Module.registerToModule(userId,moduleId,(err, success) => {
       if(err){
           res.json({
               success:false,
               msg:err
           });
       } else {
           res.json({
               success:true,
               msg:'Successfully registered'
           });
       }
   });
});

router.get('/moduleData', (req,res,next) => {
    let moduleId = req.query.moduleId;
    Module.getModulebyId(moduleId, (err,success) => {
        if(err){
            res.json({
                success:false,
                msg:err
            });
        } else {
            res.json({
                success: true,
                msg:success
            });
        }
    })
});

// todo: add ability to submit papers

// todo: handle moderation requests

router.post('/re-correction', passport.authenticate('jwt', { session: false }), (req,res,next) => {
    let userId = req.body.userId;
    let moduleId = req.body.moduleId;
    Module.requestReCorrection(userId,moduleId, (err, success)=> {
       if(err){
           res.json({
               success:false,
               msg:err
           });
       } else {
           res.json({
               success:true,
               msg:success
           });
       }
    });
});

// todo: module notifications



module.exports = router;