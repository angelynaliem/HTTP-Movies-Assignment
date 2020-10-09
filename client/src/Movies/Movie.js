import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  // const params = useParams();

  const history = useHistory();
  const { id } = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteItem = (e) => {
    e.preventDefault();
    console.log("deleting ", movie.id);
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("DELETE ", res)
        // setMovie(res.data)
        props.getMovieList();
        history.push("/movies");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => history.push(`/update-movie/${id}`)}>Update Movie</button>
      <button onClick={deleteItem}>
        Delete
      </button>
    </div>
  );
}

export default Movie;

