import sha256 from "crypto-js/sha256";
import firebase from "firebase/app";
import "firebase/database";
import Head from "next/head";
import React, { Component } from "react";
import { checkIfTokenIsValid, getAESKey } from "../lib/checkToken";
import styles from "../styles/Home.module.css";
var AES = require("crypto-js/aes");
const isBrowser = typeof window != "undefined";

checkValid();

async function checkValid() {
  if (isBrowser && (await checkIfTokenIsValid())) {
    window.location.href = "/";
  }
}
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
class LoginPage extends Component {
  checkUserLoginInfo = async (username, password) => {
    let hash = sha256(username + password).toString();
    let retVal = await firebase
      .database()
      .ref("hashes")
      .child(hash)
      .once("value");

    return {
      valid: retVal.exists(),
      admin: retVal.val(),
    };
  };

  generateTokenCookie = async (isAdmin) => {
    var number = Math.floor(Math.random() * 2 ** 32) * 17;
    if (isAdmin) {
      number *= 19;
    }
    var encrypted = AES.encrypt(
      number.toString(),
      await getAESKey()
    ).toString();
    var d = new Date();
    d.setTime(d.getTime() + 3 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = "token=" + encrypted + ";" + expires;
  };

  createUserNameCookie = (username) => {
    var d = new Date();
    d.setTime(d.getTime() + 3 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = "username=" + username + ";" + expires;
  };

  logUserIn = () => {
    window.location.href = "/";
  };

  onSubmit = async (event) => {
    event.preventDefault();

    let { valid, admin } = await this.checkUserLoginInfo(
      event.target.usrname.value,
      event.target.passwd.value
    );

    if (valid) {
      await this.generateTokenCookie(!!admin);
      this.createUserNameCookie(event.target.usrname.value);
      this.logUserIn();
    } else {
      alert("rip");
    }
  };

  render() {
    return (
      <div>
        <Head>
          <title>Login</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to The *SlightlyMediocre* Haastival website!
          </h1>
          <form onSubmit={this.onSubmit}>
            <label>Username:</label>
            <input type="text" id="usrname" name="usrname" required />
            <br />
            <label>Password: </label>
            <input type="password" id="passwd" name="passwd" required />
            <br />
            <button type="submit">Submit</button>
          </form>
          <div className={styles.grid}></div>
        </main>
      </div>
    );
  }
}

export default LoginPage;
