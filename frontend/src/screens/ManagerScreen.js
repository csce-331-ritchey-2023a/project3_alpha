import React, {Fragment} from 'react'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";
import SalesReport from "./components/SalesReport";
import RestockReport from "./components/RestockReport";


const ManagerScreen = () => {
  return (   
    <Fragment>
      <div className = "container">
        <ListTables />
        <SalesReport />
        <RestockReport /> 
      </div>
    </Fragment>
    
  )
}

export default ManagerScreen