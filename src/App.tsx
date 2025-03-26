import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './pages/Data.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Help from './pages/Help.tsx';

const App = (): JSX.Element => {

  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/help/:language' element={<Help />} />
        <Route path='/data/:svl_pk?' element={<Data />} />
      </Routes>
    </Router>
  );
};

export default App;
