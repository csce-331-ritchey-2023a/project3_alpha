import React, {Fragment} from 'react'
import './ManagerScreen.css'


//components
import ListTables from "./components/ListTables";


const ManagerScreen = () => {
  return (    
    <Fragment>
      <div className = "container">
        <ListTables />
      </div>
    </Fragment>
    
  )
}

export default ManagerScreen