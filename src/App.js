import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import './App.css';
import Example from './pages/Example';
import Home from './pages/Home'

function App() {
  return (
    <>
    <div className="min-h-screen bg-red-900 text-green-500">
      <Snowfall/>
<div className="navbar">
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
      <li><Link to={'/'}>Homepage</Link></li>
      
      <li><Link to={'/example'}>Ranking List</Link></li>
    </ul>
  </div>
</div>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/example" element={ <Example/> } />
      </Routes>
    </div>
      <Outlet />
    </>
  );
}

export default App;
