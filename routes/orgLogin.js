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

router.use(bodyParser.urlencoded({extended:true}));
pool.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to database');
    }
});
router.get("/",(req,res)=>{
    res.render("orgLogin");
})

router.post("/",async(req,res)=>{
    const {org_name,org_email,org_password}=req.body;

    try{
        const query='SELECT * FROM organizations WHERE org_email = $1';
        const values=[org_email];

        const result=await pool.query(query,values);

        if(result.rows.length==0){
            return res.status(400).send("Organization not found. Please check your email or register.");
        }

        const organization=result.rows[0];

        if(organization.org_name!=org_name){
            return res.status(400).send("Incorrect organization name.");
        }

        const isPasswordVaild=await bcrypt.compare(org_password,organization.org_password);

        res.render("org_dashborad",{organization});
    }catch(error){
        console.log(error);
        res.status(500).send("An error occurred while logging in");
    }
})

router.get("/sendParcel",(req,res)=>{
    res.render("sendparcel");
})

router.post("/sendParcel",async(req,res)=>{
    const { 
        userId, 
        username, 
        orgName, 
        parcelId, 
        parcelQty, 
        parcelCost, 
        parcelDescription, 
        warehouseId, 
        deliveryStaff, 
        orderDate 
    } = req.body;

    const query = `
    INSERT INTO parcels (user_id, username, org_name, parcel_id, parcel_qty, parcel_cost, parcel_description, warehouse_id, delivery_staff, order_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

    try {
        await pool.query(query, [userId, username, orgName, parcelId, parcelQty, parcelCost, parcelDescription, warehouseId, deliveryStaff, orderDate]);
        res.send('Parcel submitted successfully!');
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error submitting parcel');
    }
})



router.get("/deliveryStaff",(req,res)=>{
    res.render("delivery_staff")
})


router.post('/deliveryStaff', async (req, res) => {
    const { orgName, staffId, staffName, staffCity, staffContact, staffEmail } = req.body;
    
    const query = `
        INSERT INTO delivery_staff (org_name, staff_id, staff_name, staff_city, staff_contact, staff_email)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    
    try {
        await pool.query(query, [orgName, staffId, staffName, staffCity, staffContact, staffEmail]);
        res.send('Staff registered successfully!');
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error registering staff');
    }
});

router.get("/branches",(req,res)=>{
    res.render("branches");
})

router.post("/branches",async(req,res)=>{
    const { orgName, branchId, branchCity, branchState, branchEmail, branchContact } = req.body;

    const query = `
    INSERT INTO branches (org_name, branch_id, branch_city, branch_state, branch_email, branch_contact)
    VALUES ($1, $2, $3, $4, $5, $6)`;

    try {
        await pool.query(query, [orgName, branchId, branchCity, branchState, branchEmail, branchContact]);
        res.send('Branch added successfully!');
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error adding branch');
    }
})

router.get("/services",(req,res)=>{
    res.render("orgServices");
})
router.post("/services",async(req,res)=>{
    const { orgName, serviceId, serviceName } = req.body;

    const query = `
        INSERT INTO services (org_name, service_id, service_name)
        VALUES ($1, $2, $3)
    `;

    try {
        await pool.query(query, [orgName, serviceId, serviceName]);
        res.send('Service added successfully!');
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error adding service');
    }
})


router.get("/warehouse",(req,res)=>{
    res.render("warehouses");
})
router.post("/warehouse",async(req,res)=>{
    const { orgName, warehouseId, capacity, state, city } = req.body;

    const query = `
        INSERT INTO warehouses (org_name, warehouse_id, capacity, state, city)
        VALUES ($1, $2, $3, $4, $5)
    `;

    try {
        await pool.query(query, [orgName, warehouseId, capacity, state, city]);
        res.send('Warehouse added successfully!');
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error adding warehouse');
    }
})

router.get("/logout",async(req,res)=>{
    res.render("orgLogin");
});

router.get("/ViewAllStaff",async(req,res)=>{
    const query = `
    SELECT org_name, staff_id, staff_name, staff_city, staff_contact, staff_email
    FROM delivery_staff`;
    try {
        const result = await pool.query(query);
        res.render('viewAllStaff', { staffList: result.rows });
    } catch (error) {
        console.error('Error fetching staff list', error.stack);
        res.status(500).send('Error fetching staff list');
    }
});

router.get("/viewWarehouses", async (req, res) => {
    const query = `SELECT * FROM warehouses`;

    try {
        const result = await pool.query(query);
        const warehouses = result.rows; 
        res.render("viewWarehouses", { warehouses }); 
    } catch (error) {
        console.error('Error retrieving warehouses:', error);
        res.status(500).send('Error retrieving warehouses');
    }
});
router.get("/viewServices", async (req, res) => {
    const query = `SELECT * FROM services`;

    try {
        const result = await pool.query(query);
        const services = result.rows; 
        res.render("viewServices", { services }); 
    } catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).send('Error retrieving services');
    }
});
router.get("/viewBranches", async (req, res) => {
    const query = `SELECT * FROM branches`;

    try {
        const result = await pool.query(query);
        const branches = result.rows; 
        res.render("viewBranches", { branches }); 
    } catch (error) {
        console.error('Error retrieving branches:', error);
        res.status(500).send('Error retrieving branches');
    }
});
router.get("/ViewSendParcel", async (req, res) => {
    const query = `SELECT * FROM parcels`;

    try {
        const result = await pool.query(query);
        const parcels = result.rows; // Assuming PostgreSQL is being used
        res.render("viewSendParcel", { parcels });
    } catch (error) {
        console.error("Error retrieving parcel history:", error);
        res.status(500).send("Error retrieving parcel history");
    }
});
module.exports = router;
