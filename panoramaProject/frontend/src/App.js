import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Individual from './pages/Individual'
import CoordinateGenerationPage from './pages/CoordinateGenerationPage';
import Favorites from './pages/Favorites'
import './styles.css'

function App() {
  return (

      <BrowserRouter basename="/panorama">  
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/individual/:lat/:lng" element={<Individual />} />
          <Route path="/generate" element={<CoordinateGenerationPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>  

    );
}

export default App;
