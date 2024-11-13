var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");



router.get("/",(req,res)=>{
    res.render("order_parcel");
})



module.exports = router;
