var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
const {Pool}=require("pg");
const bcrypt = require('bcryptjs');

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

router.get("/",(req,res)=>{
    res.render("userRegsister");
})


router.post("/", async (req, res) => {
    const { username, password, email_id, city, phone_number } = req.body;

    const confirmPassword = req.body['confirm_password'];
    if (password !== confirmPassword) {
        return res.status(400).send("Confirm Password does not match the Password.");
    }
    
    try {
        // Check if username or email already exists
        const checkUserQuery = 'SELECT * FROM users WHERE username = $1 OR email_id = $2'; 
        const checkUsersValues = [username, email_id];

        const result = await pool.query(checkUserQuery, checkUsersValues);

        if (result.rows.length > 0) {
            return res.status(400).send("Username or Email is already registered! Try with another email.");
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const insertUserQuery = `INSERT INTO users (username, user_password, email_id, city, phone_no) VALUES ($1, $2, $3, $4, $5)`;
        const insertUserValues = [username, hashedPassword, email_id, city, phone_number];

        await pool.query(insertUserQuery, insertUserValues);

        //res.send("User registered successfully!");
        res.render("userLogin");

    } catch (error) { // Catching the error and logging it
        console.error("Error in registration of Users: ", error.message);
        res.status(500).send("Internal Server Error");
    }
});







module.exports = router;
