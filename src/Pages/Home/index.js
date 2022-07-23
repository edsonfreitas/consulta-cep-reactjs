import { useState, useEffect } from "react";
import CEPDados from "../../Components/CEPDados";
import consultarCep from "cep-promise";
import "./index.css";

//Tradução
function translate(cepDados) {
  return {
    CEP: cepDados.cep,
    ESTADO: cepDados.state,
    CIDADE: cepDados.city,
    BAIRRO: cepDados.neighborhood,
    LOGRADOURO: cepDados.street,
  };
}

export function Home(props) {
  const goTo = props.goTo;
  const ticket = props.ticket;
  const setErrorMessage = props.setErrorMessage;
  const setResultado = props.setResultado;
  const [cepNumber, setCepNumber] = useState("");
  const [cepFavorito, setCepFavorito] = useState("");
  const [cepDados, setCepDados] = useState({});

  useEffect(() => {
    const storedCep = localStorage.getItem("cepFavorito") || "";
    setCepFavorito(storedCep);
  }, []);

  useEffect(() => {
    if (!cepFavorito) {
      return;
    }
    localStorage.setItem("cepFavorito", cepFavorito);
    consultarCep(cepFavorito)
      .then((resultado) => setCepDados(resultado))
      .catch((err) => setCepDados({ Error: err.messa }));
  }, [cepFavorito]);

  //FILTRO DE CARACTERE NUMERICO NO INPUT
  function numbersOnly(str) {
    return str.replace(/[^\d]/g, "");
  }

  //RECEBE O VALOR DO INPUT
  function handleChange(evt) {
    const value = evt.target.value;
    setCepNumber(numbersOnly(value));
  }
  //LIMPA ESTADO
  /*function clear(){
      setCepNumber("")

    }*/

  function handleError(err) {
    const errorMessage = err.message;
    setErrorMessage(errorMessage);
    goTo("Error");
  }

  function handleSuccess(cepDados) {
    const resultado = translate(cepDados);
    setResultado(resultado);
    goTo("Resultados");
  }

  function handleSeach() {
    ticket.current++;
    const currentTicket = ticket.current;
    goTo("Carregando");
    consultarCep(cepNumber)
      .then(
        (result) => currentTicket === ticket.current && handleSuccess(result)
      )
      .catch((err) => currentTicket === ticket.current && handleError(err));
  }

  function handleAdicionarFavorito() {
    setCepFavorito(cepNumber);
  }

  return (
    <>
      <h2>Qual o CEP você deseja pesquisar?</h2>
      <input
        value={numbersOnly(cepNumber)}
        onChange={handleChange}
        placeholder="99999-999"
        className="cepDados"
      />
      <button onClick={handleSeach} className="btnCons">
        CONSULTAR
      </button>
      <button onClick={handleAdicionarFavorito} className="btnSalv">
        SALVAR FAVORITO
      </button>
      <br />
      <p>Favorito: {cepFavorito}</p>
      <CEPDados cepDados={translate(cepDados)} />
    </>
  );
}
