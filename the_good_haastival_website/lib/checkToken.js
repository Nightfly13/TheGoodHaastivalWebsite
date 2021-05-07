var AES = require("crypto-js/aes");
var Utf8 = require("crypto-js").enc.Utf8;

function checkIfTokenIsValid() {
    var cookie = document.cookie;
    if (cookie.length > 0) {
      console.log("found cookie");
      var token = cookie.match(/token=([^;\s]+)/)[1];
      console.log("cookie = " + token);
      var decrypted = AES.decrypt(token, process.env.AES_KEY).toString(Utf8);
      console.log("decrypted number is: " + decrypted);
      return decrypted % 17 == 0      
    } else {
      console.log("no cookie");
      return false;
    } 
  };

  export default checkIfTokenIsValid