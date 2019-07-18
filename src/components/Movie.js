import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GenreContext } from "../contexts/GenreContext";
import { ConfigContext } from "../contexts/ConfigContext";

const Movie = ({ movie }) => {
  const { images } = useContext(ConfigContext);
  const { genres } = useContext(GenreContext);
  const path = images.secure_base_url;
  const imgSize = images.poster_sizes[3];
  return (
    <Link to={`/details/${movie.id}`} key={movie.id}>
      <figure className="movie">
        <img
          className="movie__poster"
          src={`${path}${imgSize}${movie.poster_path}`}
          alt={`${movie.title || movie.name}`}
        />
        <figcaption>
          <h3 className="movie__title">{movie.title || movie.name}</h3>
          <ul className="movie__genre">
            {movie.genre_ids
              .map(gid => genres.filter(g => g.id === gid).map(g => g.name))
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
            <span className="movie__number">{movie.vote_average}</span>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Movie;
