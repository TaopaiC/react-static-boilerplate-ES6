import React from 'react'
import Router from 'react-router'
import Root from './components/Root'
import Index from './components/Index'
import About from './components/About'
import Cats from './components/Cats'
import CatDetailPage from './components/CatDetailPage'

let Route = Router.Route
let DefaultRoute = Router.DefaultRoute

let Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/about/' handler={About} />
    <Route path='/cats/' handler={Cats} />
    <Route path='/cats/:catId' handler={CatDetailPage} />
  </Route>
)

export default Routes
