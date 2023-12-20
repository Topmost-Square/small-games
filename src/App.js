import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GeoWars } from './pages/GeoWars';
import { Main } from './pages/Main';
import { Bouncing } from './pages/Bouncing';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/b" element={<Bouncing />} />
        <Route path="/g" element={<GeoWars />} />
      </Routes>
    </Router>
  );
}

export default App;
