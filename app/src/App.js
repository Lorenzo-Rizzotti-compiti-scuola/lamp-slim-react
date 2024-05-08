import './App.css';
import Alunno from './Alunno.js';
import FormDiInserimento from './FormDiInserimento.js';
import {useState} from 'react';

function App() {
  
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inserimento, setInserimento] = useState(false);


  async function caricaAlunni(){
    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const nuovoArray = await response.json();
    setAlunni(nuovoArray);
    setLoading(false);
  }

  async function gestisciClick(){
    setLoading(true);
    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const nuovoArray = await response.json();
    setAlunni(nuovoArray);
    setLoading(false);
  }

  function gestistiInserimentoClick(){
    setInserimento(true);
  }

  return (
    <div className="App">
        { alunni.length === 0 &&
          <button onClick={gestisciClick}>Carica alunni</button>
        }

        {
          loading ?
            <div>in caricamento...</div>
          :
            <>
              {
                alunni.map(a => (
                  <Alunno alunno={a} gestisciClick={gestisciClick} key={a.id}/>
                ))
             }
            </>
          
        }
        <div><button onClick={(gestistiInserimentoClick)}>Inserisci nuovo alunno</button></div>
        { inserimento &&
          <FormDiInserimento gestisciClick={gestisciClick} setInserimento={setInserimento} />
        }

    </div>

  );
}

export default App;
