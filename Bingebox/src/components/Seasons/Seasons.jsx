import React, { useEffect, useState } from 'react'
import "./Seasons.css"
import { Link, useParams } from 'react-router-dom';
const  Seasons = ({style}) => {

  const { id } = useParams();
  const { season } = useParams();
  const [apiData, setApiData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTQ0NjYwMjM4ODFjYWJjMDY1Mjg2OTlhOTdjMDFmZCIsIm5iZiI6MTcxOTQ2OTAyMS4xNDM4NjUsInN1YiI6IjY2NzMxZTk0ZTUzYTE1YTY0MDE2YTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bUN2LMZvTy1x1X8Usv42M2FSlomLZM3XxCmYuhweuqo'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!apiData) return <p>No data available</p>;
 



  return (
    
    <div className="seasons" style={style}>
    <h3>Seasons</h3>
    <div className="seasonDiv">
      {apiData.seasons &&
        apiData.seasons.filter((card, index) => index !== 0 && card.season_number !== 0).map((card, index) => (
          <Link className="car" key={index} to={`/SeriesPlayer/${apiData.id}/${card.season_number}/1`} >
            {card.poster_path && (
              <>
                <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} alt={`Season ${card.season_number}`} />
                <p>Season {card.season_number} (⭐️ {card.vote_average})</p>
              </>
            )}
          </Link>
          
        ))}
    </div>
  </div>

  )
}

export default Seasons
