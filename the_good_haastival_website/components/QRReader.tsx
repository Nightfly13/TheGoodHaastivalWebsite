import React, { Component } from "react";
const isBrowser = typeof window != "undefined";
import firebase from "firebase/app";
import "firebase/database";
import { hydrate, render } from "react-dom";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
  });
} else {
  firebase.app(); // if already initialized, use that one
}

let database = firebase.database();
var videoPreviewStyle = {
  width: "100%",
  maxWidth: "300px",
  height: "20%",
  display: "block",
  margin: "0 auto",
};

if (isBrowser) {
  var QrReader = require("react-qr-reader");
}

class QRReader extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data) => {
    if (data) {
      var regex = /^([A-F\d]{8}-([A-F\d]{4}-){3}[A-F\d]{12}|[A-F\d]{16})$/gi;
      if (data.match(regex)) {
        database
          .ref("coupons/" + data)
          .once("value")
          .then(function (snapshot) {
            if (snapshot.exists()) {
              window.location.href = "/coupons?id=" + data;
            } else {
              console.log("Not found in DB, but passed regex");
            }
          });
      } else {
        data = "The code appears to be not festival related. Please try again!";
      }

      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      isBrowser && (
        <div>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={videoPreviewStyle}
          />
          <p>{this.state.result}</p>
        </div>
      )
    );
  }
}

export default QRReader;
