import React, { useEffect, useState } from 'react'
import "./Player.css"
import barrow from "../../assets/barrow.png"
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  





  return (
    <div className='player'>
      <img src ={barrow} alt="" onClick={() =>{navigate(-1)}}/>
    
    <iframe width='90%' height='90%' src={`https://vidsrc.pro/embed/movie/${id}`}
    frameborder="0" title='trailer' allowFullScreen></iframe>

    
    
    </div>
  )
}

export default Player

//1022789
