import React, { Fragment, useEffect } from "react";
import moment from "moment";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Link } from "react-router-dom";

import leftArrow from "../images/left-arrow.svg";

const MOVIE_DETAILS = gql`
  query Movie($id: ID!) {
    movie(id: $id) {
      title
      overview
      genres {
        id
        name
      }
      release_date
      runtime
      backdrop_path
      cast {
        id
        character
        name
        profile_path
      }
      recommended {
        id
        title
        poster_path
      }
    }
  }
`;

const Details = props => {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(MOVIE_DETAILS, {
    variables: { id }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const getDuration = num => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  if (loading) {
    return false;
  }
  if (error) {
    return false;
  }
  const backgroundImg = `linear-gradient(0deg, rgba(0,0,0,.9), rgba(0,0,0,.5)), url(https://image.tmdb.org/t/p/w1280${data.movie.backdrop_path}) no-repeat center center / cover`;
  return (
    <Fragment>
      <header className="details-header" style={{ background: backgroundImg }}>
        <button
          onClick={() => props.history.goBack()}
          className="back-btn"
          to="/movies"
        >
          <img src={leftArrow} alt="go back" />
        </button>
        <div className="col1">
          <h1>{data.movie.title}</h1>
          <p>{data.movie.overview}</p>
        </div>
        <div className="col2">
          <ul>
            <li>
              <h4>genre</h4>
              {data.movie.genres &&
                data.movie.genres
                  .slice(0, 3)
                  .map(genre => <p key={genre.id}>{genre.name}</p>)}
            </li>
            <li>
              <h4>movie length</h4>
              <p>{getDuration(data.movie.runtime)}</p>
            </li>
            {/* <li>
          <h4>country</h4>
          <p>
            {data.movie.production_countries
              ? data.movie.production_countries.length === 0
                ? "US"
                : data.movie.production_countries[0].iso_3166_1
              : "US"}
          </p>
        </li> */}
            <li>
              <h4>release date</h4>
              <p>{moment(data.movie.release_date).format("ll")}</p>
            </li>
          </ul>
        </div>
      </header>
      <main className="details-main">
        <section>
          <h5>Cast</h5>
          <ul className="cast-list">
            {data.movie.cast
              .filter(c => c.profile_path !== null)
              .map(c => (
                <Link to={`/actor/${c.id}`} key={c.id}>
                  <li>
                    <figure className="cast">
                      <img
                        className="cast__profile"
                        src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                        alt={c.name}
                      />
                      <figcaption>
                        <h6 className="cast__name">{c.name}</h6>
                        {c.character !== "" && (
                          <p className="cast__character-name">
                            as {c.character}
                          </p>
                        )}
                      </figcaption>
                    </figure>
                  </li>
                </Link>
              ))}
          </ul>
        </section>
        {data.movie.recommended.length === 0 ? null : (
          <section>
            <h5>People also liked</h5>
            <ul className="recommended-movies-list">
              {data.movie.recommended.map(movie => (
                <li key={movie.id}>
                  <Link to={`/details/${movie.id}`}>
                    <figure className="recommended-movie">
                      <img
                        className="recommended-movie__poster"
                        src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
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
