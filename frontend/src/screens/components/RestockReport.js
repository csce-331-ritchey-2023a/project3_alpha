import React, { Fragment, useState } from "react";


/**
 * Displays the Restock Report.
 * @namespace RestockReport
 * @component 
 */
const RestockReport = () => {
  const [toppingData, setToppingData] = useState([]);
  const [cheeseData, setCheeseData] = useState([]);
  const [drizzleData, setDrizzleData] = useState([]);
  const [sauceData, setSauceData] = useState([]);

  /**
   * Fetches data for all tables from the server and sets states for each data type.
   * @function
   * @memberof RestockReport
   * @async
   * @returns {void}
   */
  const handleSubmit = async () => {
    const topping_response = await fetch(`https://project3-alpha.onrender.com/toppings`);
    const cheese_response = await fetch(`https://project3-alpha.onrender.com/cheeses`);
    const drizzle_response = await fetch(`https://project3-alpha.onrender.com/drizzles`);
    const sauce_response = await fetch(`https://project3-alpha.onrender.com/sauces`);
    const topping_data = await topping_response.json();
    const cheese_data = await cheese_response.json();
    const drizzle_data = await drizzle_response.json();
    const sauce_data = await sauce_response.json();
    setToppingData(topping_data);
    setCheeseData(cheese_data);
    setDrizzleData(drizzle_data);
    setSauceData(sauce_data);
  };

  /**
   * Counts the inventory of all tables within the database.
   * @returns {Object} An object with keys for each type of inventory and their respective IDs, amounts, and recommended restocking amount.
   */
  const countInventory = () => {
    let toppingRecommendation = 90;
    let cheeseRecommendation = 125;
    let drizzleRecommendation = 95;
    let sauceRecommendation = 90;
    const toppingID = [];
    const toppingCurrAmount = [];
    const cheeseID = [];
    const cheeseCurrAmount = [];
    const drizzleID = [];
    const drizzleCurrAmount = [];
    const sauceID = [];
    const sauceCurrAmount = [];
    toppingData.forEach((topping) => {
      if (topping.amount < toppingRecommendation) {
        toppingID.push(topping.topping_id);
        toppingCurrAmount.push(topping.amount);
      } 
    });
    cheeseData.forEach((cheese) => {
        if (cheese.amount < cheeseRecommendation) {
            cheeseID.push(cheese.cheeseid);
            cheeseCurrAmount.push(cheese.amount);
        } 
      });
    drizzleData.forEach((drizzle) => {
        if (drizzle.amount < drizzleRecommendation) {
            drizzleID.push(drizzle.drizzleid);
            drizzleCurrAmount.push(drizzle.amount);
        } 
      });
    sauceData.forEach((sauce) => {
        if (sauce.amount < sauceRecommendation) {
            sauceID.push(sauce.sauceid);
            sauceCurrAmount.push(sauce.amount);
        } 
      });
    return {topping_id: toppingID, topping_amount: toppingCurrAmount, restock_toppings: toppingRecommendation, cheese_id: cheeseID, cheese_amount: cheeseCurrAmount, restock_cheeses: cheeseRecommendation, drizzle_id: drizzleID, drizzle_amount: drizzleCurrAmount, restock_drizzles: drizzleRecommendation,sauce_id: sauceID, sauce_amount: sauceCurrAmount, restock_sauces: sauceRecommendation };
  };
  const pizzaCount = countInventory();

  return (
    <Fragment>
      <div className="text-center">
        <h3 className="text-center">Restock Report</h3>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Generate Restock Report
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Items to Restock</th>
            <th>Current Amount</th>
            <th>Recommended Amount</th>
          </tr>
        </thead>
        <tbody>
          {pizzaCount.topping_id.map(({toppings}) =>(
          <tr key={pizzaCount.topping_id}>
            <td>{pizzaCount.topping_id}</td>
            <td>{pizzaCount.topping_amount}</td>
            <td>{pizzaCount.restock_toppings}</td>
          </tr>))}
          </tbody>
          <tbody>
          {pizzaCount.cheese_id.map(cheeses =>(
          <tr key={pizzaCount.cheese_id}>
            <td>{pizzaCount.cheese_id}</td>
            <td>{pizzaCount.cheese_amount}</td>
            <td>{pizzaCount.restock_cheeses}</td>
          </tr>))}
          </tbody>
          <tbody>
          {pizzaCount.drizzle_id.map(drizzles =>(
          <tr key={pizzaCount.drizzle_id}>
            <td>{pizzaCount.drizzle_id}</td>
            <td>{pizzaCount.drizzle_amount}</td>
            <td>{pizzaCount.restock_drizzles}</td>
          </tr>))}
          </tbody>
          <tbody>
          {pizzaCount.sauce_id.map(sauces =>(
          <tr key={pizzaCount.sauce_id}>
            <td>{pizzaCount.sauce_id}</td>
            <td>{pizzaCount.sauce_amount}</td>
            <td>{pizzaCount.restock_sauces}</td>
          </tr>))}
          </tbody>
      </table>
    </Fragment>
  );
};

export default RestockReport;
