import "firebase/storage";
import firebase from "firebase/app";
import { firebaseConfig } from "../config";
import React from "react";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

class HelloMessage extends React.Component {
  state = {
    images: [],
  };

  getImages() {
    firebase
      .storage()
      .ref("images-to-verify")
      .listAll()
      .then((x) => this.setImages(x));
  }

  setImages = (res) => {
    let fireImages = [];

    res.items.forEach((itemRef) => {
      let url = itemRef.getDownloadURL().then((url) => fireImages.push(url));
    });
    this.setState({
      images: fireImages,
    });
  };

  componentDidMount() {
    this.getImages();
  }

  render() {
    const imageTags = this.state.images.map((elem) => (
      <img src={elem} style={{ width: 50 + "px", height: 50 + "px" }}></img>
    ));
    return <div>{imageTags}</div>;
  }
}

export default HelloMessage;
