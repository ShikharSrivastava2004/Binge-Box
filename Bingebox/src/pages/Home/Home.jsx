import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import movie from '../../assets/cards/movie.jpg';
import hero_title from "../../assets/hero_title.png"
import play from"../../assets/play_icon.png"
import info from"../../assets/info_icon.png"
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SeriesCards from '../../components/SeriesCards/SeriesCards';

const Home = () => {

  const {id} = useParams();
  const[apiData,setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTQ0NjYwMjM4ODFjYWJjMDY1Mjg2OTlhOTdjMDFmZCIsInN1YiI6IjY2NzMxZTk0ZTUzYTE1YTY0MDE2YTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dam4Gz52W5AH59YVWjBFWRodSns1HYW_9O3rQTeINpo'
    }
  };
  

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  },[])

  
  







  return (
    <div className='home'>
      <Navbar/>

      <div className="hero">
       
        <img src={movie}  className='banner_image'/>
        
        
        <div className="hero-caption">
          <h1>Godzilla x Kong: The New Empire</h1>
          <p>Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.</p>
          <div className="hero-btns">
            <Link to={`/player/${823464}`} >
            <button className='btn'><img src={play}  />Play</button>
            </Link>
            <a href="https://www.imdb.com/" target='_blank'>
            <button className='btn dark-btn'><img src={info}/>More Info</button>
            </a>
          </div>
          <TitleCards/>
        </div>
      </div>

      <div className="more-cards">
      <SeriesCards/>
      <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
      <TitleCards title={"Only on Netflix"} category={"popular"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"}/>
      <TitleCards title={"Top Picks for you"} category={"now_playing"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
