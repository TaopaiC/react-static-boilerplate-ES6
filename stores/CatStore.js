import alt from '../alt';
import CatActions from '../actions/CatActionCreators'

class CatStore {
  constructor() {
    this.bindListeners({
      fetchCat: CatActions.fetchCat,
      fetchCats: CatActions.fetchCats
    });

    this.state = {
      cats: []
    };
  }

  fetchCat(cat) {
    this.setState({cats: this.state.cats.concat(cat)});
  }
  fetchCats(cats) {
    this.setState({cats: cats});
  }

}

export default alt.createStore(CatStore, 'CatStore');