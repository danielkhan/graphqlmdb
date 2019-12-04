const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  //   GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Movie Type
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    rating: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return axios
          .get("/.netlify/functions/now_playing")
          .then(res => res.data);
      }
    }
    // movie: {
    //   type: MovieType,
    //   args: {
    //     id: { type: GraphQLInt }
    //   },
    //   resolve(parent, args) {
    //     //   return axios
    //     //     .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
    //     //     .then(res => res.data);
    //   }
    // },
    // genres: {
    //   type: new GraphQLList(GenreType),
    //   resolve(parent, args) {
    //     //   return axios
    //     //     .get('https://api.spacexdata.com/v3/rockets')
    //     //     .then(res => res.data);
    //   }
    // }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
