import firebase from "firebase";
var provider = new firebase.auth.GoogleAuthProvider();

export const googleSigin = (cb) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      // console.log(user);
      // localStorage.setItem("unisec-mic-uid", user.uid);
      // localStorage.setItem("unisec-mic-name", user.displayName);
      cb();
    })
    .catch((error) => {});
};
