const firebase = require("firebase");

export default (req, res) => {
  startFirebase();
  firebase
    .database()
    .ref("mic_register/")
    .once("value")
    .then((snap) => {
      res.send(snap.val());
    });
};

const startFirebase = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyBHmXEDhOFaKwTOiPFQLTuqzwNEo8ZbM0E",
    authDomain: "unisec-mic.firebaseapp.com",
    projectId: "unisec-mic",
    storageBucket: "unisec-mic.appspot.com",
    messagingSenderId: "613913637057",
    appId: "1:613913637057:web:14b10a9ce44025031de440",
    measurementId: "G-R157FMZ8K0",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};
