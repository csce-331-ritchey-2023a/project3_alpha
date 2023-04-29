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
      <div className = "container">
        <GoogleTranslate />
        <Link to="/" className="link-style">               
          <h3>Logout</h3>            
        </Link>
        <AddUpdateProducts />
        <ListTables />
        <SalesReport />
        <RestockReport />
        <ExcessReport /> 

        <XZReport />
        <Xreport />

      </div>
    </Fragment>
    
  )
}

export default ManagerScreen