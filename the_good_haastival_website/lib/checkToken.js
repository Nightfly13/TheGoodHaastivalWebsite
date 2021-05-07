var AES = require("crypto-js/aes");
var Utf8 = require("crypto-js").enc.Utf8;

function checkIfTokenIsValid() {
    var cookie = document.cookie;
    if (cookie.length > 0) {
      var token = cookie.match(/token=([^;\s]+)/)[1];
      var decrypted = AES.decrypt(token, process.env.AES_KEY).toString(Utf8);
      return decrypted % 17 == 0      
    } else {
      return false;
    } 
  };

  export default checkIfTokenIsValid