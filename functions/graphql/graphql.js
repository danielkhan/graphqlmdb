const { ApolloServer, gql } = require("apollo-server-lambda");
const axios = require("axios");

const port = process.env.SITE_URL || "http://localhost:8888";

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    vote_average: Float
    poster_path: String
    backdrop_path: String
  }

  type MovieInfo {
    id: ID
    title: String
    overview: String
    genres: [Genre]
    release_date: String
    runtime: Int
    backdrop_path: String
    cast: [Cast]
    recommended: [Movie]
  }

  type Genre {
    id: ID
    name: String
  }

  type Cast {
    id: ID
    character: String
    name: String
    profile_path: String
  }

  type Actor {
    id: ID
    name: String
    biography: String
    birthday: String
    place_of_birth: String
    movies: [Movie]
  }

  type Query {
    nowPlaying: [Movie]
    popular: [Movie]
    comingSoon: [Movie]
    movie(id: ID): MovieInfo
    actor(id: ID): Actor
  }
`;

const resolvers = {
  Query: {
    nowPlaying: (root, args, context) => {
      return axios
        .get(`${port}/.netlify/functions/now_playing`)
        .then(res => res.data.results);
    },
    popular: (root, args, context) => {
      return axios
        .get(`${port}/.netlify/functions/popular_movies`)
        .then(res => res.data.results);
    },
    comingSoon: (root, args, context) => {
      return axios
        .get(`${port}/.netlify/functions/upcoming_movies`)
        .then(res => res.data.results);
    },
    movie: (root, args, context) => {
      return axios
        .get(`${port}/.netlify/functions/movie_details?id=${args.id}`)
        .then(res => res.data);
    },
    actor: (root, args, context) => {
      return axios
        .get(`${port}/.netlify/functions/actor_details?id=${args.id}`)
        .then(res => res.data);
    }
  },
  MovieInfo: {
    cast(movie) {
      return axios
        .get(`${port}/.netlify/functions/get_movie_cast?movie_id=${movie.id}`)
        .then(res => res.data.cast);
    },
    recommended(movie) {
      return axios
        .get(
          `${port}/.netlify/functions/recommended_movies?movie_id=${movie.id}`
        )
        .then(res => res.data.results);
    }
  },
  Actor: {
    movies(actor) {
      return axios
        .get(`${port}/.netlify/functions/actor_movie_credits?id=${actor.id}`)
        .then(res => res.data.cast);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});
