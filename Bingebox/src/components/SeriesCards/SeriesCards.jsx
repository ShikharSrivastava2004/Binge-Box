import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./SeriesCards.css";
const SeriesCards = () => {

  

    const [apiData,setApiData] = useState([]);
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTQ0NjYwMjM4ODFjYWJjMDY1Mjg2OTlhOTdjMDFmZCIsIm5iZiI6MTcxOTQ2OTAyMS4xNDM4NjUsInN1YiI6IjY2NzMxZTk0ZTUzYTE1YTY0MDE2YTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bUN2LMZvTy1x1X8Usv42M2FSlomLZM3XxCmYuhweuqo'
      }
    };
  
    useEffect(()=>{
      fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
  
  },[])



  return (

<div className="SeriesCards">
  <h2>Popular Tv Shows</h2>
  <div className="series-list">

  {apiData.map((card,index)=>{
          return <Link  to={`/series/${card.id}tv`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.poster_path}  />
            
          </Link>
        })}
    

  </div>
</div>

 ) }

export default SeriesCards
