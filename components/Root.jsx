
import React  from 'react'
import Router from 'react-router'
import Header from './Header.jsx'
import css    from '../css/base.css'
import alt    from '../alt'

let RouteHandler = Router.RouteHandler

export default class Root extends React.Component {
  
  constructor(props) {
      super(props)
      title: props.string
      assets: props.array
  }

  render () {
    let jsfile = this.props.assets['main']

    let initialProps = {
      __html: safeStringify(this.props)
    }

    let initialStores = {
      __html: safeString(alt.takeSnapshot())
    }

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body className='p2'>
          <Header {...this.props} />
          <RouteHandler {...this.props} />
          <script
            id='initial-props'
            type='application/json'
            dangerouslySetInnerHTML={initialProps} />
          <script
            id='initial-stores'
            type='application/json'
            dangerouslySetInnerHTML={initialStores} />
          <script src={jsfile} />
        </body>
      </html>
    )
  }
}

function safeStringify (obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

function safeString (obj) {
  return obj.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
