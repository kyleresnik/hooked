import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';


const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=9f3adc34";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // We can use multiple useState functions in one component. The first one
  // is used to handle the loading state and will render "Loading..." when
  // set to True. The second is used to handle the movies array from the
  // server. The third is used to handle any errors that may occur when
  // making a request to the API.

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);
  // useEffect hook lets you perform side effects in your function, such as
  // data fetching, subscriptions, and manual DOM manipulations. You can think
  // of useEffect as class life cycle methods componentDidMount, componentDidUpdate,
  // and componentWillUnmount combined. useEffect is similar to componentDidMount
  // in that useEffect accepts two arguments, the function that you want to run
  // and the second being an array. In that array we pass in a value that tells
  // React to skip applying an effect if the value passed in hasn't changed.

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=9f3adc34`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
