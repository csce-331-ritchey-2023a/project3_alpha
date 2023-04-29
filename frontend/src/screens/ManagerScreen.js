import React, {Fragment,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";
import SalesReport from "./components/SalesReport";
import RestockReport from "./components/RestockReport";

import { XZReport } from './components/XZReport';
import ExcessReport from './components/ExcessReport';
import { Xreport } from './components/Xreport';
import GoogleTranslate from './components/GoogleTranslate';
import { AddUpdateProducts } from './components/UpdateManager';

const ManagerScreen = () => {
  return (  
    <Fragment>
      <div className="pg-color">
        <Link to="/" className="logout-style">               
          <h3>Logout</h3>            
        </Link>
        <img src="spinnstone_logo.png" className="Spin-n-stone-logo" alt="logo"/>
        <div className="link-container">
          <Link to="/sales-report" className="manager-link-style">
            <h3>Sales Report</h3>
          </Link>

          <Link to="/restock-report" className="manager-link-style">
            <h3>Restock Report</h3>
          </Link>

          <Link to="/excess-report" className="manager-link-style">
            <h3>Excess Report</h3>
          </Link>
        </div>
        <div className="container">
          <GoogleTranslate />
          <AddUpdateProducts />
          <ListTables />
          <XZReport />
          <Xreport />
        </div>

      </div>
    </Fragment>
    
  )
}

export default ManagerScreen