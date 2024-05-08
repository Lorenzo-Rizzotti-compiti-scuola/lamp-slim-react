import {useState} from 'react';

export default function Alunno({alunno, gestisciClick}){

    const [inConferma, setInConferma] = useState(false);
    const [eliminazione, setEliminazione] = useState(false);

    async function eliminaAlunno(){
        setEliminazione(true);
        const response = await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        setEliminazione(true);
        gestisciClick();
    }

    function richiedeConferma(){
        setInConferma(true);
    }
    function annullaConferma(){
        setInConferma(false);
    }

    return(
        <div>Sono l'alunno {alunno.id} {alunno.nome} {alunno.cognome}
            {eliminazione ?
                <span> - Eliminazione in corso...</span>
            :
            (
                inConferma ?
                    <> - sei sicuro?
                        <button onClick={eliminaAlunno}>Si</button>
                        <button onClick={annullaConferma}>No</button>
                    </>
                :
                    <button onClick={richiedeConferma}>
                        Elimina
                    </button>

            )    
            }
            <hr />
        </div>
    )
}