const Recipes=require('../models/recipe')  // here we require the schema
const multer=require('multer')

//image part
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')  // path of image
  },
  filename: function (req, file, cb) {
    const filename= Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes=async (req,res)=>{  //this will response for all the recipes
    const recipes=await Recipes.find()
    return res.json(recipes)
}

const getRecipe=async (req,res)=>{  // this will give recipe by id
    const recipe=await Recipes.findById(req.params.id) //
    return res.json(recipe)
}

const addRecipe= async(req,res)=>{ // rhis will add the recipe
    const {title,ingredients,instructions,time}=req.body; // this will store data in variables
    
    if(!title || !ingredients || !instructions)
    {
        res.json({message:"Required field can not be empty."})
    }

    //this will store the field 
    const newRecipe= await Recipes.create({
        title,ingredients,instructions,time,
        coverImage:req.file.filename
        ,
        createdBy:req.user.id

    })

    //this will return nrew created recipe
    return res.json(newRecipe)
}

const editRecipe= async(req,res)=>{ // this will edit the recipe
    const {title,ingredients,instructions,time}=req.body;
    let recipe =await Recipes.findById(req.params.id)

    try{
        if(recipe)
        {
            let coverImage=req.file?.filename ? req.file?.filename :recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:"product is not present"})
    }
}

const deleteRecipe=async(req,res)=>{ // this will delete the recipe
    try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}  // with this line we export all the function to the .routes/recipes.js