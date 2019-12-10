import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import moment from "moment";

import leftArrow from "../images/left-arrow.svg";

const ACTOR_QUERY = gql`
  query Actor($id: ID!) {
    actor(id: $id) {
      name
      biography
      birthday
      place_of_birth
      movies {
        id
        title
        poster_path
      }
    }
  }
`;

const Actor = props => {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(ACTOR_QUERY, { variables: { id } });

  const textTruncate = (str, length = 425, ending = "...") => {
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  if (loading) return false;
  if (error) return false;
  return (
    <Fragment>
      <header className="details-header" style={{ background: "#b1a721" }}>
        <button onClick={() => props.history.goBack()} className="back-btn">
          <img src={leftArrow} alt="go back" />
        </button>
        <div className="col1">
          <h1>{data.actor.name}</h1>
          <p>{textTruncate(data.actor.biography)}</p>
        </div>
        <div className="col2">
          <ul>
            <li style={{ flexBasis: "42%" }}>
              <h4 style={{ color: "#655F00" }}>date of birth</h4>
              <p>{moment(data.actor.birthday).format("MMMM Do, YYYY")}</p>
            </li>
            <li style={{ flexBasis: "42%" }}>
              <h4 style={{ color: "#655F00" }}>from</h4>
              <p>{data.actor.place_of_birth}</p>
            </li>
          </ul>
        </div>
      </header>
      <main className="details-main">
        <section>
          <p>Known For</p>
          <ul className="recommended-movies-list">
            {data.actor.movies
              .filter(movie => movie.poster_path !== null)
              .map(movie => (
                <li key={movie.id}>
                  <Link to={`/details/${movie.id}`}>
                    <figure className="recommended-movie">
                      <img
                        className="recommended-movie__poster"
                        src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                        alt={movie.name}
                      />
                    </figure>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </Fragment>
  );
};

export default Actor;
