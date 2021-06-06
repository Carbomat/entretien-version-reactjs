import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import Header from './Components/Header/Header';
import Editable from './Components/Table/table';

function App() {
  return (
    <div >
     <Header />
     <Editable />
    </div>
  );
}

export default App;
