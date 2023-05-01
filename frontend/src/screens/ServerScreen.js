import React, {useEffect, useState} from 'react'
import './ServerScreen.css'
import {Link} from 'react-router-dom'
import GoogleTranslate from './components/GoogleTranslate'

const ServerScreen = () => {
  const [toppings, set_toppings] = useState([]);
  const [cheeses, set_cheeses] = useState([]);
  const [sauces, set_sauces] = useState([]);
  const [drizzles, set_drizzles] = useState([]);
  const [price, set_price] = useState(0);

  const [order, set_order] = useState({
    "pizza-type": "",
    "topping1": "", // Use this to handle multiple: https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react
    "topping2": "",
    "topping3": "",
    "topping4": "",
    "sauce": "",
    "cheese": "",
    "drizzle": "",
    "payment-method":""
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
    if (order['pizza-type'] === 'cheese'){
      set_price(6.45);
    }
    else if (order['pizza-type'] === '1-topping'){
      set_price(7.49);
    }
    else if (order['pizza-type'] === '4-topping'){
      set_price(8.85);
    }
  },[order['pizza-type']]);

  useEffect(() => {
    set_order({...order, "topping1":"", "topping2":"", "topping3":"", "topping4":""})

  }, [order['pizza-type']])

  const setOrderDetails = (name, value) => {
    set_order({...order, [name]: value})
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
      <Link to="/">               
          <h3>Logout</h3>            
      </Link>
    
      <div className="server-overflow container">
        
        <img src="spinnstone_logo.png" className="Spin-n-stone-logo" alt="logo"/>
        <h1>Welcome to the Server screen!</h1>
        <GoogleTranslate />
            <label htmlFor="pizza-type">Pizza Type</label>
            <br />
            <select 
              name="pizza-type" 
              id="server_buttons" multiple
              value={order["pizza-type"]}
              onChange={e => setOrderDetails("pizza-type", e.target.value)} >
              <option value="cheese">Cheese - $6.45</option>
              <option value="1-topping">1 Topping - $7.49</option>
              <option value="4-topping">4 Topping - $8.85</option>
            </select>
            <br />

            <label htmlFor="sauces">Sauce</label> <br />
            <select name="sauces" id="server_buttons" multiple value={order.sauce} onChange={e => setOrderDetails("sauce", e.target.value)}>
              {
                sauces.map(sauce => (
                  <option value={sauce.sauceid} key={sauce.sauceid}>{sauce.sauceid}</option>
                ))
              }
            </select>
            <br />
            
            <label htmlFor="cheeses">Cheese:</label> <br />
            <select name="cheeses" id="server_buttons" multiple value={order.cheese} onChange={e => setOrderDetails("cheese", e.target.value)}>
              {
                cheeses.map(cheese => (
                  <option value={cheese.cheeseid} key={cheese.cheeseid}>{cheese.cheeseid}</option>
                ))
              }
            </select>
            <br />

            <label htmlFor="drizzles">Drizzle:</label> <br />
            <select name="drizzles" id="server_buttons" multiple value={order.drizzle} onChange={e => setOrderDetails("drizzle", e.target.value)}>
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
                  <label htmlFor="toppings">Topping:</label> <br />
                  <select name="toppings" id="server_buttons" multiple value={order.topping1} onChange={e => setOrderDetails("topping1", e.target.value)}>
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
                  <label htmlFor="toppings">Topping:</label> <br />
                  <select name="toppings" id="server_buttons" multiple value={order.topping2} onChange={e => setOrderDetails("topping2", e.target.value)}>
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
                  <label htmlFor="toppings">Topping:</label> <br />
                  <select name="toppings" id="server_buttons" multiple value={order.topping3} onChange={e => setOrderDetails("topping3", e.target.value)}>
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
                  <label htmlFor="toppings">Topping:</label> <br />
                  <select name="toppings" id="server_buttons" multiple value={order.topping4} onChange={e => setOrderDetails("topping4", e.target.value)}>
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
            <ul>
              <div>Price: ${price}</div>
            </ul>
            <label htmlFor="payment-method">Payment Method</label> <br />
            <select name="payment-method" id="server_buttons" multiple value={order["payment-method"]}
              onChange={e => setOrderDetails("payment-method", e.target.value)} >
              <option value="Dining Dollars">Dining Dollars</option>
              <option value="Retail Swipe">Retail Swipe</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <br /> <br />
            <button onClick={submitOrder}>Submit customer order</button>
      </div>
    </div>
  )
}

export default ServerScreen