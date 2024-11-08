import './Details.css';

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY ='fde80901';

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
   
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) return <span class="loader"></span>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className="movie-details container ">
      <Link to="/">Back to Search</Link>

      <div class="row">
    <div class="col">
    <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} alt={movie.Title} />
    </div>
    <div class="col">
    <h1>{movie.Title}</h1>
      
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
    </div>
  </div>


     
      


    </div>
  );
};

export default MovieDetails;
