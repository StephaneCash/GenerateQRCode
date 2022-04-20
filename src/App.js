import './App.css';
import * as React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import MainContent from './components/MainContent';

function App() {

  return ( 
    <>
      <NavBar />
      <div className="container mt-3"> 
        <MainContent />
      </div> 
    </> 
  );
}

export default App;
