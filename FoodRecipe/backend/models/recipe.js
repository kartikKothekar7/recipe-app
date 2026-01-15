// in this file we will create a schema of the recipe
const mongoose=require('mongoose')



// schema of any dish which contain name , instruction ,ingreidirnt , time and image photo
const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    time:{
        type:String,
    },
    coverImage:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true}) // timestamps will add two extra field called createdAt and updatedAt

// mongoose has function called model which create table called Recipes
module.exports=mongoose.model('Recipes',recipeSchema);