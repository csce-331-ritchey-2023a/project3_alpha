import React, {useEffect, useState} from 'react'
import './CustomerScreen.css'
import {Link} from 'react-router-dom'

const CustomerScreen = () => {
  const [toppings, set_toppings] = useState([]);
  const [cheeses, set_cheeses] = useState([]);
  const [sauces, set_sauces] = useState([]);
  const [drizzles, set_drizzles] = useState([]);

  const [order, set_order] = useState({
    "pizza-type": "",
    "toppings": "", // Use this to handle multiple: https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react
    "sauce": "",
    "cheese": "",
    "drizzle": ""
  })

  const get_toppings = async () => {
      try{

          const response = await fetch("http://localhost:5000/toppings");
          const json_data = await response.json();

          //console.log(json_data)
          set_toppings(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  };

  const get_cheeses = async () => {
      try{

          const response = await fetch("http://localhost:5000/cheeses");
          const json_data = await response.json();

          //console.log(json_data)
          set_cheeses(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  }

  const get_sauces = async () => {
      try{

          const response = await fetch("http://localhost:5000/sauces");
          const json_data = await response.json();

          //console.log(json_data)
          set_sauces(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  }

  const get_drizzles = async () => {
      try{

          const response = await fetch("http://localhost:5000/drizzles");
          const json_data = await response.json();

          //console.log(json_data)
          set_drizzles(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  }

  useEffect(() => {
    get_toppings();
    get_cheeses();
    get_sauces();
    get_drizzles();
},[]);

  const setOrderDetails = (name, value) => {
    set_order({...order, [name]: value})
    console.log(order)
  }

  const submitOrder = async () => {
    try {
      await fetch(`http://localhost:5000/transaction?` + new URLSearchParams({
        "pizza-type": order["pizza-type"],
        sauce: order.sauce,
        cheese: order.cheese ,
        drizzle: order.drizzle,
        topping1: order.toppings,
        topping2: null,
        topping3: null,
        topping4: null
      }), {
        method: "POST"
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
        <h1>Welcome to the customer screen!</h1>
        <Link to="/" className="link-style">               
          <h3>Return home</h3>            
        </Link>
        <Link to="/manager" className="link-style">               
          <h3>Go to manager page</h3>            
        </Link>

        <label htmlFor="pizza-type">Choose a pizza type:</label>
        <select 
          name="pizza-type" 
          id="pizza-type" 
          value={order["pizza-type"]}
          onChange={e => setOrderDetails("pizza-type", e.target.value)} >
          <option value="" disabled>Select your option</option>
          <option value="cheese">Cheese</option>
          <option value="1-topping">1 Topping</option>
          <option value="4-topping">4 Topping</option>
        </select>
        <br />

        <label htmlFor="toppings">Choose a topping:</label>
        <select name="toppings" id="toppings" value={order.toppings} onChange={e => setOrderDetails("toppings", e.target.value)}>
        <option value="" disabled>Select your option</option>
          {
            toppings.map(topping => (
              <option value={topping.topping_id} key={topping.topping_id}>{topping.topping_id}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="sauces">Choose a sauce:</label>
        <select name="sauces" id="sauces" value={order.sauce} onChange={e => setOrderDetails("sauce", e.target.value)}>
          <option value="" disabled>Select your option</option>
          {
            sauces.map(sauce => (
              <option value={sauce.sauceid} key={sauce.sauceid}>{sauce.sauceid}</option>
            ))
          }
        </select>
        <br />
        
        <label htmlFor="cheeses">Choose a cheese:</label>
        <select name="cheeses" id="cheese" value={order.cheese} onChange={e => setOrderDetails("cheese", e.target.value)}>
          <option value="" disabled>Select your option</option>
          {
            cheeses.map(cheese => (
              <option value={cheese.cheeseid} key={cheese.cheeseid}>{cheese.cheeseid}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="drizzles">Choose a drizzle:</label>
        <select name="drizzles" id="drizzles" value={order.drizzle} onChange={e => setOrderDetails("drizzle", e.target.value)}>
          <option value="" disabled>Select your option</option>
          {
            drizzles.map(drizzle => (
              <option value={drizzle.drizzleid} key={drizzle.drizzleid}>{drizzle.drizzleid}</option>
            ))
          }
        </select>

        <h4>Your order details</h4>
        <ul>
          {Object.values(order).filter(Boolean).map((e,i) => <li key={i}>{e}</li>)}
        </ul>

        <button onClick={submitOrder}>Submit your order</button>
    </div>
  )
}

export default CustomerScreen