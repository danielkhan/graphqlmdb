import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import Loader from "./Loader";

import Axios from "axios";

const Main = () => {
  const [moviesInTheaters, setMoviesInTheaters] = useState([]);
  const [loadingMoviesInTheaters, setLoadingMoviesInTheaters] = useState(true);

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loadingUpcomingMovies, setLoadingUpcomingMovies] = useState(true);

  const [popularMovies, setPopularMovies] = useState([]);
  const [loadingPopularMovies, setLoadingPopularMovies] = useState(true);

  const [activeInTheatersLink, setActiveInTheatersLink] = useState(false);
  const [activeComingSoonLink, setActiveComingSoonLink] = useState(false);
  const [activePopularLink, setActivePopularLink] = useState(false);

  useEffect(() => {
    fetchMovieInTheaters();
  }, []);

  const fetchMovieInTheaters = () => {
    setActivePopularLink(false);
    setActiveComingSoonLink(false);
    setActiveInTheatersLink(true);

    setMoviesInTheaters([]);
    Axios.get("/.netlify/functions/now_playing").then(res => {
      setMoviesInTheaters(res.data.results);
      setLoadingMoviesInTheaters(false);
    });
  };

  const fetchUpcomingMovies = () => {
    setActiveInTheatersLink(false);
    setActiveComingSoonLink(true);
    setActivePopularLink(false);

    setUpcomingMovies([]);
    Axios.get("/.netlify/functions/upcoming_movies").then(res => {
      setUpcomingMovies(res.data.results);
      setLoadingUpcomingMovies(false);
    });
  };

  const fetchPopularMovies = () => {
    setActiveComingSoonLink(false);
    setActiveInTheatersLink(false);
    setActivePopularLink(true);

    setPopularMovies([]);
    Axios.get("/.netlify/functions/popular_movies").then(res => {
      setPopularMovies(res.data.results);
      setLoadingPopularMovies(false);
    });
  };

  if (loadingMoviesInTheaters) {
    return false;
  }

  return (
    <main className="home-main">
      <ul className="nav">
        <li
          className={`nav__item ${activeInTheatersLink ? "active-link" : ""}`}
          onClick={fetchMovieInTheaters}
        >
          In Theaters
        </li>
        <li
          className={`nav__item ${activeComingSoonLink ? "active-link" : ""}`}
          onClick={fetchUpcomingMovies}
        >
          Coming Soon
        </li>
        <li
          className={`nav__item ${activePopularLink ? "active-link" : ""}`}
          onClick={fetchPopularMovies}
        >
          Popular
        </li>
      </ul>
      <section className="flex">
        {activeInTheatersLink
          ? loadingMoviesInTheaters
            ? <Loader />
            : moviesInTheaters.map(m => (
                <Movie
                  key={m.id}
                  movie={m}
                />
              ))
          : null}
        {activeComingSoonLink
          ? loadingUpcomingMovies
            ? <Loader />
            : upcomingMovies.map(m => (
                <Movie
                  key={m.id}
                  movie={m}
                />
              ))
          : null}
        {activePopularLink
          ? loadingPopularMovies
            ? <Loader />
            : popularMovies.map(m => (
                <Movie
                  key={m.id}
                  movie={m}
                />
              ))
          : null}
      </section>
    </main>
  );
};

export default Main;
