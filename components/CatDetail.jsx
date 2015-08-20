import React from 'react';

var CatDetail = React.createClass({

  render: function() {
    return (
      <li>{this.props.cat.name}</li>
    );
  }
});

export default CatDetail;
