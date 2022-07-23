export function Error(props){
    const goTo = props.goTo;
    return(
        <>
       <p>Error na consulta</p>
       <p>{props.errorMessage}</p>
       <button onClick={() => goTo("Home")}>Voltar</button>
       </> 
    )
}