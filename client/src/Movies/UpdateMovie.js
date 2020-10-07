import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
// import e from "express";

const initialItem = {
    id: "",
    title: "",
    director: "",
    metasore: "",
    stars: [],
}

const UpdateMovie = (props) => {
    const [movies, setMovies] = useState(initialItem)
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            console.log( { res } );
            setMovies(res.data)

        })
        .catch((err) => console.log(err))
    }, [id])

    const changeHandler = (event) => {
        event.persist()
        setMovies({
            ...movies,
            [event.target.name] : event.target.value
        })
 
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movies)
        .then((res) => {
            console.log(res.data)
            setMovies(res.data)
            // props.setMovieList(res.data)
            push(`/movies/${id}`)
        })
        .catch((err) => console.log(err))
    }

    return (
            <div>
              <h2>Update Movie</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  placeholder="Title"
                  value={movies.title}
                />
        
                <input
                  type="text"
                  name="director"
                  onChange={changeHandler}
                  placeholder="Director"
                  value={movies.director}
                />
        
                <input
                  type="number"
                  name="metascore"
                  onChange={changeHandler}
                  placeholder="Metascore"
                  value={movies.metascore}
                />

                {/* <input
                  type="text"
                  name="stars"
                  onChange={changeHandler}
                  placeholder="Stars"
                  value={movies.stars}
                /> */}
         
                <button>Update Movie</button>
              </form>
            </div>
          );
        };
        
        export default UpdateMovie;