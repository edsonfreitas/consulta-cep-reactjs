import {useState, useRef} from 'react'
import './App.css';
import { Carregando } from './Pages/Carregando';
import { Error } from './Pages/Error';
import { Resultados } from './Pages/Resultados';
import  { Home }  from './Pages/Home';


function App() {
  const [nomeTela, setNomeTela] = useState("Home");
  const [resultado, setResultado] = useState({}); 
  const [errorMessage, setErrorMessage] = useState("");
  const ticket = useRef(1);

  function goTo(nomeTela){
    setNomeTela(nomeTela);
  }
  return(
    <div className="App">
      <header className="App-header">
          {nomeTela === "Home" ? <Home goTo={goTo} setResultado={setResultado} setErrorMessage={setErrorMessage} ticket={ticket}/> : null}
          { nomeTela === "Resultados" ? <Resultados goTo={goTo} result={resultado}/> : null}
          {nomeTela === "Error" ? <Error goTo={goTo} errorMessage={errorMessage} /> : null}
          {nomeTela === "Carregando" ? <Carregando goTo={goTo} ticket={ticket}/> : null}
      </header>
    </div>
  )
}

export default App;
