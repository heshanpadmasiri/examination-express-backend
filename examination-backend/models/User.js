const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

const db = admin.firestore();

/*
* Used to create new users If a user by the Id exists will over write the user
* */
module.exports.addUser = function (newUser) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw error;
            newUser.password = hash;
            saveUser(newUser);
        });
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
    console.log(candidatePassword);
    console.log(hash);
    bcrypt.compare(candidatePassword,hash, (error, isMatch) => {
        if(error) console.log(err);
        callback(null, isMatch);
    });
};

// Use this to save new Users to the database
function saveUser(newUser) {
    let docRef = db.collection('Users').doc(newUser.username);
    docRef.set(newUser);
}