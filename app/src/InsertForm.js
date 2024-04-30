import {useState, useEffect} from 'react';

export default function InsertForm({reFetchAlunni, alunno}){

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(alunno !== null){
      setNome(alunno.nome);
      setCognome(alunno.cognome);
    }
  }, [alunno]);

  function handleNomeChange(e){
    setNome(e.target.value);
  }

  function handleCognomeChange(e){
    setCognome(e.target.value);
  }

  async function handleSave(){
    setLoading(true);
    if (alunno === null){
      await fetch(`http://localhost:8080/alunni`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome: nome , cognome: cognome})
      })
    }else{
      await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome: nome , cognome: cognome})
      })
    }
    resetForm();
    reFetchAlunni();
    setLoading(false);
  
  }

  function resetForm(){
    setNome("");
    setCognome("");
  }
  
  return(
    <div>
      <div>Nome: 
        <input type="text" value={nome} onChange={handleNomeChange}  disabled={loading}/>
      </div>
      <div>Cognome:
        <input type="text" value={cognome} onChange={handleCognomeChange}  disabled={loading}/>
      </div>
      <button onClick={handleSave} disabled={loading}>Save</button>
    </div>
  );
}
