import { useState } from "react";
import { ProcessCommand } from '../commands';

const Terminal = (props) => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Process the command and update the output
            const result = ProcessCommand(command);
            switch(result[0]){
                case "clear":
                    setOutput([]);
                    setCommand(""); 
                    break
                default:
                    setOutput(prevOutput => [...prevOutput, result[1]]); // Create a new array
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