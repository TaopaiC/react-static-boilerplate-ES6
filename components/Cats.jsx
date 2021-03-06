import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import CatStore from '../stores/CatStore';
import CatActions from '../actions/CatActionCreators';
import Cat from './Cat';

var Cats = React.createClass({
  getInitialState: function() {
    return CatStore.getState();
  },

  componentWillMount: function() {
    CatStore.listen(this.onCatStoreChange);
    CatActions.fetchCats();
  },

  componentWillUnMount: function() {
    CatStore.unlisten(this.onCatStoreChange);
  },

  onCatStoreChange: function(state) {
    this.setState(state);
  },

  render: function() {
    return (
      <ul>
        {this.state.cats.map((cat) => {
          return (
            <Cat key={cat.id} cat={cat}/>
          );
        })}
      </ul>
    );
  }
});

// class Cats extends React.Component {

export default Cats;