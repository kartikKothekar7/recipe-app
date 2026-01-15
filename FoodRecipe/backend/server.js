const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const connectDb=require("./config/connectionDb")  // we require connection functionality here and then call the connectDb() as server.js is running
const cors=require('cors') //This line imports the CORS middleware so your backend can handle requests coming from a different origin.

const PORT=process.env.PORT || 3000;
connectDb(); 

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,(err)=>{
    console.log(`app is running on port ${PORT}`)
})