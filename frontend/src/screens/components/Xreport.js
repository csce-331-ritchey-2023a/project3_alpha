import React, {Fragment, useEffect, useState} from "react";
import './XZReport.css'
import Axios from 'axios';

export const Xreport = () => {
  const [xreport, setXreport] = useState("please run an Xreport")

  const getXreport = () => {
    Axios.get('http://localhost:5000/a/b/c/d/xreport/insert')
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
