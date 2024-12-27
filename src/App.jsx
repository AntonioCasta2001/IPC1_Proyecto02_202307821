import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App=()=>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path='/dashboard'element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </Router>
  );
}

export default App;