import express from "express";
import cors from "cors";
//allows reuqets from other origins react app runs on diff port so without it it will get blcoked
import dotenv from"dotenv"; //used to read .env 
import countryRoutes from "./routes/country.js";
import weatherRoutes from "./routes/weather.js";
import authRoutes from "./routes/auth.js";
const app=express();
app.use(express.json());
app.use("/api/auth", authRoutes);
console.log("weatherRoutes is:", weatherRoutes);
dotenv.config();

app.use(cors());
 //converts json to javascript object

app.use("/api/country",countryRoutes);
app.use("/api/weather", weatherRoutes);

app.get("/",(req,res)=>{
    res.send("travel explorer backend running");
});
const port=process.env.port||5000;
//added fallback in case .env fails
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});