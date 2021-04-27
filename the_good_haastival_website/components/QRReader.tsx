import React, { Component } from "react";
const isBrowser = typeof window != "undefined";
import { firebaseConfig } from "../config.js";
import firebase from "firebase/app";
import "firebase/database";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let database = firebase.database();
var videoPreviewStyle = {
  width: "100%",
  "max-width": "300px",
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