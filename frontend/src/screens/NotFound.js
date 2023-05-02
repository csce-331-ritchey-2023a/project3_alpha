import React from 'react'
import {Link} from 'react-router-dom'

import './NotFound.css'

/**
 * React functional component for rendering a "Not Found" page.
 * @function
 * @returns {JSX.Element} A JSX Element representing the "Not Found" page.
 */
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