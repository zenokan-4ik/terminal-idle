const Game = (props) => {
    return (
        <div className="game">
            <p>Balance:  {Math.round(props.balance*100)/100}</p>
            <p>Gain: {Math.round(props.gain*100)/100}</p>
            <p>Prestige LVL: {props.prestige}</p>
        </div>
    )
}

export default Game;