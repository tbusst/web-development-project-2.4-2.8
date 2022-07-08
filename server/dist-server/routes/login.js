"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _app = require("firebase/app");

var _auth = require("firebase/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

require('dotenv').config();

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURMENT_ID
};
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)();
/* GET home page. */

router.post('/', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var mode = req.body.mode;
  console.log(req.body);

  switch (mode) {
    case 'signup':
      (0, _auth.createUserWithEmailAndPassword)(auth, email, password).then(function (userCredentials) {
        var user = userCredentials.user;
        res.send(user);
      })["catch"](function (error) {
        var errorMessage = error.message;
        res.status(401).send(errorMessage);
      });
      break;

    case 'signin':
      (0, _auth.signInWithEmailAndPassword)(auth, email, password).then(function (userCredentials) {
        var user = userCredentials.user;
        res.send(user);
      })["catch"](function (error) {
        var errorMessage = error.message;
        res.status(401).send(errorMessage);
      });
      break;

    default:
      break;
  }
});
var _default = router;
exports["default"] = _default;