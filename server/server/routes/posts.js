import express from 'express';
var router = express.Router();
const posts = require('../data/data');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Send the posts to the client
    res.send(posts.data());
});

export default router;
