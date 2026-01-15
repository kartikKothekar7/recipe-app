const User=require('../models/user'); // User will store schema of user
const bcrypt=require('bcrypt') // require it to use functionality of hashing
const jwt=require('jsonwebtoken') // require it to generate token


const userSignUp =async (req,res)=>{ 
    const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(400).json({message:"email or password can't be empty"})
    }

    let user=await User.findOne({email})

    //if user already exits
    if(user)
    {
        return res.status(400).json({error:"Email is already present"})
    }

    //if user is new then we have to save password in hashed form so we need to download npm i bcrypt
    // and for authentication we need token so we need npm i jwt jsonweb token

    const hashPwd=await bcrypt.hash(password,10) // this will create hash password and 10 is number of time salting.
    const newUser=await User.create({ //this will create a newUser using User schema
        email,password:hashPwd
    })

    //now we have generate token ,token contain 3 parts ,header ,playload signature
    //so payload contain info we give email and id as payload
    let token=jwt.sign({email,id:newUser.id},process.env.SECRET_KEY)

    return res.status(200).json({token,user:newUser})

}

const userLogin =async (req,res)=>{
    const {email,password}=req.body;
    
    //if email or password is not correct
    if(!email || !password)
    {
        return res.status(400).json({message:"email or password can't be empty"})
    }

    //if user exist
    let user=await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password))
    {
        let token=jwt.sign({email,id:user.id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else
    {
        return res.status(400).json({error:"Invalid Email or Password"})
    }

}

const getUser =async (req,res)=>{
    const user=await User.findById(req.params.id)
    
    res.json({email:user.email})
}

module.exports={userSignUp,userLogin,getUser}