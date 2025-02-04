import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LineChart from './pages/LineChart';
import BarChart from './pages/BarChart';
import Card from './pages/Card';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="my-16">
        <Routes>
          <Route path="/" element={<LineChart />} />
          <Route path="/bar" element={<BarChart />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
}
