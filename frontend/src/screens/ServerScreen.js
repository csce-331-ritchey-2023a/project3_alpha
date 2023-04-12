import React, {useEffect, useState} from 'react'
import './ServerScreen.css'
import {Link} from 'react-router-dom'

const ServerScreen = () => {
  const [toppings, set_toppings] = useState([]);
  const [cheeses, set_cheeses] = useState([]);
  const [sauces, set_sauces] = useState([]);
  const [drizzles, set_drizzles] = useState([]);

  const [order, set_order] = useState({
    "pizza-type": "",
    "topping1": "", // Use this to handle multiple: https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react
    "topping2": "",
    "topping3": "",
    "topping4": "",
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

  useEffect(() => {
    set_order({...order, "topping1":"", "topping2":"", "topping3":"", "topping4":""})

  }, [order['pizza-type']])

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
        topping1: order.topping1,
        topping2: order.topping2,
        topping3: order.topping3,
        topping4: order.topping4
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
        <h1>Welcome to the Server screen!</h1>
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
          <option value="" disabled>Select customer option</option>
          <option value="cheese">Cheese</option>
          <option value="1-topping">1 Topping</option>
          <option value="4-topping">4 Topping</option>
        </select>
        <br />

        <label htmlFor="sauces">Choose a sauce:</label>
        <select name="sauces" id="sauces" value={order.sauce} onChange={e => setOrderDetails("sauce", e.target.value)}>
          <option value="" disabled>Select customer option</option>
          {
            sauces.map(sauce => (
              <option value={sauce.sauceid} key={sauce.sauceid}>{sauce.sauceid}</option>
            ))
          }
        </select>
        <br />
        
        <label htmlFor="cheeses">Choose a cheese:</label>
        <select name="cheeses" id="cheese" value={order.cheese} onChange={e => setOrderDetails("cheese", e.target.value)}>
          <option value="" disabled>Select customer option</option>
          {
            cheeses.map(cheese => (
              <option value={cheese.cheeseid} key={cheese.cheeseid}>{cheese.cheeseid}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="drizzles">Choose a drizzle:</label>
        <select name="drizzles" id="drizzles" value={order.drizzle} onChange={e => setOrderDetails("drizzle", e.target.value)}>
          <option value="" disabled>Select customer option</option>
          {
            drizzles.map(drizzle => (
              <option value={drizzle.drizzleid} key={drizzle.drizzleid}>{drizzle.drizzleid}</option>
            ))
          }
        </select>
        <br />

        {
          (order['pizza-type'] === "1-topping" || order['pizza-type'] === "4-topping") ? (
            <>
              <label htmlFor="toppings">Select customer topping:</label>
              <select name="toppings" id="toppings" value={order.topping1} onChange={e => setOrderDetails("topping1", e.target.value)}>
              <option value="" disabled>Select customer option</option>
                {
                  toppings.map(topping => (
                    <option value={topping.topping_id} key={topping.topping_id}>{topping.topping_id}</option>
                  ))
                }
              </select>
              <br />
            </>
          ) : ''
        }
        {
          (order['pizza-type'] === "4-topping") ? (
            <>
              <label htmlFor="toppings">Select customer topping:</label>
              <select name="toppings" id="toppings" value={order.topping2} onChange={e => setOrderDetails("topping2", e.target.value)}>
              <option value="" disabled>Select customer option</option>
                {
                  toppings.map(topping => (
                    <option value={topping.topping_id} key={topping.topping_id}>{topping.topping_id}</option>
                  ))
                }
              </select>
              <br />
            </>
          ) : ''
        }
        {
          (order['pizza-type'] === "4-topping") ? (
            <>
              <label htmlFor="toppings">Choose customer topping:</label>
              <select name="toppings" id="toppings" value={order.topping3} onChange={e => setOrderDetails("topping3", e.target.value)}>
              <option value="" disabled>Select customer option</option>
                {
                  toppings.map(topping => (
                    <option value={topping.topping_id} key={topping.topping_id}>{topping.topping_id}</option>
                  ))
                }
              </select>
              <br />
            </>
          ) : ''
        }
        {
          (order['pizza-type'] === "4-topping") ? (
            <>
              <label htmlFor="toppings">Choose customer topping:</label>
              <select name="toppings" id="toppings" value={order.topping4} onChange={e => setOrderDetails("topping4", e.target.value)}>
              <option value="" disabled>Select customer option</option>
                {
                  toppings.map(topping => (
                    <option value={topping.topping_id} key={topping.topping_id}>{topping.topping_id}</option>
                  ))
                }
              </select>
              <br />
            </>
          ) : ''
        }
        <h4>Customer order details</h4>
        <ul>
          {Object.values(order).filter(Boolean).map((e,i) => <li key={i}>{e}</li>)}
        </ul>

        <button onClick={submitOrder}>Submit customer order</button>
    </div>
  )
}

export default ServerScreen