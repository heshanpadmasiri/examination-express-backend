const express = require('express');
const router = express.Router();

const User = require('../models/User');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

// Register new User
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



// Authenticate
router.post('/login',(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
   
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
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

module.exports = router;
