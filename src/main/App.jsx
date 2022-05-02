import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


import Header from '../common/Header';
import SpellsList from '../spells/SpellsList';
import Spell from '../spells/Spell';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path='/spell' element={<Spell />}>
              <Route path='view/:id' element={<Spell />} />
              <Route path='edit/:id' element={<Spell />} />
              <Route path='create' element={<Spell />} />
            </Route>
            <Route path='/'  element={<SpellsList />} />
          </Routes>
        </Router>      
      </div>
    );
  }
}

export default App;
