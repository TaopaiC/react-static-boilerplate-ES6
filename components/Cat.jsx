import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

var Cat = React.createClass({

  render: function() {
    let href = "/cats/" + this.props.cat.id;
    return (
      <li><Link to={href}>{this.props.cat.name}</Link></li>
    );
  }
});

export default Cat;