import express from "express";
import bcrypt from "bcrypt";
import {users} from "../data/users.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken.js";
const router=express.Router();
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you are authenticated!` });
});

router.post("/signup",async(req,res)=>{
  console.log(req.body)

    const {email,password}=req.body;
      if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const existingUser=users.find((u)=>u.email===email);
  if(existingUser){
    return res.status(409).json({error:"user already exists"});
  }
  const hashedPassword=await bcrypt.hash(password,10);
//e 10 is the "salt rounds" — how much computational work goes into hashing. Higher = more secure but slower. 10 is a standard, sensible default.
  const newUser={
    id:users.length+1,
    email,
    password:hashedPassword,
  };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully" });
});
router.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = users.find((u) => u.email === email);
  if(!user){
    return res.status(401).json({error:"Invalid email or password"});
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(401).json({error:"Invalid email or password"});
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email }, // payload
    process.env.JWT_SECRET,                  // secret key
    { expiresIn: "1h" }                       // token expires in 1 hour
  );
  res.json({ message: "Login successful", token });
});
export default router;