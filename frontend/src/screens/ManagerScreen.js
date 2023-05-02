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

/**
 * A React component that displays the Manager screen with various reports and options
 * @namespace ManagerScreen
 * @component 
 */
const ManagerScreen = () => {
  return (  
    <Fragment>
      <div className="pg-color manager-screen">
        <Link to="/" className="logout-style">               
          <h3>Logout</h3>            
        </Link>
        <img src="https://api.dineoncampus.com/files/images/cf0c18dd-4956-4c89-9e39-f27663fb4efb.png" className="Spin-n-stone-logo-manager" alt="logo"/>
        <div className="link-container mx-auto">
          <Link to="/sales-report" className="manager-link-style">
            <h3>Sales Report</h3>
          </Link>

          <Link to="/restock-report" className="manager-link-style">
            <h3>Restock Report</h3>
          </Link>

          <Link to="/excess-report" className="manager-link-style">
            <h3>Excess Report</h3>
          </Link>

          <Link to="/z-report" className="manager-link-style">
            <h3>Z Report</h3>
          </Link>

          <Link to="/x-report" className="manager-link-style">
            <h3>X Report</h3>
          </Link>

        </div>
        <div className="container mt-3">
          <GoogleTranslate />
          <AddUpdateProducts />
          <ListTables />
        </div>

      </div>
    </Fragment>
    
  )
}

export default ManagerScreen