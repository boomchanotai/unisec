const firebase = require("firebase");
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

const API_KEY = `key2qS0DwoycTMw6N`;

const CastAPI = (path) =>
  `https://api.airtable.com/v0/appc7HQcyNHTNh8Ox/${path}&api_key=${API_KEY}`;

const migrateData = async (data, _res) => {
  const res1 = await axios.get(
    CastAPI("Registered%20Members?maxRecords=3&view=Grid%20view")
  );
  const alreadyRecoreded = res1.data.records.map((r) => r["fields"].email);

  const list = Object.keys(data)
    .map((key) => data[key])
    .filter((t) => t.member != null);
  const members = list
    .map((l) => l["member"].map((m) => ({ ...m, teamname: l["teamname"] })))
    .filter((m) => m != null)
    .reduce((p, c) => [...p, ...c], [])
    .map((member) => {
      if (member.emergency) {
        const emergency = member.emergency;
        delete member.emergency;
        return {
          ...member,
          emergency_name: emergency["meen"],
          emergency_tel: emergency["tel"],
        };
      }
    });
  axios
    .post(CastAPI("Registered%20Members?"), {
      records: members
        .filter(({ email }) => !alreadyRecoreded.includes(email))
        .map((m) => ({ fields: m })),
    })
    .then(({ data }) => _res(data));
};
