import { useEffect, useState } from "react";
import { ProcessCommand, Directory } from '../commands';

const Terminal = (props) => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([]);
    const [directory, setDirectory] = useState(new Directory());

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Process the command and update the output
            const result = ProcessCommand(command, directory, props.setStarted,
                props.setBalance, props.setGain, props.gain, props.balance,
                props.gainUPG, props.setGainUPG, props.prestige, props.setPrestige, setOutput,
                props.setGainUPGCount, props.setGainCount, props.gainCount, props.gainUPGCount
            );
            switch(result[0]){
                case "help":
                    setOutput(prevOutput => [...prevOutput, "$ There is no help..."]);
                    setCommand("");  
                    break
                case "exit":
                case "clear":
                    setOutput([]);
                    setCommand(""); 
                    break
                case "dir":
                    setOutput(prevOutput => [...prevOutput, result[1]]);
                    for(let file of directory.listFiles())
                    setOutput(prevOutput => [...prevOutput, file]);
                    console.log(directory.listFiles())
                    setCommand("");  
                    break
                default:
                    setOutput(prevOutput => [...prevOutput, result[1]]);
                    setCommand("");  
                    break     
            }
        }
    };

    return (
        <div className="terminal" id="terminal">
            <div className="input-line">
                <span>$</span>
                <input
                    className="input"
                    autoFocus
                    value={command}
                    onChange={e => setCommand(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className="cursor"></div>
            </div>
            {output.slice().reverse().map((item, index) => (
                <p key={index}>{item}</p> // Return the JSX element and add a key
            ))}
        </div>
    );
};

export default Terminal;