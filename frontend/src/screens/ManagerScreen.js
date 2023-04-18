import React, {Fragment} from 'react'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";
import SalesReport from "./components/SalesReport";
import RestockReport from "./components/RestockReport";

import { XZReport } from './components/XZReport';
import { Xreport } from './components/Xreport';


const ManagerScreen = () => {
  return (   
    <Fragment>
      <div className = "container">
        <ListTables />
        <SalesReport />
        <RestockReport /> 

        <XZReport />
        <Xreport />

      </div>
    </Fragment>
    
  )
}

export default ManagerScreen