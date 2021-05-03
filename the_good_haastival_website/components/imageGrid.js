import "firebase/storage";
import firebase from "firebase/app";
import { firebaseConfig } from "../config";
import React from "react";
import imgStyling from "./imageGrid.module.css"
const isBrowser = typeof window != "undefined";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

if (isBrowser) {
  
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
      <div key={"outerDiv"+idx.toString()} style={{display:"inline"}}>
          <img key={idx} src={elem} style={{width:32 + "vw", height:33+"vw"}} id={"mainImg"+idx.toString()} className={imgStyling.myImg} onClick={
            function()
            {
              var modal = document.getElementById("myModal"+idx);
              var captionText = document.getElementById("caption"+idx);
              var modalImg = document.getElementById("imgNr"+idx);
              var mainImg = document.getElementById("mainImg"+idx);
              modal.style.display = "block";
              modalImg.src = mainImg.src;
            }
          }/>
          <div id={"myModal"+idx.toString()} className={imgStyling.modal}>
            <span className={imgStyling.close} onClick={
              function()
              {
                var modal = document.getElementById("myModal"+idx);
                modal.style.display = "none";
              }
            }>x</span>
            <img id={"imgNr"+idx.toString()} className={imgStyling.modalContent}/>
          </div>
      </div>
    ));
    return <div>{imageTags}</div>;
  }
}

export default ImageGrid;
