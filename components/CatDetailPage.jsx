import React from 'react';
import CatStore from '../stores/CatStore';
import CatActions from '../actions/CatActionCreators';
import CatDetail from './CatDetail';
import _ from 'lodash';

var CatDetailPage = React.createClass({
  getInitialState: function() {
    var state = CatStore.getState();
    var cats = state['cats'];
    var cat = _.find(cats, 'id', this.props.catId) || {};
    return {cat: cat};
  },

  componentWillMount: function() {
    CatStore.listen(this.onCatStoreChange);
    CatActions.fetchCats();
  },

  componentWillUnMount: function() {
    CatStore.unlisten(this.onCatStoreChange);
  },

  onCatStoreChange: function(state) {
    var cats = state['cats'];
    var cat = _.find(cats, 'id', this.props.catId) || {};
    return {cat: cat};
  },

  render: function() {
    return (
      <CatDetail cat={this.state.cat}/>
    );
  }
});

export default CatDetailPage;

