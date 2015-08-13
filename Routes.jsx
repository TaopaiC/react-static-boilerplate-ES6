import React from 'react'
import Router from 'react-router'
import Root from './components/Root.jsx'
import Index from './components/Index.jsx'
import About from './components/About.jsx'
import Cats from './components/Cats.jsx'

let Route = Router.Route
let DefaultRoute = Router.DefaultRoute

let Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/about/' handler={About} />
    <Route path='/cats/' handler={Cats} />
  </Route>
)

export default Routes
