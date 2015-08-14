import alt from '../alt';

class CatActions {
  fetchCats() {
    var that = this;
    fetch('/api/cats.json', {
    }).then(function(response) {
      return response.json();
    }).then((response) => {
      this.dispatch(response);
    });
  }
  fetchCat(id) {
    this.dispatch({});
  }
}

export default alt.createActions(CatActions);