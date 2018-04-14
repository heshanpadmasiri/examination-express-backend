const admin = require('firebase-admin');
const db = admin.firestore();

/*
* Use to set results or update them
* */
module.exports.updateResults = function (result,callback) {
  let moduleCode = result.moduleCode;
  // Make sure there is a module code
  if(moduleCode){
      let docRef = db.collection('Modules').doc(moduleCode);
      let temp = docRef.data();
      // check whether user have rights to modify results
      if (temp.admins.indexOf(result.userId) > -1){
          if(docRef.exists){
              docRef.update({
                  resultAvailable:true,
                  lastEditedBy:result.userId,
                  results: result.results
              });
              callback(null,{success:true});
          } else {
              callback('No such Module', null);
          }
      } else {
          callback('Permission denied', null);
      }
  } else {
      callback('Error no module Code',null);
  }
};

/*
* Use to create module in the database
* module {
*   moduleCode:string,
*   admins:string[] // ids of everyone who can change the module data
*   registeredStudents:string[] // ids of all registered students
*   resultAvailable: boolean
*   results:object[] // (index,result) pair for students
* }
* */
module.exports.createModule = function (module, callback) {
    if(module.moduleCode){
        db.collection('Modules').doc(module.moduleCode).set(module);
        callback(null, {success:true,module:module});
    } else {
        callback('ModuleCode must be non empty',null);
    }
};

/*
* Use to get module by module Id assuming doc id is same as module id
* */
module.exports.getModulebyId = function (id, callback) {
    db.collection('Modules').doc(id)
        .get()
        .then(snapshot => {
            callback(null, snapshot.data())
        });
};

/*
* Use to get module ids of the module registered by a given id as a student
* */
module.exports.getRegisteredModules = function (userId, callback) {
  let registeredModules = [];
  db.collection('Modules')
      .get()
      .then(docs.forEach(doc => {
          let data = doc.data();
          // Make sure registered students is not undefined
          if(data.registeredStudents && data.registeredStudents.indexOf(userId) > -1){
              registeredModules.push(data.moduleCode);
          }
      }));
  callback(null, registeredModules);
};

/**
 * Use to get module ids of modules where the user id is registered as an admin
 */
module.exports.getAdminModules = function (userId, callback) {
    let adminModules = [];
    db.collection('Modules')
        .get()
        .then(docs.forEach(doc => {
            let data = doc.data();
            // Make sure registered students is not undefined
            if(data.admins && data.admins.indexOf(userId) > -1){
                adminModules.push(data.moduleCode);
            }
        }));
    callback(null, adminModules);
};