const express = require('express');
const router = express.Router();
const passport = require('passport');
const Module = require('../models/Module');

// Endpoint for creation of new module
router.post('/createModule', passport.authenticate('jwt', { session: false }) ,(req,res,next) => {
   console.log(req.body);
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
           res.json({
               success:true,
               msg: success
           });
       }
   });
});

// Endpoint to check if a module exists
router.get('/moduleExists', (req,res,next) => {
    let moduleId = req.query.mouduleId;
    Module.isModuleExists(moduleId, (err, success) => {
        if(err){
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: success
            });
        }
    });
});

// Endpoint for getting modules registered by a user
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

// Endpoint to get admin modules of a user
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

// Endpoint for updating resulsts
router.post('/updateResults', passport.authenticate('jwt', { session: false }), (req,res,next) => {
    let result = {
        moduleCode:req.body.moduleId,
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

// endpoint to register to a module
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

// endpoint to get information about a module
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

// endpoint for submitting recorrection requests
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

// endpoint for setting up module notifications
router.post('/module-notification', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
   let message = req.body.message;
   let moduleId = req.body.moduleId;
   let authorID = req.body.userId;
   Module.createModuleMessage(moduleId,authorID,message, (err,success)=> {
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


module.exports = router;