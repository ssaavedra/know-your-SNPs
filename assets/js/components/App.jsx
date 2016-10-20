import React, { PropTypes } from 'react'
import MainToolBar from './common/MainToolBar'

function App (props) {
  return (
    <div className="container">
      <MainToolBar />
      {props.children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element
}

export default App
