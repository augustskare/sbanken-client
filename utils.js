const got = require('got');

function base64Encode(string) { return Buffer.from(string).toString('base64'); } 

async function fetch({access_token, customer_id, base = 'bank', url, options = {}}) {
  try {
    const response = await got(`https://api.sbanken.no/${base}/api/v1/${url}`, {
      method: 'GET',
      json: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
        customerId: customer_id,
        Accept: 'application/json',
      },
    });

    return response.body;
  } catch (error) {
    return Promise.reject({ error: error.statusCode });
  }
}

module.exports = {base64Encode, fetch};