const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.migrate = functions.firestore
  .document("/mic_register/{userId}")
  .onUpdate((snap, context) => {
    //// API To AirTable
  });
