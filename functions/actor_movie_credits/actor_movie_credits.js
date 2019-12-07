const axios = require("axios");
const qs = require("qs");

exports.handler = async function(event, context) {
  const { id } = event.queryStringParameters;
  const { API_KEY, API_URL } = process.env;
  const URL = `${API_URL}/person/${id}/movie_credits?api_key=${API_KEY}`;

  try {
    const { data } = await axios.get(URL);
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data })
    };
  }
};
