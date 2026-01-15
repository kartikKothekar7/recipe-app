import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'  // use for to call api
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

const getAllRecipes=async()=>{
  let allRecipes=[]  // it will store all recipe in array
  await axios.get('http://localhost:5000/recipe') // it will get all the recipes
  .then(res=>{
    allRecipes=res.data  // response will be stored in allrecipes
  })

  return allRecipes
}

const getMyRecipes =async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getRecipe = async ({ params }) => {
  const res = await axios.get(`http://localhost:5000/recipe/${params.id}`)
  return res.data
}

const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[

    {path:"/",element:<Home/>,loader:getAllRecipes},
    {path:"/myRecipe",element:<Home/>,loader:getMyRecipes},
    {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
    {path:"/addRecipe",element:<AddFoodRecipe/>},
    {path:"/editRecipe/:id",element:<EditRecipe/>},
    {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe}
  ]}
])

export default function App() {
  
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
