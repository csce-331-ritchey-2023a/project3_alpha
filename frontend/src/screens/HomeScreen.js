import './HomeScreen.css'
import {Link} from 'react-router-dom'

import React from 'react'

const HomeScreen = () => {
  return (
    <div>
        <h1>Welcome to the HomeScreen</h1>

          <Link to="/customer" className="link-style">               
            <h3>Go to customer page</h3>            
          </Link>
          <Link to="/server" className="link-style">               
            <h3>Go to server page</h3>            
          </Link>
          <Link to="/manager" className="link-style">               
            <h3>Go to manager page</h3>            
          </Link>

        
    </div>
  )
}

export default HomeScreen
