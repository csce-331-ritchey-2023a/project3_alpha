import React, {Fragment} from 'react'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";
import SalesReport from "./components/SalesReport";
import RestockReport from "./components/RestockReport";
import ExcessReport from './components/ExcessReport';


const ManagerScreen = () => {
  return (   
    <Fragment>
      <div className = "container">
        <ListTables />
        <SalesReport />
        <RestockReport />
        <ExcessReport /> 
      </div>
    </Fragment>
    
  )
}

export default ManagerScreen