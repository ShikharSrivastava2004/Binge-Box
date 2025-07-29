import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import barrow from "../../assets/barrow.png"
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./SeriesPlayer.css";
import Episodes from "../../components/Episodes/Episode"
import Seasons from "../../components/Seasons/Seasons"

const SeriesPlayer = () => {
  const {id,season,episode} = useParams();
  const navigate = useNavigate();

  const navbarStyle = {
    width: '80%',
    margin: '0 auto'  // Center the navbar
  };
  const epistyle = {
    width: '100%',
    margin: '0 auto'  // Center the episodes
  };

  return (
    <div className='SeriesPlayer'>
      <div className="splayer">
        <div className="navb">
          <img src={barrow} alt="" onClick={() => navigate(`/series/${id}`)} className='prev'/>
          <Navbar style={navbarStyle}/>
        </div>
        
        <div className="epandpl">
          <iframe width='100%' src={`https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`}
            frameborder="0" title='trailer' allowFullScreen></iframe>
          <Episodes style={epistyle}/>
        </div>
      </div>
    </div>
  )
}

export default SeriesPlayer;
