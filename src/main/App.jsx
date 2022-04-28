import React from 'react';
import consts from '../consts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit teste <code>src/App.jsx</code> and save to reload.
          {consts.API_URL}
        </p>
      </header>
      <button onClick={notify}>Notify!</button>
      
    </div>
  );
}

export default App;
