import React, {Fragment, useEffect, useState} from "react";
import './XZReport.css'
import Axios from 'axios';

/**
 * Displays the X Report.
 * @namespace Xreport
 * @components
 */
export const Xreport = () => {
  const [xreport, setXreport] = useState("please run an Xreport")

  /**
   * Retrieves X report from server and sets its state.
   * @function
   * @memberof Xreport
   * @returns {void}
   */
  const getXreport = () => {
    Axios.get('https://project3-alpha.onrender.com/a/b/c/d/xreport/insert')
      .then((response) => {
          console.log(response.data.sum)
          setXreport(response.data.sum)
          
      })
      .catch(() => {
          console.log('error')
      })

  }

  const handleSubmit = () => {
    getXreport();
  }


  return (
    <Fragment>
      <div className="text-center">
        <h1 className="xreport-header">Xreport</h1>
        <h3>Current Order Totals</h3>
        <p>{xreport}</p>
        <button className="btn btn-primary" onClick={handleSubmit} >
          Generate Xreport
        </button>
      </div>
      
    </Fragment>
  )
}
