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

router.get("/",(req,res)=>{
    res.render("orgRegsister");
})
router.post("/",async(req,res)=>{
    const{
        org_name,
        org_email,
        org_contact,
        org_headOffice,
        org_password,
        org_pincode,
        org_manager_name,
        manager_email,
        manager_contact
    }=req.body;
    try{
        const checkEmailQuery='SELECT * FROM  organizations  WHERE org_email=$1';
        const checkEmailValues=[org_email];

        const checkEmailResult=await pool.query(checkEmailQuery,checkEmailValues);

        if(checkEmailResult.rows.length > 0){
            return res.status(400).send("THis email is already regsitered by another organization");
        }

        const hashedPassword=await bcrypt.hash(org_password,10);

        const insertQuery=`
            INSERT INTO  organizations 
            (org_name, org_email, org_contact, org_headOffice, org_password, org_pincode, org_manager_name, manager_email, manager_contact)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING org_id`;

        const insertValues=[org_name, org_email, org_contact, org_headOffice, hashedPassword, org_pincode, org_manager_name, manager_email, manager_contact];

        const result=await pool.query(insertQuery,insertValues);

        res.redirect("orgLogin");
    }catch(error){
        console.log(error);
        res.status(500).send("An error occurred during registration");;
    }
})


module.exports = router;
