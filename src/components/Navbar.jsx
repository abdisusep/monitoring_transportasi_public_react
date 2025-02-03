import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LineChart from '../pages/LineChart';
import BarChart from '../pages/BarChart';
import Card from '../pages/Card';

export default function Navbar() {
    return (
        <>
            <Router>
                  <div className="p-4">
                    <nav className="mb-4">
                      <Link className="mr-4 text-blue-500 hover:underline" to="/">Line Chart</Link>
                      <Link className="mr-4 text-blue-500 hover:underline" to="/bar">Bar Chart</Link>
                      <Link className="text-blue-500 hover:underline" to="/card">Card</Link>
                    </nav>
                    <Routes>
                      <Route path="/" element={<LineChart />} />
                      <Route path="/bar" element={<BarChart />} />
                      <Route path="/card" element={<Card />} />
                    </Routes>
                  </div>
            </Router>
        </>
    )
}