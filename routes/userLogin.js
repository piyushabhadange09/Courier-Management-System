var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
const {Pool}=require("pg");
const bcrypt = require("bcryptjs/dist/bcrypt");
var jwt=require("jsonwebtoken");

const pool=new Pool({
    user: "postgres",
    host: "localhost",
    database: "NEW_CMS",
    password: "15Vijya2003@",
    port: 5432,
})

pool.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to database');
    }
});

router.use(bodyParser.urlencoded({extended:true}));

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function checkLogin(req,res,next){
    var mytoken=localStorage.getItem('mytoken');
    try {
      //it will verify mytoken that we have created when we are go to login page
      jwt.verify(mytoken, 'loginToken');
    } catch(err) {
      res.send("You need to login to access courier parcel management");
    }
    //if login verify then it will pass to next method and display Employee record if its verify.
    next();
}
  

router.get("/",(req,res)=>{
    res.render("userLogin");
})
router.get("/",function(req,res,next){
    res.render("userLogin");
})
router.post("/",async(req,res)=>{
    const username=req.body.username;
    const email_id=req.body.email_id;
    const password=req.body.password;

    try{
        const query='SELECT * FROM users WHERE username=$1 AND email_id=$2';

        const values=[username,email_id];

        const result=await pool.query(query,values);
        
        if(result.rows.length==0){
            return res.status(400).send("Invalid username or email.");
        }

        const user=result.rows[0];

        const isMatch =await bcrypt.compare(password,user.user_password);

        if(!isMatch){
            return res.status(400).send("Invalid username or password.");
        }

        

        //jwt for creating login token
        var token = jwt.sign({ foo: 'bar' }, 'loginToken');
        localStorage.setItem('mytoken', token);

        res.render("userdashborad",{user});
    }catch(error){
        console.error("Error during login: ", error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get("/logout", function (req, res, next){
    //this will remove mytoken form local Storage.
    localStorage.removeItem('mytoken');
    // res.send("Logout Successfully.");
    res.render("userLogin");
  });
  


module.exports = router;
