import { useEffect, useRef, useState } from 'react';
import "./TitleCards.css";
// import cards_data from "../../assets/cards/Cards_data"
import { Link } from 'react-router-dom';



const TitleCards = ({title,category}) => {
  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTQ0NjYwMjM4ODFjYWJjMDY1Mjg2OTlhOTdjMDFmZCIsInN1YiI6IjY2NzMxZTk0ZTUzYTE1YTY0MDE2YTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dam4Gz52W5AH59YVWjBFWRodSns1HYW_9O3rQTeINpo'
    }
  };
  
  

const handleWheel = (e)=>{
  e.prevenDefault;
  cardsRef.current.scrollLeft += e.deltaY;
}

useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);
},[])





  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return  <Link  to={`/series/${card.id}movies`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.poster_path}  />
            {/* <p>{card.original_title}</p> */}
          </Link>
        })}
      </div>
    </div>
  
  )
}

export default TitleCards


{/* <Link to={`/player/${card.id}`} */}