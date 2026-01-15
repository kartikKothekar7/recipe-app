const mongoose=require("mongoose") // here we require the mongoose to connect db

//this will connect with foodRecipe database
const connectDb=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("Connected...."))
}

module.exports=connectDb;