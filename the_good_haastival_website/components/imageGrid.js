import "firebase/storage";
import firebase from "firebase/app";
import React from "react";
import imgStyling from "./imageGrid.module.css";
const isBrowser = typeof window != "undefined";

console.log(process.env.NEXT_PUBLIC_STORAGEBUCKET);

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

if (isBrowser) {
}

class ImageGrid extends React.Component {
  state = {
    images: [],
  };

  handleDownload = (url, filename) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
      var blobURL =
        window.URL && window.URL.createObjectURL
          ? window.URL.createObjectURL(blob)
          : window.webkitURL.createObjectURL(blob);
      var tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
      tempLink.setAttribute("download", filename);

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === "undefined") {
        tempLink.setAttribute("target", "_blank");
      }

      document.body.appendChild(tempLink);
      tempLink.click();

      // Fixes "webkit blob resource error 1"
      setTimeout(function () {
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
      }, 200);
    };
    xhr.open("GET", url);
    xhr.send();
  };

  createUndoButton = (timeOutTimer) => {
    let currentButton = document.getElementById("undoButton");

    let button = document.createElement("button");
    button.id = "undoButton";
    button.style.position = "fixed";
    button.style.top = "20px";
    button.style.left = "35%";
    button.style.border = "none";
    button.style.backgroundColor = "yellow";
    button.style.color = "red";
    //button.style.opacity = "0.5";
    //button.style.right = "0"
    button.style.width = "30%";
    button.style.height = "30px";
    button.style.zIndex = "2";
    button.innerText = "Click to undo previous delete";

    button.onclick = () => {
      clearTimeout(timeOutTimer);
      let currentButton = document.getElementById("undoButton");
      if (currentButton.parentNode.contains(currentButton)) {
        button.parentNode.removeChild(currentButton);
      }
    };

    if (currentButton) {
      currentButton.replaceWith(button);
    } else {
      document.body.appendChild(button);
    }
  };

  moveFile = (url, destination) => {
    let imgFileName = url.match(/verify%2F(.+)\?alt/)[1];
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
      firebase.storage().ref().child(destination).child(imgFileName).put(blob);
      firebase.storage().refFromURL(url).delete();
    };
    xhr.open("GET", url);
    xhr.send();
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

    for (let i = 0; i < res.items.length; i++) {
      await res.items[i].getDownloadURL().then((url) => fireImages.push(url));
      this.setState({
        images: fireImages,
      });
    }
  };

  componentDidMount() {
    this.getImages();
  }

  showModal = (idx) => {
    var modal = document.getElementById("myModal" + idx);
    var modalImg = document.getElementById("imgNr" + idx);
    var mainImg = document.getElementById("mainImg" + idx);
    if (modal) {
      modal.style.display = "block";
      modalImg.src = mainImg.src;
    }
  };

  hideModal = (idx) => {
    var currentModal = document.getElementById("myModal" + idx);
    currentModal.style.display = "none";
  };

  render() {
    const imageTags = this.state.images.map((elem, idx) => (
      <div key={"outerDiv" + idx.toString()} style={{ display: "inline" }}>
        <img
          key={idx}
          src={elem}
          style={{ width: 32 + "vw", height: 33 + "vw" }}
          id={"mainImg" + idx.toString()}
          className={imgStyling.myImg}
          onClick={() => this.showModal(idx)}
        />
        <div id={"myModal" + idx.toString()} className={imgStyling.modal}>
          <span
            className={imgStyling.close}
            onClick={function () {
              var modal = document.getElementById("myModal" + idx);
              modal.style.display = "none";
            }}
          >
            x
          </span>
          <img
            id={"imgNr" + idx.toString()}
            className={imgStyling.modalContent}
          />
          <div className={imgStyling.buttonDiv}>
            <button
              className={`${imgStyling.button} ${imgStyling.leftButton}`}
              onClick={() => {
                var currentMainImg = document.getElementById("mainImg" + idx);

                this.hideModal(idx)


                let timeOut = setTimeout(() => {
                  currentMainImg.style.display = "none";
                  let currentButton = document.getElementById("undoButton");
                  if (currentButton) {
                    currentButton.parentNode.removeChild(currentButton);
                  }
                  firebase.storage().refFromURL(elem).delete();
                }, 3000);

                this.createUndoButton(timeOut);
                this.showModal(idx + 1);
              }}
            >
              Delete
            </button>
            <button
              className={`${imgStyling.button} ${imgStyling.rightButton}`}
              onClick={() => {
                this.handleDownload(elem, "haastivalImg" + idx + ".jpg");
                this.moveFile(elem, "verified-images");
                this.hideModal(idx)
                var currentMainImg = document.getElementById("mainImg" + idx);
                currentMainImg.style.display = "none";
                this.showModal(idx + 1);
              }}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    ));
    return <div>{imageTags}</div>;
  }
}

export default ImageGrid;
