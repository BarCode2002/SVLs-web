import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './pages/Data.tsx';
import Dashboard from './pages/Dashboard.tsx';

const App = (): JSX.Element => {

  localStorage.setItem('filterSVLs', '0');
  localStorage.setItem('VIN', '');

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/data/:svl_pk?' element={<Data />} />
      </Routes>
    </Router>
  );
};

export default App;
