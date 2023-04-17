import React, { Fragment, useState } from "react";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salesData, setSalesData] = useState([]);

  const handleSubmit = async () => {
    const formattedStartDate = startDate + " 00:00:00";
    const formattedEndDate = endDate + " 23:59:59";
    const response = await fetch(`http://localhost:5000/transactions/:${formattedStartDate}/:${formattedEndDate}`);
    const data = await response.json();
    setSalesData(data);
  };

  const countPizzas = () => {
    let cheeseCount = 0;
    let cheesePrice = 0.0;
    let oneToppingCount = 0;
    let oneToppingPrice = 0.0;
    let fourToppingCount = 0;
    let fourToppingprice = 0.0;

    salesData.forEach((transaction) => {
      if (transaction.price === "6.45") {
        cheeseCount++;
        cheesePrice+= 6.45;
      } else if (transaction.price === "7.49") {
        oneToppingCount++;
        oneToppingPrice+= 7.49;
      } else if (transaction.price === "8.85") {
        fourToppingCount++;
        fourToppingprice+= 8.85;
      }
    });

    return { cheese: cheeseCount, oneTopping: oneToppingCount, fourTopping: fourToppingCount };
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
          </tr>
          <tr>
            <td>One Topping</td>
            <td>{pizzaCount.oneTopping}</td>
          </tr>
          <tr>
            <td>Four Topping</td>
            <td>{pizzaCount.fourTopping}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default SalesReport;










