
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import info from "../../assets/info_icon.png";
import play from "../../assets/play_icon.png";
import Navbar from '../Navbar/Navbar';
import Seasons from '../Seasons/Seasons';
import "./SeriesPage.css";

const SeriesPage = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
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
    <div className='SeriesPage'>
      <Navbar />
      <div className="her">
        {apiData.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w500${apiData.backdrop_path}`} className='banner_img' alt="Banner" />
        )}

        <div className="about">
          {apiData.backdrop_path && (
            <img src={`https://image.tmdb.org/t/p/w500${apiData.poster_path}`} alt="Backdrop" />
          )}

          <div className="overview">
            <h1>{apiData.original_name}</h1>
            <div className="blur-title">
              <p>{apiData.original_name} ({apiData.first_air_date.slice(0, 4)})</p>
            </div>
            <div className="rating">
              <p>⭐️ {parseFloat(apiData.vote_average.toString().substring(0, 3))}</p>
            </div>
            <div className="ab">
            <p>{apiData.overview}</p>
            </div>
            

            <div className="hero-btn">
              <Link to={`/SeriesPlayer/${apiData.id}/1/1`}>
                <button className='bt'><img src={play} alt="Play" />Play</button>
              </Link>
              <button className='bt dark-bt'><img src={info} alt="Info" />More Info</button>
            </div>
          </div>
        </div>
      </div>
          <Seasons/>
    </div>
  );
}

export default SeriesPage;
