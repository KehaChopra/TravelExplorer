import express from "express";
import cors from "cors";
//allows reuqets from other origins react app runs on diff port so without it it will get blcoked
import dotenv from"dotenv"; //used to read .env 
import countryRoutes from "./routes/country.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json()); //converts json to javascript object

app.use("/api/country",countryRoutes);
app.get("/",(req,res)=>{
    res.send("travel explorer backend running");
});
const port=process.env.port||5000;
//added fallback in case .env fails
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});