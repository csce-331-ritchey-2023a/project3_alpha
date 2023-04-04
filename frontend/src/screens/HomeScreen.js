import './HomeScreen.css'
import {Link} from 'react-router-dom'

import React from 'react'

const HomeScreen = () => {
  return (
    <div>
        <h1>Welcome to Spin N' Stone!</h1>

          <Link to="/customer" className="link-style">               
            <h3>Explore Customer Menu </h3>            
          </Link>
          <Link to="/server" className="link-style">               
            <h3>Server Order Registration</h3>            
          </Link>
          <Link to="/manager" className="link-style">               
            <h3>Manager Inventory Check</h3>            
          </Link>

        
    </div>
  )
}

export default HomeScreen
