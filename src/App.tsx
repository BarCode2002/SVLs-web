import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './pages/Data.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Help from './pages/Help.tsx';
import { useState } from 'react';

const App = (): JSX.Element => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === '') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/help' element={<Help />} />
          <Route path='/data/:svl_pk?' element={<Data />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
