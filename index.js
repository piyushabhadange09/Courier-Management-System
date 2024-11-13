const express=require("express");
const path=require("path");
const http=require("http");
const bodyParser=require("body-parser");

const app=express();
const port=3000 || process.env.port;
const server=http.createServer(app);

//routes
var frontRoute=require("./routes/frontRoute");
var aboutRoute=require("./routes/aboutRoute");
var serviceRoute=require("./routes/serviceRouter");
var userRegsister=require("./routes/userRegsister");
var orgRegsister=require("./routes/orgRegsister");
var userLogin=require("./routes/userLogin");
var orgLogin=require("./routes/orgLogin");
var login=require("./routes/login");
var regsister=require("./routes/regsister");


var userAccount=require("./routes/userAccount");
var orderDetails=require("./routes/order_details");
var orderParcel=require("./routes/order_parcel");
var complaints=require("./routes/complaints");
var deliveryPartner=require("./routes/deliveryPartner");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/frontRoute",frontRoute);
app.use("/aboutRoute",aboutRoute);
app.use("/serviceRoute",serviceRoute);
app.use("/userRegsister",userRegsister);
app.use("/orgRegsister",orgRegsister);
app.use("/userLogin",userLogin);
app.use("/orgLogin",orgLogin);
app.use("/login",login);
app.use("/regsister",regsister);

app.use("/userAccount",userAccount);
app.use("/orderDetails",orderDetails);
app.use("/orderParcel",orderParcel);
app.use("/complaints",complaints);
app.use("/deliveryPartner",deliveryPartner);

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})