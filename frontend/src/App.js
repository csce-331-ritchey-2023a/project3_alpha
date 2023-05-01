 import './App.css';

//import screens
import HomeScreen from './screens/HomeScreen';
import CustomerScreen from './screens/CustomerScreen';
import ManagerScreen from './screens/ManagerScreen';
import ServerScreen from './screens/ServerScreen';
import NotFound from './screens/NotFound';

import SalesReport from "./screens/components/SalesReport";
import RestockReport from "./screens/components/RestockReport";

import { XZReport } from './screens/components/XZReport';
import ExcessReport from './screens/components/ExcessReport';
import { Xreport } from './screens/components/Xreport';
import { AddUpdateProducts } from './screens/components/UpdateManager';

// import components

// import libraries
import { useEffect } from 'react';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {




  return (
    <Router>

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          { <Route path="/customer" element={<CustomerScreen/>}  /> }
          <Route path="/manager" element={<ManagerScreen/>} />
          <Route path="/server" element={<ServerScreen />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/restock-report" element={<RestockReport />} />
          <Route path="/excess-report" element={<ExcessReport />} />
          <Route path="/z-report" element={<XZReport />}/>
          <Route path="/x-report" element={<Xreport/>}/>

          {<Route path="*" element={<NotFound/>}/>/* Any route that is not previously made will go to this error page */}

          
        </Routes>
      </main>

      {/* <Footer />  create reusable footer component?*/}

    </Router>
  );
}

export default App;
