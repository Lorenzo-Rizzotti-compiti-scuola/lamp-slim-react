import './App.css';
import Alunno from './Alunno';
import {useState, useEffect} from 'react';

function App() {

  useEffect(() => {
    caricaAlunni();
  }, []);
  
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);

  async function caricaAlunni(){
    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const nuovoArray = await response.json();
    setAlunni(nuovoArray);
    setLoading(false);
  }

  return (
    <div className="App">
        {
          loading ?
            <div>in caricamento...</div>
          :
            alunni.map(a => (
              <Alunno alunno={a} caricaAlunni={caricaAlunni} key={a.id}/>
            ))
        }

    </div>

  );
}

export default App;
