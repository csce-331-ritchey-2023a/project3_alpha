import React, {Fragment,useEffect} from 'react'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";
import SalesReport from "./components/SalesReport";
import RestockReport from "./components/RestockReport";

import { XZReport } from './components/XZReport';
import ExcessReport from './components/ExcessReport';
import { Xreport } from './components/Xreport';
import GoogleTranslate from './components/GoogleTranslate';


const ManagerScreen = () => {
  return (   
    <Fragment>
      <div className = "container">
        <GoogleTranslate />


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