const admin = require('firebase-admin');
const db = admin.firestore();


/**
 * Use to create a message directly addressing an user
 * Message should have content, type and author
 * */
module.exports.createUserMessage = function (message,userId,callback) {
    if(message && userId){
        let docRef = db.collection('Messages').doc(userId);
        docRef.get().then(doc => {
            // If doc already exists update the message so other messages are not destroyed
            if(doc.exists){
                let data = doc.data();
                let messages = data.messages;
                messages.push(message);
                docRef.update({
                    messages:messages
                });
                callback(null, 'successfully updated the message queue');
            } else {
                let messages = [message];
                docRef.set({
                    messages:messages
                });
                callback(null, 'successfully created a new message queue');
            }
        })
    } else {
        callback('message and userId must be non empty',null);
    }
};