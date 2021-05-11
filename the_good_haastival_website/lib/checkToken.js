import firebase from "firebase/app";
import "firebase/database";
var AES = require("crypto-js/aes");
var Utf8 = require("crypto-js").enc.Utf8;

async function checkIfTokenIsValid() {
  var cookie = document.cookie;
  if (cookie.length > 0) {
    var token = cookie.match(/token=([^;\s]+)/)[1];
    var decrypted = AES.decrypt(token,  getAESKey()).toString(Utf8);
    return decrypted % 17 == 0;
  } else {
    return false;
  }
}

async function getAESKey() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
    });
  } else {
    firebase.app(); // if already initialized, use that one
  }

  let data = await firebase.database().ref("key").get();
  return data.val();
}

export { checkIfTokenIsValid, getAESKey };
