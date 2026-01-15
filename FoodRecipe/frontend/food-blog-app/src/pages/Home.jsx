import React, { useState } from 'react'
import foodRecipe from '../assets/dosa.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'


export default function Home() {

    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token)
        {
            navigate("/addRecipe")
        }
        else{
            setIsOpen(true)
        }
    }
  return (
    <>  
        <section className='home'>
            <div className="left">
                <h1>Food Recipe</h1>
                <h5>A curious cat quietly watched floating clouds while old clocks whispered forgotten stories beneath glowing streetlights during a calm midnight walk.</h5>
                <button onClick={addRecipe}>Share Your Recipe</button>
            </div>
            <div className="right">
                <img src={foodRecipe} width="320px" height="300px"></img>
            </div>
        </section>
        <div className="bg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L34.3,48C68.6,64,137,96,206,90.7C274.3,85,343,43,411,58.7C480,75,549,149,617,181.3C685.7,213,754,203,823,192C891.4,181,960,171,1029,149.3C1097.1,128,1166,96,1234,85.3C1302.9,75,1371,85,1406,90.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </div>
        {(isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
        <div className="recipe">
            <RecipeItems/>
        </div>
    </>
  )
}
