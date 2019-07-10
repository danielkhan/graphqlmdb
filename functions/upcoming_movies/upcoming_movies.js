const axios = require("axios");
const qs = require("qs");

exports.handler = function(event, context, callback) {
  const { API_KEY, API_URL } = process.env;
  const URL = `${API_URL}/movie/upcoming?api_key=${API_KEY}&page=1`;

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
        pass(response.data);
      })
      .catch(err => pass(err));
  };
  if (event.httpMethod == "GET") {
    get();
  }
};
