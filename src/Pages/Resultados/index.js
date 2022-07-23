import CEPDados from "../../Components/CEPDados";

export function Resultados(props) {
  const result = props.result;
  const goTo = props.goTo;
  var cep = result.CEP
  cep.replace(/D/g, "")
  var cepFormat = cep.replace(/(\d{5})(\d{1,3})$/,"$1-$2")

  return (
    <>
      <p>Resultados para o CEP: {cepFormat}</p>
      <CEPDados cepDados={result} />
      <button onClick={() => goTo("Home")}>NOVA CONSULTA</button>
    </>
  );
}
