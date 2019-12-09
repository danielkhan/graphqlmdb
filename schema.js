const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Movie Type
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString }
  })
});

// Movie Details
const MovieInfoType = new GraphQLObjectType({
  name: "MovieInfo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    genres: { type: new GraphQLList(GenreType) },
    release_date: { type: GraphQLString },
    runtime: { type: GraphQLInt },
    backdrop_path: { type: GraphQLString },
    cast: {
      type: new GraphQLList(CastType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return axios
          .get(
            `http://localhost:8888/.netlify/functions/get_movie_cast?movie_id=${parent.id}`
          )
          .then(res => res.data.cast);
      }
    },
    recommended: {
      type: new GraphQLList(MovieType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return axios
          .get(
            `http://localhost:8888/.netlify/functions/recommended_movies?movie_id=${parent.id}`
          )
          .then(res => {
            const recommendedMovies = res.data.results;
            recommendedMovies.map(
              movie =>
                (movie.poster_path = `https://image.tmdb.org/t/p/w154${movie.poster_path}`)
            );
            return recommendedMovies;
          });
      }
    }
  })
});

// Genre Type
const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

// Cast Type
const CastType = new GraphQLObjectType({
  name: "Cast",
  fields: () => ({
    id: { type: GraphQLID },
    character: { type: GraphQLString },
    name: { type: GraphQLString },
    profile_path: { type: GraphQLString }
  })
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    biography: { type: GraphQLString },
    birthday: { type: GraphQLString },
    place_of_birth: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return axios
          .get(
            `http://localhost:8888/.netlify/functions/actor_movie_credits?id=${parent.id}`
          )
          .then(res => res.data.cast);
      }
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    nowPlaying: {
      type: new GraphQLList(MovieType),
      arguments: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve(parent, args) {
        return axios
          .get("http://localhost:8888/.netlify/functions/now_playing")
          .then(res => {
            const movies = res.data.results;
            movies.map(movie => {
              movie.poster_path = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
              movie.backdrop_path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
            });
            return movies;
          });
      }
    },
    upcomingMovies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return axios
          .get("http://localhost:8888/.netlify/functions/upcoming_movies")
          .then(res => {
            const movies = res.data.results;
            movies.map(movie => {
              movie.poster_path = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
              movie.backdrop_path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
            });
            return movies;
          });
      }
    },
    popularMovies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return axios
          .get("http://localhost:8888/.netlify/functions/popular_movies")
          .then(res => {
            const movies = res.data.results;
            movies.map(movie => {
              movie.poster_path = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
              movie.backdrop_path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
            });
            return movies;
          });
      }
    },
    movie: {
      type: MovieInfoType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return axios
          .get(
            `http://localhost:8888/.netlify/functions/movie_details?id=${args.id}`
          )
          .then(res => {
            const movie = res.data;
            movie.backdrop_path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
            return movie;
          });
      }
    },
    actor: {
      type: ActorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return axios
          .get(
            `http://localhost:8888/.netlify/functions/actor_details?id=${args.id}`
          )
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
