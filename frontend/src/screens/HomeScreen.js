import './HomeScreen.css'
import {Link} from 'react-router-dom'

import React from 'react'
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const [manager, setManager] = useState(false);
  const [employee, setEmployee] = useState(false);

  function handleCallbackResponse(response) {
    //console.log("Encoded JWT token:"+ response.credential)
    var user = jwt_decode(response.credential)
    console.log(user)
    console.log(user.hd)
    if (user.hd == "tamu.edu"){
      setManager(true);
      setEmployee(false);
    } if(user.email == "chasemalbright33@gmail.com" || user.email == "buijeremy0@gmail.com") {
      setEmployee(true);
      setManager(false);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "245360752945-o4k6f4ck5ethcv2sbjn74dgbaud6nndt.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )

  }, []);


  return (
    <div>
        <h1>Welcome to Spin N' Stone!</h1>

          <div id="signInDiv"></div>

          <Link to="/customer" className="link-style">               
            <h3>Go to customer page</h3>            
          </Link>
          {employee && (
            <Link to="/server" className="link-style">               
              <h3>Go to server page</h3>            
            </Link>
          )}
          


          {manager && (
            <Link to="/manager" className="link-style">               
              <h3>Go to manager page</h3>            
            </Link>
          )}

        
    </div>
  )
}

export default HomeScreen
