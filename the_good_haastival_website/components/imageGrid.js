import "firebase/storage";
import firebase from "firebase/app";
import { firebaseConfig } from "../config";
import React from "react";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

class ImageGrid extends React.Component {
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

  setImages = async (res) => {
    let fireImages = [];

    for(let i=0; i<res.items.length; i++){
      await res.items[i].getDownloadURL().then((url) => fireImages.push(url));
      this.setState({
        images: fireImages,
      });
    }
  };

  componentDidMount() {
    this.getImages();
  }

  render() {
    const imageTags = this.state.images.map((elem, idx) => (
        <img key={idx} src={elem} style={{width:32 + "vw", height:33+"vw"}}></img>
    ));
    return <div>{imageTags}</div>;
  }
}

export default ImageGrid;
