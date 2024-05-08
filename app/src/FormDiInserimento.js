import {useState} from 'react';


export default function FormDiInserimento({gestisciClick, setInserimento}) {
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
   
    async function salvaAlunno(){
        const response = await fetch("http://localhost:8080/alunni", 
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nome: nome, cognome: cognome})
        });
        gestisciClick();

        setInserimento(false);
    }

    function gestisciNome(e){
        setNome(e.target.value);
    }
    
    function gestisciCogome(e){
        setCognome(e.target.value);
    }
    return(
        <div>
            <h1>Inserimento nuovo alunno</h1>
            <div>
                <div>
                    Nome: <input type="text" placeholder="Inserisci il nome" value={nome} onChange={gestisciNome}></input>
                </div>
                <div>
                    Cognome: <input type="text" placeholder="Inserisci il cognome" value={cognome} onInput={gestisciCogome}></input>
                </div>
                <div>
                    <button onClick={salvaAlunno}>Salva</button>
                </div>
                {nome}
                <br />
                {cognome}
            </div>
        </div>
    )
}
