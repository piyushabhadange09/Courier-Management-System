var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
const {Pool}=require("pg");
const bcrypt = require("bcryptjs/dist/bcrypt");



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



router.get("/:user_id",async(req,res)=>{
    const userId=req.params.user_id;

    try{
        const Query='SELECT * FROM users WHERE  USER_ID =$1';
        const values=[userId];

        const result=await pool.query(Query,values);

        if(result.rows.length==0){
            return res.status(404).send("User not found.");
        }

        const user=result.rows[0];

         res.render("Account",{user});
    }catch(error){
        console.error("Error fetching user details: ", error.message);
        res.status(500).send("Internal Server Error");
    }
})

//GET METHOD OF UPDATE DETAILS
router.get("/update-details/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;

    try{
        const query=`SELECT * FROM users WHERE user_id =$1`;

        const values=[user_id];

         const result=await pool.query(query,values);

         if(result.rows.length===0){
            return res.status(404).send("User not found");
         }

         const user=result.rows[0];

         res.render("updateUserDetails",{user});
    }catch(error){
        console.error("Error fetching user details: ", error.message);
    }
})

//GET METHOD FOR DELETING THE ACCOUNT
router.get("/delete-account/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;

    try{
        const query=`SELECT * FROM users WHERE user_id=$1`;
        const values=[user_id];

        const result=await pool.query(query,values);

        if(result.rows.length==0){
            return res.status(400).send("User does not found");
        }

        const user=result.rows[0];
        res.render("deleteAccount",{user});
    }catch(error){
        console.error("Error in fetching the deatils",error.message);
    }
})
//GET METHOD IF CHANGE PASSWORD
router.get("/change-password/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;

    try{
        const query=`SELECT * FROM users WHERE user_id=$1`;

        const values=[user_id];

        const result=await pool.query(query,values);

        if(result.rows.length==0){
            return res.status(400).send("User does not found");
        }

        const user=result.rows[0];

        res.render("changePassword",{user});
    }catch(error){
        console.error("Error fetching user details.",error.message);
    }
})

//POST METHOD OF UPDATE DEATILS
router.post("/update-details/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;

    const {username,email_id,city,phone_no}=req.body;

    try{
        const query=`UPDATE users SET username=$1 , email_id=$2 , city=$3 , phone_no =$4 WHERE user_id =$5`;

        const values=[username,email_id,city,phone_no,user_id];

        await pool.query(query,values);
        res.redirect(`/userAccount/${user_id}`);
    }catch(error){
        console.log("Error upating the user deatils",error.message);
        res.status(500).send("Internal Server Error");
    }
})


//POST METHOD OF CHANGE PASSWORD
router.post("/change-password/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;
    const current_password=req.body.current_password;
    const new_password=req.body.new_password;
    const confirm_password=req.body.confirm_password;

    if(new_password!== confirm_password){
        req.send("Password desnot match");
    }

    try{
        const Query='SELECT * FROM  users WHERE user_id = $1';
        const values=[user_id];
        
        const result=await pool.query(Query,values);

        if(result.rows.length==0){
            return res.status(400).send("Users not found");
        }

        const user=result.rows[0];

        const isMatch=await bcrypt.compare(current_password,user.user_password);

        if(!isMatch){
            return res.status(400).send("Current password is incorrect.");
        }

        const hashedPassword= await bcrypt.hash(new_password,10);
        const updatedQuery='UPDATE users SET user_password=$1 WHERE user_id=$2';
        const updateValues=[hashedPassword,user_id];

         await pool.query(updatedQuery,updateValues);

         return res.send("Password changes successfully!!");
    }catch(error){
        console.error("Error changing password: ", error.message);
    }
})

//POST REQUEST FOR DELETING THE FORM


router.post('/delete-account/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const { password, confirmDelete } = req.body;

    // Check if user confirmed account deletion
    if (!confirmDelete) {
        return res.status(400).send("You must confirm that you want to delete the account.");
    }

    try {
        // Fetch user details from database
        const query = `SELECT * FROM users WHERE user_id = $1`;
        const value = [user_id];

        const result = await pool.query(query, value);

        // Check if the user exists
        if (result.rows.length === 0) {
            return res.status(404).send("User not found.");
        }

        const user = result.rows[0];

        // Compare entered password with the hashed password
        const hashedPassword = user.user_password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        // If password is invalid, send error response
        if (!isPasswordValid) {
            return res.status(400).send("Incorrect password.");
        }

        // Delete user from database
        const deleteQuery = 'DELETE FROM users WHERE user_id = $1';
        const deleteValues = [user_id];
        await pool.query(deleteQuery, deleteValues);

        // Send success message
        res.render("userLogin");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
});



module.exports = router;
