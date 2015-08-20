import alt from '../alt';
import CatsApi from '../helpers/CatsApi';

class CatActions {
  fetchCats() {
    var that = this;
    alt.resolve(new Promise((resolve) => {
      let api = CatsApi.list()
      api.then((response) => {
        this.dispatch(response);
      }).catch((error) => {
        console.error(error);
      });
      api.then(resolve, resolve);
    }));
  }
  fetchCat(id) {
    var that = this;
    alt.resolve(new Promise((resolve) => {
      let api = CatsApi.get(id)
      api.then((response) => {
        this.dispatch(response);
      }).catch((error) => {
        console.error(error);
      });
      api.then(resolve, resolve);
    }));
  }
}

export default alt.createActions(CatActions);