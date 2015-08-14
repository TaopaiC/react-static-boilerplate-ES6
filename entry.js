
import React from 'react'
import Router from 'react-router'
import Routes from './Routes.jsx'
import alt from './alt'

if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML);
  alt.bootstrap(JSON.stringify(initialProps['stores']));
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, initialProps), document)
  })
}

let Entry = function render (locals, callback) {
  alt.bootstrap(JSON.stringify(locals['stores']));
  Router.run(Routes, locals.path, function (Handler) {
    var html = React.renderToString(React.createElement(Handler, locals))
    callback(null, '<!DOCTYPE html>' + html)
  })
}

export default Entry
