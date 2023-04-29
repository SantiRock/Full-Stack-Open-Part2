import Navbar from './NavbarElements/Navbar'
import { HashRouter as Router, Routes, Route}
    from 'react-router-dom';
import Courseinfo from "./pages/courseinfo";
import Phonebook from './pages/phonebook';
import Countries from './pages/countries';

function App() {
  return (
    <Router>
    <Navbar />
        <Routes>
          <Route exact path='/' element={<Courseinfo />} />
          <Route path='/courseinfo' element={<Courseinfo />} />
          <Route path='/phonebook' element={<Phonebook />} />
          <Route path='/countries' element={<Countries />} />
        </Routes>
    </Router> 
  )
}

export default App;
