import logo from './logo.svg';
import './App.css';
import Demineur from './components/Demineur'
import DemineurSquare from './components/DemineurSquare'

function App() {
  return (
    <div className="App">

      <Demineur  width={15}  nmbBomb={20}   />
    </div>
  );
}


export default App;