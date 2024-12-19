import { getPrettyNum } from "../commands";

const Game = (props) => {
    return (
        <div className="game">
            <p>Balance:  {getPrettyNum(props.balance)}</p>
            <p>Gain: {getPrettyNum(props.gain)}</p>
            <p>Prestige LVL: {props.prestige}</p>
        </div>
    )
}

export default Game;