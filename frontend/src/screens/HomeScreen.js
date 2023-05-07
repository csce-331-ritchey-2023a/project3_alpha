import './HomeScreen.css'
import {Link} from 'react-router-dom'
import React from 'react'
import { useState, useEffect } from 'react';
import GoogleTranslate from './components/GoogleTranslate';
import jwt_decode from "jwt-decode";
import {Container, Row, Col} from "react-bootstrap";
import Weather from './components/Weather';

/**
 * Variable that indicates if the logged in user is a manager
 * @memberof HomeScreen
 * @type {boolean}
 */
export const manager = false;

/**
 * Variable that indicates if the logged in user is an employee
 * @memberof HomeScreen
 * @type {boolean}
 */
export const employee = false;


/**
 * Displays the home screen of the Spin N' Stonasite website
 * @component
 * @namespace HomeScreen
 */
const HomeScreen = () => {
  const [manager, setManager] = useState(false);
  const [employee, setEmployee] = useState(false);

  /**
   * A callback function that handles the response from the Google Sign-In API.
   * @memberof HomeScreen
   * @param {Object} response - The response object returned by the API.
   */
  function handleCallbackResponse(response) {
    //console.log("Encoded JWT token:"+ response.credential)
    var user = jwt_decode(response.credential)
    if (user.hd == "tamu.edu"){
      setManager(true);
      setEmployee(false);
    } if(user.email == "chasemalbright33@gmail.com" || "jjrummell321@gmail.com" || "buijeremy0@gmail.com" || "njferns020@gmail.com") {
      setEmployee(true);
      setManager(true);
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

  /**
   * Renders the home screen of the Spin N' Stonasite.
   * @memberof HomeScreen
   * @returns {JSX.Element} A JSX element that represents the home screen.
   */
  return (
    <div className="homescreen bg-img" style={{
      backgroundImage: "url(https://jooinn.com/images/dark-bricks-texture-5.jpg)",
      
    }}>

      <div id="header-container">
      <GoogleTranslate />
        <div id="sign-in-container">
          <div id="signInDiv"></div>
          
        </div>
        <div id="links-container">
          
          <Link to="/customer" className="link-style">               
            <h3>Start Your Order</h3>            
          </Link>
          {employee && (
            <Link to="/server" className="link-style">               
              <h3>Employees</h3>            
            </Link>
          )}
          {manager && (
            <Link to="/manager" className="link-style">               
              <h3>Managers</h3>            
            </Link>
          )}
        </div>
      </div>

      

      <Container fluid>
        <Row>
          <Col md={{ span: 4, offset: 3}}>
            <img src="https://i.ibb.co/LrJNtj1/white-spinnstone-logo.png" className="Spin-n-stone-logo-homescreen mx-auto" alt="logo"/>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4}}>
            <div className="homepage-address">
              Memorial Student Center, 275 Joe Routt Blvd, College Station, TX 77840
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4}}>
            <img src="https://cdn.jemediacorp.com/jemediacorp/uploads/2021/06/pizza-1-300x290.png" className="rotate-pizza" alt="Rotating Pizza" />
          </Col>
        </Row>
      </Container>
      
      <div>
        <Weather />
      </div>
      


    </div>
  )
}

export default HomeScreen
