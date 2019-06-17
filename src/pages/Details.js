import React, { Fragment, useState, useEffect, useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import moment from "moment";
import Axios from "axios";

import { Link } from "react-router-dom";

import leftArrow from "../images/left-arrow.svg";

const Details = props => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [cast, setCast] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    getMovieDetails(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    getCast(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    getRecommendedMovies(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const getMovieDetails = id => {
    setDetails({});
    Axios.get(`/.netlify/functions/movie_details?id=${id}`).then(res => {
      setDetails(res.data);
      setLoading(false);
    });
  };

  const getCast = id => {
    setCast([]);
    Axios.get(`/.netlify/functions/get_movie_cast?movie_id=${id}`).then(res => {
      setCast(res.data.cast.slice(0, 15));
      setLoading(false);
    });
  };

  const getRecommendedMovies = id => {
    setRecommendedMovies([]);
    Axios.get(`/.netlify/functions/recommended_movies?movie_id=${id}`).then(
      res => {
        setRecommendedMovies(res.data.results);
        setLoading(false);
      }
    );
  };

  const getDuration = num => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  const { images } = useContext(ConfigContext);
  const path = images.secure_base_url;
  const backgroundSize = images.backdrop_sizes[2];
  const profileSize = images.profile_sizes[1];
  const posterSize = images.poster_sizes[1];

  const backgroundImg = `linear-gradient(0deg, rgba(0,0,0,.9), rgba(0,0,0,.5)), url(${path}${backgroundSize}${
    details.backdrop_path
  }) no-repeat center center / cover`;

  if (loading) {
    return false;
  }
  return (
    <Fragment>
      <header className="details-header" style={{ background: backgroundImg }}>
        <Link className="back-btn" to="/movies">
          <img src={leftArrow} alt="go back" />
        </Link>
        <div className="col1">
          <h1>{details.title}</h1>
          <p>{details.overview}</p>
        </div>
        <div className="col2">
          <ul>
            <li>
              <h4>genre</h4>
              {details.genres &&
                details.genres
                  .slice(0, 3)
                  .map(genre => <p key={genre.id}>{genre.name}</p>)}
            </li>
            <li>
              <h4>movie length</h4>
              <p>{getDuration(details.runtime)}</p>
            </li>
            <li>
              <h4>country</h4>
              <p>
                {details.production_countries
                  ? details.production_countries.length === 0
                    ? "US"
                    : details.production_countries[0].iso_3166_1
                  : "US"}
              </p>
            </li>
            <li>
              <h4>release date</h4>
              <p>{moment(details.release_date).format("ll")}</p>
            </li>
          </ul>
        </div>
      </header>
      <main className="details-main">
        <section>
          <h5>Cast</h5>
          <ul className="cast-list">
            {cast
              .filter(c => c.profile_path !== null)
              .map(c => (
                <li key={c.id}>
                  <figure className="cast">
                    <img
                      className="cast__profile"
                      src={`${path}${profileSize}${c.profile_path}`}
                      alt={c.name}
                    />
                    <figcaption>
                      <h6 className="cast__name">{c.name}</h6>
                      <p className="cast__character-name">as {c.character}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
          </ul>
        </section>
        {recommendedMovies.length === 0 ? null : (
          <section>
            <h5>People also liked</h5>
            <ul className="recommended-movies-list">
              {recommendedMovies.map(movie => (
                <li key={movie.id}>
                  <Link to={`/details/${movie.id}`}>
                    <figure className="recommended-movie">
                      <img
                        className="recommended-movie__poster"
                        src={`${path}${posterSize}${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </Fragment>
  );
};

export default Details;
