const axios = require("axios");

export default (req, res) => {
  startFirebase();
  firebase
    .database()
    .ref("mic_register/")
    .once("value")
    .then((snap) => {
      migrateData(snap.val(), res.send);
    });
};

const form = new FormData();
form.append("from", "Excited User <mailgun@unisec-thailand.org>");
form.append("to", "meen.sankaew@gmail.com");
form.append("subject", "Hello");
form.append("text", "Testing some Mailgun awesomeness!");

const options = {
  method: "POST",
  url: "https://api.eu.mailgun.net/v3/unisec-thailand.org/messages",
  headers: {
    Authorization:
      "Basic YXBpOmMyMjE2YTZiMWE5MWY4ZGIzNzAyMjhkN2ZlYWEzZmU4LTI0MTZjZjI4LWU0MzBhY2Jj",
    "content-type": "multipart/form-data; boundary=---011000010111000001101001",
  },
  data: "[form]",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
