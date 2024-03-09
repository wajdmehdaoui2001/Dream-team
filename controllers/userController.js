const asyncHandler =require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require('bcrypt');
const jwt =require("jsonwebtoken");

const registerUser=asyncHandler(async (req,res)=>{
    console.log(req.body);
    const{name,email,password}=req.body;
    if(!email || !password || !name){
        res.status(400);
        throw new Error("champs obligatoires !");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("Utilisateur existe déjà !");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed password:" , hashedPassword);
    const user=await User.create(
      { name,
         email,
        password: hashedPassword 
    }
    );
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id: user.id,name:user.name,email:user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }
    res.json({message: "Register the user"});


});
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password}=req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(user  &&  (await bcrypt.compare(password,user.password))) {
       const accessToken=jwt.sign({
        user:{
            email:user.email,
            id:user.id

        },
       },process.env.ACCESS_TOKEN_SECRET,
       {expiresIn:"1m"}
       );
        res.status(200).json({accessToken,name:user.name});
    } else {
        res.status(401)
        throw new Error ("email or password is not valid");
    }
    
});
const currentUser=asyncHandler(async (req,res)=>{
    res.json({ message:"Current user information"});

})
module.exports={registerUser , loginUser, currentUser};