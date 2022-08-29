//import dependancies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/api-routes.js";
import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();

const app = express ();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(function (req, res, next) {
//Enabling CORS
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

app.use(cors());
app.options('*', cors())


const connectionUrl = process.env.CONNECTION_URL; 
const PORT = process.env.PORT || 5000;

mongoose.connect(connectionUrl, { useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));

app.use("/",routes);


