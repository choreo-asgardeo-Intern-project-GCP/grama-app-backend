//import dependancies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/api_routes.js";
import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();

const app = express ();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


const connectionUrl = "mongodb+srv://odhithSen:bVGaMLuIj5n5SZ5w@cluster0.0p0tv.mongodb.net/?retryWrites=true&w=majority";
// const connectionUrl = process.env.CONNECTION_URL; 
const PORT = process.env.PORT || 5000;

mongoose.connect(connectionUrl, { useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));

app.use("/", routes);
