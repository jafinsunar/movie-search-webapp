import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';





const Home = () => {
  const [movies , setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Avengers');
  const [loading, setLoading] =useState(false);
  const [error,setError] = useState(null);

  const API_KEY ='fde80901';
 const fetchMovies = async () => {
  setLoading(true);

  try {
    let response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
    let result = await response.json();
    console.log(result);

    if(result.Response === 'True'){
      setMovies(result.Search);
    }
    else {
      setError(result.Error); // Set error message from the API
      setMovies([]);
    }

  } catch (err) {
    setError('An unexpected error occurred.');
  }

  setLoading(false)
 };


useEffect(()=> {
  fetchMovies();
},[searchTerm])






  return (
    <>
    <div className="search">
        <label htmlFor="search" className='d-flex justify-content-center'>
            <input type="search" id="search" placeholder='Search' value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className='btn' onClick={fetchMovies}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg></button>
        </label>
    </div>

    {loading && <span class="loader"></span>}
   <hr />

<div className=" container d-flex flex-wrap justify-content-center">
 

  {movies.map((movie)=>( 
    
    <div className="card m-2" >
<img src={movie.Poster} className="card-img-top" alt="..."></img>
<div className="card-body">
    <h5 className="card-title">{movie.Title}</h5>
    <h6>Year: {movie.Year}</h6>
    <p>IMDb ID : {movie.imdbID}</p>
   <Link to={`/movie/${movie.imdbID}`}>
   <a className="btn btn-primary">More Details</a>
   </Link>
    
  </div>
</div>
))}
  
 

</div>
    </>
  )
}

export default Home
