import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GenreContext } from "../contexts/GenreContext";
import { ConfigContext } from "../contexts/ConfigContext";

import Axios from "axios";

const Main = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { images } = useContext(ConfigContext);
  const { genres } = useContext(GenreContext);

  useEffect(() => {
    fetchMovieInTheaters();
    fetchUpcomingMovies();
    fetchPopularMovies();
  }, []);

  const fetchMovieInTheaters = () => {
    Axios.get("/.netlify/functions/now_playing").then(res => {
      setResults(res.data.results);
      setLoading(false);
    });
  };

  const fetchUpcomingMovies = () => {
    Axios.get("/.netlify/functions/upcoming_movies").then(res => {
      setResults(res.data.results);
      setLoading(false);
    });
  };

  const fetchPopularMovies = () => {
    Axios.get("/.netlify/functions/popular_movies").then(res => {
      setResults(res.data.results);
      setLoading(false);
    });
  };

  const path = images.secure_base_url;
  const imgSize = images.poster_sizes[3];

  if (loading) {
    return false;
  }

  return (
    <main className="home-main">
      <ul className="nav">
        <li className="nav__item" onClick={fetchMovieInTheaters}>
          In Theaters
        </li>
        <li className="nav__item" onClick={fetchUpcomingMovies}>
          Coming Soon
        </li>
        <li className="nav__item" onClick={fetchPopularMovies}>
          Popular
        </li>
      </ul>
      <section className="flex">
        {results.map(r => (
          <Link to={`/details/${r.id}`} key={r.id}>
            <figure className="movie">
              <img
                className="movie__poster"
                src={`${path}${imgSize}${r.poster_path}`}
                alt={`${r.title || r.name}`}
              />
              <figcaption>
                <h3 className="movie__title">{r.title || r.name}</h3>
                <ul className="movie__genre">
                  {r.genre_ids
                    .map(gid =>
                      genres.filter(g => g.id === gid).map(g => g.name)
                    )
                    .reduce((prev, next) => prev.concat(next))
                    .slice(0, 3)
                    .map((genre, i) => (
                      <li key={i} className="movie__genre-item">
                        {genre}
                      </li>
                    ))}
                </ul>
                <div className="movie__rating">
                  <i className="movie__icon fas fa-heart" />
                  <span className="movie__number">{r.vote_average}</span>
                </div>
              </figcaption>
            </figure>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Main;
