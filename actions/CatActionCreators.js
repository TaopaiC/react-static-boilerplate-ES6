import alt from '../alt';

var fetchCatsApi = function() {
  return fetch('/api/cats.json', {
  }).then(function(response) {
    return response.json();
  });
};

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

var localFetchCatsApi = function() {
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
      let api = localFetchCatsApi()
      api.then((response) => {
        this.dispatch(response);
      });
      api.then(resolve, resolve);
    }));
  }
  fetchCat(id) {
    this.dispatch({});
  }
}

export default alt.createActions(CatActions);