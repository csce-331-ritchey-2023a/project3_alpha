 import './App.css';

//import screens
import HomeScreen from './screens/HomeScreen';
import CustomerScreen from './screens/CustomerScreen';
import ManagerScreen from './screens/ManagerScreen';
import ServerScreen from './screens/ServerScreen';
import NotFound from './screens/NotFound';


// import components

// import libraries
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          { <Route path="/customer" element={<CustomerScreen/>}  /> }
          <Route path="/manager" element={<ManagerScreen/>} />
          <Route path="/server" element={<ServerScreen/>} />

          {<Route path="*" element={<NotFound/>}/>/* Any route that is not previously made will go to this error page */}
          
        </Routes>
      </main>

      {/* <Footer />  create reusable footer component?*/}

    </Router>
  );
}

export default App;
