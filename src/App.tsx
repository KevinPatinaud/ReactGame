import logo from './logo.svg';
import './App.css';
import Demineur from './components/Demineur'
import DemineurSquare from './components/DemineurSquare'

function App() {
  return (
    <div className="App">

      <Demineur/>
    </div>
  );
}

/*
      <DemineurSquare 
      index={1}
       boardWidth={5}
       haveBomb = {true}
       numberOfBombNext = {3}
       checkBomb= {() => {} }
      />
      */

export default App;