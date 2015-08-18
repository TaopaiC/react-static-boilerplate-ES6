import fetch from './fetch';

var prefix = (typeof API_PREFIX !== 'undefined') ? API_PREFIX : '/api';

var fetchCatsApi = function() {
  let api = fetch(prefix + '/cats.json')
    .then(function(res) {
      return res.json();
    });

  return api;
};

var localFetchCatsApi = function() {
  var cats_api_data = [
    {
      "id": 1,
      "name": "local Pow Cat 1",
      "description": "This is a cat"
    },
    {
      "id": 2,
      "name": "local Pow Cat 2",
      "description": "This is a cat"
    }
  ];
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(cats_api_data);
    }, 500);
  });
};

export default {
  list: fetchCatsApi
};
