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
    this.dispatch({});
  }
}

export default alt.createActions(CatActions);