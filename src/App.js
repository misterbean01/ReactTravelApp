import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/HomeComponent'
import { Traveller } from './components/TravellerComponent'
import { Review } from './components/ReviewComponent'
import { Location } from './components/LocationComponent'
import { Navigation } from './components/NavigationComponent'


function App() {
  return (
    <Router>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Welcome to Travel App
        </h3>

        <Navigation />

        <Routes>
          <Route path='/location' element={<Location />} />
          <Route path='/traveller' element={<Traveller />} />
          <Route path='/location/:locId/review' element={<Review />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
