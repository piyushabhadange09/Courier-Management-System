var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
const { route } = require("./frontRoute");



router.get("/",(req,res)=>{
    res.render("login");
})



module.exports = router;
