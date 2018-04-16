const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

const Module = require('../models/Module');
const each = require("async/each");

const db = admin.firestore();

/*
* Used to create new users If a user by the Id exists will over write the user
* */
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            saveUser(newUser);
        });
        callback(null, 'successfully created new user');
    })
};

/*
* Used to get the used by the user Id. It is assumed that doc id to be same as user id
* */
module.exports.getUserById = function (id, callback) {
  db.collection('Users').doc(id)
      .get()
      .then(snapshot => {
          callback(null, snapshot.data())
      });
};

/*
* Used to get the used by username. Will return the first user who's username matching the query
* Will return null if no user matches the query
* */
module.exports.getUserByUsername = function (username, callback) {
    db.collection('Users').where('username','==',username).limit(1)
        .get()
        .then(docs => {
            if(docs.size === 0) {
                callback(null,null);
            }
            docs.forEach(doc => {
                const match = doc.data();
                callback(null, match)
            });
        });
};

/*
* Used to compare password hash stored in the database against the plaintext password given
* */
module.exports.comparePasswords = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash, (error, isMatch) => {
        if(error) console.log(err);
        callback(null, isMatch);
    });
};

// Use this to save new Users to the database
function saveUser(newUser) {
    // set user type
    if(newUser.id[0] === '2'){
        newUser.type = 'academic';
    } else if(newUser.id[0] === '3'){
        newUser.type = 'admin';
    } else {
        newUser.type = 'student';
    }
    let docRef = db.collection('Users').doc(newUser.id);
    docRef.set(newUser);
}

/**
 * Use to get overall results of a given user
 * */
module.exports.getOverallResults = function (userId, callback) {
    let overallResults = [];
    Module.getRegisteredModules(userId, (err,success)=> {
        if (err) {
            callback(err, null);
        } else {
            each(success, function (moduleId, _callback) {
                Module.getModulebyId(moduleId, (err, _success) => {
                    if (err) {
                        callback(err, null);
                        _callback();
                    } else {
                        if (_success.resultAvailable) {
                            each(_success.results, function (result, _callback2) {
                                if (result[userId]) {
                                    overallResults.push({
                                        module: moduleId,
                                        result: result[userId]
                                    });
                                    _callback2();
                                } else {
                                    _callback2();
                                }
                            } , function (err) {
                                if(err){
                                    console.log(err);
                                    callback(err,null);
                                    _callback();
                                } else {
                                    _callback();
                                }
                            });
                        } else {
                            _callback();
                        }
                    }
                });
            }, function (err) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, overallResults);
                }
            });
        }
    });
};