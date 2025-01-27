import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './pages/Data.tsx';

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Data />} />
      </Routes>
    </Router>
  );
};

export default App;
