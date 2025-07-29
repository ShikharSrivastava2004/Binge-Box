import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import barrow from "../../assets/barrow.png";
import logo from "../../assets/logo.png";
import "./SearchPage.css";

import { Link } from 'react-router-dom';


const SearchPage = () => {

  const navigate = useNavigate();
  const[search,setSearch] = useState("");
  const[apiData,setApiData] = useState([]);
  const[sapiData,setSapiData] = useState([]);
  
  const {id} = useParams();
  

    //API Call
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTQ0NjYwMjM4ODFjYWJjMDY1Mjg2OTlhOTdjMDFmZCIsIm5iZiI6MTcxOTI1ODIzMC4zMzYzMzksInN1YiI6IjY2NzMxZTk0ZTUzYTE1YTY0MDE2YTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OkE6AMmgHbbNGtMlhBQwQr4LpJO6dkF5FCpmodevtUw'
  }
};

  const submitHandler =  (e) =>{
    e.preventDefault();
    
    try {
      fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


       fetch(`https://api.themoviedb.org/3/search/tv?query=${search}`, options)
       .then(res => res.json())
       .then(res => setSapiData(res.results))
       .catch(err => console.error(err));
    
    } catch (error) {
      console.log(error)
    } 
  }

  //Api Call

  useEffect(()=>{
     try {
      fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


       fetch(`https://api.themoviedb.org/3/search/tv?query=${search}`, options)
       .then(res => res.json())
       .then(res => setSapiData(res.results))
       .catch(err => console.error(err));
    
    } catch (error) {
      console.log(error)
    } 
      
  },[search])

  return (
    
    <div className='SearchPage'>
      
      <div className="images">
      <img src ={barrow}  onClick={() =>{navigate(-1)}} className='arr'/>
      <img src={logo} className="logo" onClick={() =>{navigate('/')}}  />
      </div>
      <form onSubmit={submitHandler}>
      <div className="search">
        <input value={search} onChange={(e)=>{setSearch(e.target.value);}} type="text" placeholder='Search Anything' />
        
        <button>Search</button>

      </div>
      </form>
      {apiData.length == 0 && search.length > 0 && 
             <h2>Not Available</h2>

      }
      
      {/* Searched Movie */}
      <div className='title-car'>
      
      <div className="card-li" >
          {apiData.map((card,index)=>{
            if(card.poster_path === null){
              return null;
            }else{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
            
              <img src={`https://image.tmdb.org/t/p/w500`+ card.poster_path}  />
              <div className="rate">
              <p>{parseFloat(card.vote_average.toString().substring(0, 3))} ⭐️({card.release_date.slice(0,4)})</p>
              </div>
            </Link>}
          })}

          {sapiData.map((c,i)=>{
            if(c.poster_path === null){
              return null;
            }else{
            return <Link to={`/series/${c.id}`} className="card" key={i}>
            
              <img src={`https://image.tmdb.org/t/p/w500`+ c.poster_path}  />
              <div className="rate">
              <p>{parseFloat(c.vote_average.toString().substring(0, 3))} ⭐️({c.first_air_date.slice(0,4)})</p>
              </div>
              
            </Link>}
          })}
      </div>





    </div>

    </div>
    
    
  )
}

export default SearchPage
