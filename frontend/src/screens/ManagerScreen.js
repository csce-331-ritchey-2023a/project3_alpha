import React, {Fragment} from 'react'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";
import SalesReport from "./components/SalesReport";


const ManagerScreen = () => {
  return (    
    <Fragment>
      <div className = "container">
        <SalesReport />
      </div>
    </Fragment>
    
  )
}

export default ManagerScreen