import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ACTOR_QUERY = gql`
  query Actor($id: ID!) {
    actor(id: $id) {
      name
      biography
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

  if (loading) return false;
  if (error) return false;
  return (
    <div>
      <h1>{data.actor.name}</h1>
      <p>{data.actor.biography}</p>
      <p>Known For</p>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {data.actor.movies
          .filter(movie => movie.poster_path != null)
          .map(movie => (
            <li key={movie.id}>
              <Link to={`/details/${movie.id}`}>
                <figure>
                  <img src={movie.poster_path} alt={movie.name} />
                </figure>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Actor;
