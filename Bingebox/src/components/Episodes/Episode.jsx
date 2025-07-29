import React, { useEffect, useState } from "react";
import "./Episode.css";
import Navbar from "../Navbar/Navbar";
import epicon from "../../assets/epicon.svg"
import { Link, useNavigate, useParams } from "react-router-dom";

const Episode = ({style}) => {
    
const {id,season} = useParams();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTQ0NjYwMjM4ODFjYWJjMDY1Mjg2OTlhOTdjMDFmZCIsIm5iZiI6MTcxOTQ2OTAyMS4xNDM4NjUsInN1YiI6IjY2NzMxZTk0ZTUzYTE1YTY0MDE2YTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bUN2LMZvTy1x1X8Usv42M2FSlomLZM3XxCmYuhweuqo'
    }
  };
  
 


    const [apiData, setApiData] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const [title, setTitle] = useState(null);
    const [playingEpisode, setPlayingEpisode] = useState(1);

    const handlePlay = (episodeNumber) => {
      setPlayingEpisode(episodeNumber);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`, options)
          const data = await response.json();
          setApiData(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options);
          const d = await res.json();
          setTitle(d);
        } catch (err) {
          setError(err);
        } 
      };
  
      fetchData();
    }, []);

    // console.log(title.name)
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!apiData) return <p>No data available</p>;
    console.log(apiData)



  return (
    <div className="Episode" style={style}>

      <div className="episode">
        <button className="title">
          <h1>{title && title.original_name}</h1>
          
        </button>

        {apiData.episodes && apiData.episodes.map((card,index) =>(
          <Link className="epi" to={`/SeriesPlayer/${id}/${season}/${card.episode_number}`} onClick={() => handlePlay(card.episode_number)} key={index}>
             <button className="btns ">
             <p>{card.episode_number}. {card.name}</p>
             {playingEpisode === card.episode_number && <img src={epicon} alt="▶️" />}
           </button>

          </Link>
             
           
   
        ))}

       
        

      </div>

    </div>
  );
};

export default Episode;
