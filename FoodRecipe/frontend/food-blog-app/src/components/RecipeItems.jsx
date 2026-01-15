import React, { useEffect, useState } from 'react'
import { Link, useLoaderData ,useNavigate} from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
// import foodImg from '../assets/dosa.jpg'
import { BsFillStopwatchFill } from "react-icons/bs"; // for watch icon
import { FaRegHeart } from "react-icons/fa"; //for like icon
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
// import recipe from '../../../../backend/models/recipe';

export default function RecipeItems() {
    const recipes=useLoaderData() // this will load all the data from loader in home.jsx
    const [allRecipes, setAllRecipes] = useState()
    let path=window.location.pathname==="/myRecipe" ? true:false
    let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe] = useState(false)
    const navigate=useNavigate()
    console.log(allRecipes)

    useEffect(()=>{
      setAllRecipes(recipes)
    },[recipes])

    const onDelete=async (id)=>{
      await axios.delete(`http://localhost:5000/recipe/${id}`)
      .then((res)=>console.log(res))
      setAllRecipes(recipes=>recipes.filter(recipe=>recipe._id !==id))
      let filterItem=favItems.filter(recipe=>recipe._id!==id)
      localStorage.setItem("fav",JSON.stringify(filterItem))
    }

    const favRecipe=(item)=>{
      let filterItem=favItems.filter(recipe=>recipe._id!==item._id)
      favItems=favItems.filter(recipe=>recipe._id ===item._id).length===0 ? [...favItems,item] : filterItem
      localStorage.setItem("fav",JSON.stringify(favItems))
      setIsFavRecipe(pre=>!pre)
    }
  return (
    <>
      <div className="card-container">
        {
          allRecipes?.map((item,index)=>{
            return(
              <div key={index} className='card' onDoubleClick={()=>navigate(`/recipe/${item._id}`)}> 
                  <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img>
                  <div className="card-body">
                      <div className="title">{item.title}</div>
                      <div className="icons">
                        <div className="timer"> 
                          <BsFillStopwatchFill /> {item.time}
                        </div>
                        {(!path) ? <FaHeart  onClick={()=>favRecipe(item)}
                          style={{color:(favItems.some(res=>res._id===item._id)) ? "red" : ""}}/> :
                        <div className="action">
                          <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                          <AiOutlineDelete onClick={()=>onDelete(item._id)} className='deleteIcon'/>
                        </div>
                        }
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
