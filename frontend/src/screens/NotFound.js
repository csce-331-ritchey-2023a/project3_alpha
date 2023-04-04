import React from 'react'
import {Link} from 'react-router-dom'

import './NotFound.css'

const NotFound = () => {
  return (
    <div>
        <h1>This page does not exist!</h1>
        <Link to="/" className="link-style">               
            <h3>Please return home here</h3>    
            </Link>
    </div>
  )
}

export default NotFound