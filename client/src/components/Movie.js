import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const IN_THEATERS = gql`
  {
    nowPlaying {
      id
      title
      poster_path
      vote_average
    }
  }
`;

const UPCOMING_MOVIES = gql`
  {
    upcomingMovies {
      id
      title
      poster_path
      vote_average
    }
  }
`;

const POPULAR_MOVIES = gql`
  {
    popularMovies {
      id
      title
      poster_path
      vote_average
    }
  }
`;

const Movie = props => {
  const topic = props.match.params.topic;
  const {
    loading: nowPlayingLoader,
    error: nowPlayingError,
    data: nowPlayingData
  } = useQuery(IN_THEATERS);
  const {
    loading: upcomingMoviesLoader,
    error: upcomingMoviesError,
    data: upcomingMoviesData
  } = useQuery(UPCOMING_MOVIES);
  const {
    loading: popularMoviesLoader,
    error: popularMoviesError,
    data: popularMoviesData
  } = useQuery(POPULAR_MOVIES);
  switch (topic) {
    case "in-theaters":
      if (nowPlayingLoader) return false;
      if (nowPlayingError) return false;
      return nowPlayingData.nowPlaying.map(movie => (
        <Link key={movie.id} to={`/details/${movie.id}`}>
          <figure className="movie">
            <img
              className="movie__poster"
              src={`${movie.poster_path}`}
              alt={`${movie.title || movie.name}`}
            />
            <figcaption>
              <h3 className="movie__title">{movie.title || movie.name}</h3>

              <div className="movie__rating">
                <i className="movie__icon fas fa-heart" />
                <span className="movie__number">{movie.vote_average}</span>
              </div>
            </figcaption>
          </figure>
        </Link>
      ));
    case "coming-soon":
      if (upcomingMoviesLoader) return false;
      if (upcomingMoviesError) return false;
      return upcomingMoviesData.upcomingMovies.map(movie => (
        <Link key={movie.id} to={`/details/${movie.id}`}>
          <figure className="movie">
            <img
              className="movie__poster"
              src={`${movie.poster_path}`}
              alt={`${movie.title || movie.name}`}
            />
            <figcaption>
              <h3 className="movie__title">{movie.title || movie.name}</h3>

              <div className="movie__rating">
                <i className="movie__icon fas fa-heart" />
                <span className="movie__number">{movie.vote_average}</span>
              </div>
            </figcaption>
          </figure>
        </Link>
      ));
    case "popular":
      if (popularMoviesLoader) return false;
      if (popularMoviesError) return false;
      return popularMoviesData.popularMovies.map(movie => (
        <Link key={movie.id} to={`/details/${movie.id}`}>
          <figure className="movie">
            <img
              className="movie__poster"
              src={`${movie.poster_path}`}
              alt={`${movie.title || movie.name}`}
            />
            <figcaption>
              <h3 className="movie__title">{movie.title || movie.name}</h3>

              <div className="movie__rating">
                <i className="movie__icon fas fa-heart" />
                <span className="movie__number">{movie.vote_average}</span>
              </div>
            </figcaption>
          </figure>
        </Link>
      ));
    default:
      break;
  }
};

export default Movie;
