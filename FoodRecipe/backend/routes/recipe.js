const express=require('express');
const { getRecipes ,getRecipe,addRecipe,editRecipe,deleteRecipe,upload} = require('../controller/recipe');
const verifyToken = require('../middleware/auth');
const router=express.Router();


router.get('/',getRecipes); // Get all the recipes
router.get('/:id',getRecipe); //get recipe with id
router.post('/',upload.single('file'), verifyToken,addRecipe); // this will add recipe
router.put('/:id',upload.single('file'),editRecipe); //this route will edit the recipe
router.delete('/:id',deleteRecipe) // this will delete the recipe

module.exports=router;