"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var posts = require('../data/data');
/* GET home page. */


router.get('/', function (req, res, next) {
  res.send(posts.data());
});
var _default = router;
exports["default"] = _default;