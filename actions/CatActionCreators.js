import alt from '../alt';
var axios = (typeof AXIOS !== 'undefined') ? AXIOS : require('axios');

var prefix = (typeof API_PREFIX !== 'undefined') ? API_PREFIX : '/api';

var fetchCatsApi = function() {
  let api = axios.get(prefix + '/cats.json').then((response) => { return response.data });

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

class CatActions {
  fetchCats() {
    var that = this;
    alt.resolve(new Promise((resolve) => {
      let api = fetchCatsApi()
      api.then((response) => {
        this.dispatch(response);
      }).catch((error) => {
        console.error(error);
      });
      api.then(resolve, resolve);
    }));
  }
  fetchCat(id) {
    this.dispatch({});
  }
}

export default alt.createActions(CatActions);