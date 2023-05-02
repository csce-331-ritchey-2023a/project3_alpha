import React, {useEffect, useState} from 'react'
import './CustomerScreen.css'
import {Link} from 'react-router-dom'
import GoogleTranslate from './components/GoogleTranslate'


/**
 * Displays the Customer ordering screen for Spin N' Stonasite.
 * @namespace CustomerScreen
 * @component
 */
const CustomerScreen = () => {
  const [toppings, set_toppings] = useState([]);
  const [cheeses, set_cheeses] = useState([]);
  const [sauces, set_sauces] = useState([]);
  const [drizzles, set_drizzles] = useState([]);
  const [price, set_price] = useState(0);

  const [order, set_order] = useState({
    "pizza-type": "",
    "topping1": "",
    "topping2": "",
    "topping3": "",
    "topping4": "",
    "sauce": "",
    "cheese": "",
    "drizzle": "",
    "payment-method":""
  })

  /**
   * A function that handles receiving the list of toppings from the database.
   * @memberof CustomerScreen
   * @async
   * @function
   * @returns {Promise<void>} Resolved with no value when the list of toppings has been set in the state
   * 
   */
  const get_toppings = async () => {
      try{

          const response = await fetch("https://project3-alpha.onrender.com/toppings");
          const json_data = await response.json();

          //console.log(json_data)
          set_toppings(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  };

  /**
   * A function that handles receiving the list of cheeses from the database.
   * @memberof CustomerScreen
   * @async
   * @function
   * @returns {Promise<void>} Resolved with no value when the list of cheeses has been set in the state
   * 
   */
  const get_cheeses = async () => {
      try{

          const response = await fetch("https://project3-alpha.onrender.com/cheeses");
          const json_data = await response.json();

          //console.log(json_data)
          set_cheeses(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  }

  /**
   * A function that handles receiving the list of sauces from the database.
   * @memberof CustomerScreen
   * @async
   * @function
   * @returns {Promise<void>} Resolved with no value when the list of sauces has been set in the state
   * 
   */
  const get_sauces = async () => {
      try{

          const response = await fetch("https://project3-alpha.onrender.com/sauces");
          const json_data = await response.json();

          //console.log(json_data)
          set_sauces(json_data);
      }
      catch(err){
          console.error(err.message)
      }
  }

  /**
   * A function that handles receiving the list of drizzles from the database.
   * @memberof CustomerScreen
   * @async
   * @function
   * @returns {Promise<void>} Resolved with no value when the list of drizzles has been set in the state
   * 
   */
  const get_drizzles = async () => {
      try{

          const response = await fetch("https://project3-alpha.onrender.com/drizzles");
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

  /**
   * Sets the order details for an order.
   * @param {string} name The name of the order detail to be set.
   * @param {any} value The value to be set for the order detail.
   * @returns{void}
   */
  const setOrderDetails = (name, value) => {
    set_order({...order, [name]: value})
  }

  /**
   * Submits an order to the server.
   * @memberof CustomerScreen
   * @async
   * @function submitOrder
   * @returns {Promise<void>}
   * @throws {Error}If there is an error submitting the order.
   */
  const submitOrder = async () => {
    try {
      await fetch(`https://project3-alpha.onrender.com/transaction?` + new URLSearchParams({
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
    <div className="customer-background" style={{
      backgroundImage: "url(/black-brick-wall-texture.jpg)",
      
    }}>
      <Link to="/" className="link-style">               
            <h3>Return home</h3>            
      </Link>
      <img src="white_spinnstone_logo.png" className="Spin-n-stone-logo" alt="logo"/>
      <div className="d-flex justify-content-center">
        
        
        <div className="container-fluid mx-auto d-flex justify-content-center text-white">
          <div className="col-md-6 mt-2 mb-2">
            <h1>Welcome to Spin N' Stone!</h1> 
            <label htmlFor="pizza-type">Choose a pizza type:</label>
            <select 
              name="pizza-type" 
              id="pizza-type" 
              value={order["pizza-type"]}
              onChange={e => setOrderDetails("pizza-type", e.target.value)} >
              <option value="" disabled>Select your option</option>
              <option value="cheese">Cheese - $6.45</option>
              <option value="1-topping">1 Topping - $7.49</option>
              <option value="4-topping">4 Topping - $8.85</option>
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
            <br />

            {
              (order['pizza-type'] === "1-topping" || order['pizza-type'] === "4-topping") ? (
                <>
                  <label htmlFor="toppings">Choose a topping:</label>
                  <select name="toppings" id="toppings" value={order.topping1} onChange={e => setOrderDetails("topping1", e.target.value)}>
                  <option value="" disabled>Select your option</option>
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
                  <label htmlFor="toppings">Choose a topping:</label>
                  <select name="toppings" id="toppings" value={order.topping2} onChange={e => setOrderDetails("topping2", e.target.value)}>
                  <option value="" disabled>Select your option</option>
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
                  <label htmlFor="toppings">Choose a topping:</label>
                  <select name="toppings" id="toppings" value={order.topping3} onChange={e => setOrderDetails("topping3", e.target.value)}>
                  <option value="" disabled>Select your option</option>
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
                  <label htmlFor="toppings">Choose a topping:</label>
                  <select name="toppings" id="toppings" value={order.topping4} onChange={e => setOrderDetails("topping4", e.target.value)}>
                  <option value="" disabled>Select your option</option>
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

            <h4>Your order details</h4>
            <ul>
              {Object.values(order).filter(Boolean).map((e,i) => <li key={i}>{e}</li>)}
            </ul>
            <ul>
              <div>Price: ${price}</div>
            </ul>
            <label htmlFor="payment-method">Confirm Payment Method:</label>
            <select name="payment-method" id="payment-method" value={order["payment-method"]}
              onChange={e => setOrderDetails("payment-method", e.target.value)} >
              <option value="" disabled>Select customer option</option>
              <option value="Dining Dollars">Dining Dollars</option>
              <option value="Retail Swipe">Retail Swipe</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <br /> <br />
            <button class="btn btn-primary mt-2" onClick={submitOrder}>Submit your order</button>
          </div>
        </div>

        <img src="pizza.jpg" className="customer-pizza" alt="pizza image"/>
      </div>
    </div>
  )
}

export default CustomerScreen