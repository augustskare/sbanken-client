const got = require('got');
const {base64Encode, fetch} = require('./utils');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;

module.exports = {
  authenticate: async function(secret) {
    try {
      const response = await got('https://auth.sbanken.no/identityserver/connect/token', {
        method: 'POST',
        form: true,
        body: {grant_type: 'client_credentials'},
        headers: {
          'Authorization': `Basic ${base64Encode(`${encodeURIComponent(CLIENT_ID)}:${encodeURIComponent(secret)}`)}`,  
          'Accept': 'application/json'
        }
      });
      let auth = JSON.parse(response.body);
      auth.expires = new Date(new Date().getTime() + (auth.expires_in * 1000));
      return auth;
    } catch (error) {
      return Promise.reject({ error: error.statusCode });
    }
  },

  profile: function(options) {
    return fetch({
      base: 'customers',
      url: 'Customers',
      ...options,
    });
  },

  accounts: function(options) {
    return fetch({
      url: 'Accounts',
      ...options,
    });
  },

  account: function(options) {
    return fetch({
      url: `Accounts/${options.account_id}`,
      ...options,
    });
  },

  transactions: function(options) {
    return fetch({
      url: `Transactions/${options.account_id}`,
      ...options,
    });
  },

};