import React from 'react'

// Since this component is simple and static, there's no parent container for it.
function AboutPage () {
  return (
    <div>
      <h2 className="text-center">About</h2>
      <p>
      DjMessenger is a toy messaging app built with{' '}
       <span className="fa fa-heart" /> by Santiago Saavedra.
      </p>
    </div>
  )
}

export default AboutPage
