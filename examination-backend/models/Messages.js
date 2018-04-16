const admin = require('firebase-admin');
const db = admin.firestore();


/**
 * Use to create a message directly addressing a user
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

/**
 * Use to get messages addressed to a user
 * Return empty array if no messages
 */
module.exports.getUserMessages = function(userId, callback){
    if(userId){
        db.collection('Messages').doc(userId).get().then(doc => {
            if(doc.exists){
                callback(null, doc.data().messages);
            } else {
                callback(null, []);
            }
        });
    } else {
        callback('userId must be non-empty', null);
    }
}