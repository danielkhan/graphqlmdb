const axios = require("axios");
const qs = require("qs");

exports.handler = function(event, context, callback) {
  const { API_KEY, API_URL } = process.env;
  const URL = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;

  const pass = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  const get = () => {
    axios
      .get(URL)
      .then(response => {
        // console.log(response.data);
        pass(response.data);
      })
      .catch(err => pass(err));
  };
  if (event.httpMethod == "GET") {
    get();
  }
};
