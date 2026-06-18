import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Body() {
  const [text, setText] = useState("");
  const [type, setType] = useState("movie");
  const [movies, setMovies] = useState([]);

  // const config = {
  //   headers: {
  //     api_key: "e213fb3811d80af3ea152d2cad302676",
  //   },
  // };

  const searchMovie = async (movieName, type) => {
    const res = axios.get(
      `https://api.themoviedb.org/3/search/${type}?query=${movieName}&api_key=e213fb3811d80af3ea152d2cad302676`,
    );
    res.then(({ data }) => {
      console.log(data.results);
      setMovies([...data.results]);
    });
  };

  const handleNameChange = (value) => {
    setText(value);
  };

  const handletype = (value) => {
    setType(value);
  };

  useEffect(() => {
    if (!text.trim()) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(() => {
      searchMovie(text, type);
    }, 500);

    return () => clearTimeout(timer);
  }, [text, type]);
  return (
    <div>
      {" "}
      <div className="screen">
        <div className="container">
          <div className="hero">
            <h1>CINEMA DISCOVER</h1>
            <p>Search millions of movies and TV shows instantly</p>
          </div>

          <div className="searchBox">
            <input
              type="text"
              placeholder="Search Movies or TV Shows..."
              value={text}
              onChange={(event) => {
                handleNameChange(event.target.value);
              }}
            />

            <select
              id="looking"
              value={type}
              onChange={(event) => {
                handletype(event.target.value);
              }}
            >
              <option value="movie">🎬 Movies</option>
              <option value="tv">📺 TV Shows</option>
            </select>
          </div>
        </div>
        {movies.length > 0 && (
          <div className="featured">
            <img
              src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
              alt=""
            />

            <div className="featuredContent">
              <span className="featuredTag">
                ⭐ {movies[0].vote_average?.toFixed(1)}
              </span>

              <h1>{type === "movie" ? movies[0].title : movies[0].name}</h1>

              <p>{movies[0].overview}</p>
            </div>
          </div>
        )}
        {movies.length > 0 && (
          <h2 className="resultsTitle">Results ({movies.length})</h2>
        )}
        <div className="movieList">
          {!!movies.length &&
            movies.map((movie) => {
              return (
                <div className="card" key={movie.id}>
                  <div className="image">
                    <div className="imageHolder">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Poster"
                        }
                        alt={movie.original_title || movie.name}
                      />
                      <div className="rating">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h2>
                      {type === "movie" ? movie.original_title : movie.name}
                    </h2>
                    <p>
                      {type === "movie"
                        ? movie.release_date
                        : movie.first_air_date}
                    </p>
                    <p className="overview">
                      {movie.overview?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              );
            })}
          {!movies.length && !!text.length && <h1>No result Found</h1>}
        </div>
      </div>
    </div>
  );
}
