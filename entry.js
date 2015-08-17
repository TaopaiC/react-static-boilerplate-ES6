
import React from 'react'
import Router from 'react-router'
import Routes from './Routes.jsx'
import alt from './alt'
import co from 'co'

if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML);
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, initialProps), document)
  })
}

const promisifiedRouter = (routes, path) => {
  return new Promise((resolve) => {
    Router.run(routes, path, function (Handler) {
      resolve(Handler);
    })
  });
};

// refer from https://github.com/iam4x/isomorphic-flux-boilerplate
function* render(locals) {
  const Handler = yield promisifiedRouter(Routes, locals.path);
  const html = yield alt.render(React.createElement(Handler, locals));
  return '<!DOCTYPE html>' + html;
}

let Entry = co.wrap(render);

// add wrapper to fit Promise.fromNode() in static-site-generator-webpack-plugin
export default function(locals, cb) {
  return Entry(locals).then(cb.bind(null, null));
};
