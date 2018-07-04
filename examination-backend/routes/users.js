const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Messages = require('../models/Messages');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');

// endpoint to check if a userId is already in use
router.get('/checkAvailbility', (req, res, next) => {
    let userID = req.query.userId;
    User.isAvailable(userID, (err, success) => {
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

// endpoint to get list of academic users
router.get('/academicUsers', (req, res, next) => {
    User.getAcademicsUsers((err, success) => {
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
    })
})

// endpoint to register new users
router.post('/register', (req, res, next) => {
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        id: req.body.id
    };
    User.addUser(newUser, (err, success) => {
        if (err) {
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

// endpoint to authenticate user
router.post('/login',(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
   
    User.getUserByUsername(username, (err, user) => {
        if(err) {
            return res.json({
                success:false,
                token:null,
                user:null,
                msg: err
            })
        }
        if(!user){
            return res.json({
                success:false,
                token:null,
                user:null,
                msg: "user not found"
            });
        }

        User.comparePasswords(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, constants.jwtSecret, {
                    expiresIn: 604800 // 1 week in seconds
                });
                res.json({
                    success:true,
                    token: token,
                    user: {
                        id: user.id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        type: user.type
                    },
                    msg: "User authenticated successfully"
                });
            } else {
                res.json({
                    success:false,
                    token:null,
                    user:null,
                    msg: "Wrong password"
                });
            }
        });
    });
});

// endpoint to get overall results of a user
router.get('/results', (req,res,next)=> {
    let userId = req.query.userId;
    if(userId){
        User.getOverallResults(userId, (err, success) => {
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
    } else {
        res.json({
            success:false,
            msg:"UserId must be non empty"
        });
    }
});

// endpoint to get messages addressed to a user
router.get('/messages', (req,res,next) => {
    let userId = req.query.userId;
    Messages.getUserMessages(userId, (err,success) => {
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
