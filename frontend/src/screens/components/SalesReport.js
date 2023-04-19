import React, { Fragment, useState } from "react";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salesData, setSalesData] = useState([]);

  const handleSubmit = async () => {
    const formattedStartDate = startDate + " 00:00:00";
    const formattedEndDate = endDate + " 23:59:59";
    const response = await fetch(`https://project3-alpha.onrender.com/transactions/:${formattedStartDate}/:${formattedEndDate}`);
    const data = await response.json();
    setSalesData(data);
  };

  const countPizzas = () => {
    let cheeseCount = 0;
    let cheesePrice = 0.0;
    let oneToppingCount = 0;
    let oneToppingPrice = 0.0;
    let fourToppingCount = 0;
    let fourToppingPrice = 0.0;

    salesData.forEach((transaction) => {
      if (transaction.price === "6.45") {
        cheeseCount++;
        cheesePrice+= 6.45;
      } else if (transaction.price === "7.49") {
        oneToppingCount++;
        oneToppingPrice+= 7.49;
      } else if (transaction.price === "8.85") {
        fourToppingCount++;
        fourToppingPrice+= 8.85;
      }
    });

    return { cheese: cheeseCount, cheese_price: cheesePrice, oneTopping: oneToppingCount, oneTopping_price: oneToppingPrice, fourTopping: fourToppingCount, fourTopping_price: fourToppingPrice};
  };

  const pizzaCount = countPizzas();

  return (
    <Fragment>
      <label>
        Start Date:
        <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Generate Report
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Pizza Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cheese</td>
            <td>{pizzaCount.cheese}</td>
            <td>${pizzaCount.cheese_price.toFixed(2)}</td>
          </tr>
          <tr>
            <td>One Topping</td>
            <td>{pizzaCount.oneTopping}</td>
            <td>${pizzaCount.oneTopping_price.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Four Topping</td>
            <td>{pizzaCount.fourTopping}</td>
            <td>${pizzaCount.fourTopping_price.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default SalesReport;










