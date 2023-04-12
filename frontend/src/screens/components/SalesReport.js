import React, { Fragment, useState, useEffect } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    const formattedStartDate = startDate + " 00:00:00";
    const formattedEndDate = endDate + " 23:59:59";
    const response = await fetch(`/transactions/${formattedStartDate}/${formattedEndDate}`);
    const data = await response.json();
    setSalesData(data);
  };

  return (
    <Fragment>
      <div>
        <label>Start Date (YYYY-MM-DD): </label>
        <input
          type="text"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </div>
      <div>
        <label>End Date (YYYY-MM-DD): </label>
        <input
          type="text"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </div>
      <button onClick={handleSubmit}>Generate Report</button>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cheese Pizza</td>
            <td>{salesData.filter((item) => item.price === 10).length}</td>
          </tr>
          <tr>
            <td>One Topping Pizza</td>
            <td>{salesData.filter((item) => item.price === 12).length}</td>
          </tr>
          <tr>
            <td>Four Topping Pizza</td>
            <td>{salesData.filter((item) => item.price === 15).length}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default SalesReport;









