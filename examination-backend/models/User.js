const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

const db = admin.firestore();

module.exports.addUser = function (newUser) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw error;
            newUser.password = hash;
            saveUser(newUser);
        });
    })
};

// Use this to save new Users to the database
function saveUser(newUser) {
    console.log('dd' + newUser.id)
    let docRef = db.collection('Users').doc(newUser.id);
    docRef.set(newUser);
}