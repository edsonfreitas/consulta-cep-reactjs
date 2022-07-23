export function Carregando(props){
    const goTo = props.goTo;
    const ticket = props.ticket;

    function handleCancel(){
        ticket.current++;
        goTo("Home")
    }
    return(
    <>
        <p>Carregando resultado...</p>
        <button onClick={handleCancel}>Cancelar</button>
    </> 
    )
}