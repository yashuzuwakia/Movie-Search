import './App.css';
import { useState } from 'react';
import axios from 'axios';
function App()
{
  
  const [text, setText] = useState("");
  const [type, setType] = useState("movie");
  const [movies, setMovies] = useState([]);

  // const config = {
  //   headers: {
  //     api_key: "e213fb3811d80af3ea152d2cad302676",
  //   },
  // };

  const searchMovie = async (movieName,type) =>
  {
    const res = axios.get(`https://api.themoviedb.org/3/search/${type}?query=${movieName}&api_key=e213fb3811d80af3ea152d2cad302676`)
    res.then(({data}) =>
    {
      console.log(data.results)
      setMovies([...data.results])
    })
  }

  const handletype = (value) =>
  {
    setType(value);
    searchMovie(text,value);
  }

  const handleNameChange = (value) =>
  {
    setText(value);
    searchMovie(value,type)
  }
  return (
    <div className="screen">
      <div className='container'>
        <h1>Movie & TV Show</h1>
        <div className='entryarea'>
          <input
            type="text"
            placeholder="Movie and TV Show"
            value={text}
            onChange={(event) =>
            {
              handleNameChange(event.target.value)
            }}
          />
          <label for="looking">Looking For:</label>
          <select id="looking" name="looking" onChange={(event) =>
          {
              handletype(event.target.value)
          }}>
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
        </div>
      </div>
      <div className='movieList'>
        { !!movies.length &&
          movies.map((movie) =>
          {
            return (
              <div className='card'>
                <div className='image'>
                  <div className='imageHolder'>
                  <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={movie.original_title} />
                  </div>
                </div>  
                <div className='content'>
                  <h2>
                    {type === "movie" ? movie.original_title: movie.name}
                  </h2>
                  <p>{type === "movie" ? movie.release_date: movie.first_air_date}</p>
                </div>
              </div>)
          })
        }
        {!movies.length && !!text.length &&
          <h1>No result Found</h1>
        }
        {!movies.length && !text.length &&
          <h1>You can search</h1>
        }
      </div>
    </div>
  );
}

export default App;
