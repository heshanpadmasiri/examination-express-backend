const express = require('express');
const router = express.Router();

const User = require('../models/User');

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
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to register user"
            });
        } else {
            res.json({
                success: true,
                msg: "User registered"
            });
        }
    });
});

module.exports = router;
