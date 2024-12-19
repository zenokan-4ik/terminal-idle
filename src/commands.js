import { login } from './server'

export const ProcessCommand = (command, directory, setStarted, setBalance,
                            setGain, gain, balance, gainUPG, setGainUPG,
                            prestige, setPrestige, setOutput, setGainUPGCount,
                            setGainCount, gainCount, gainUPGCount
    ) => {
    command = command.split(" ")
    let arg;
    switch(command[0].toLowerCase()){
        case "clear":
            return ["clear", "$ "+command+"\n"]
        case "dir":
            return ["dir", "$ \n"]
        case "create":
            arg = command[1]
            directory.addFile(arg)
            return ["create", `$ Created : ${arg}`]
        case "exed.exe":
            arg = null;
            try{
                arg = command[1]
            }
            catch(e){
                return ["error", `$ Enter filename bruh \n`]
            }
            finally{
                if(arg!=null){
                    for(let i = 0; i < directory.files.length; i++){
                        console.log(directory.files[i])
                        if(directory.files[i] == arg){
                            directory.files[i] = arg.slice(-4)!=".exe" ? arg+".exe" : arg
                            return ["success", "$ File turn to exe!"]
                        }
                    }
                }
                return ["error", `$ File not found! \n`]
            }
        case "rm":
            arg = command[1]
            directory.removeFile(arg)
            return ["rm", `$ Removed : ${arg}`]
        case "run":
            arg = command[1]
            if(directory.files.includes(arg)){
                switch(arg){
                    case "penis.exe":
                        return ["success", "$ You are penis bruh bruh"]
                    case "login.exe":
                        let log = command[2]
                        if(log != ""){
                            let resp = login(log)
                            if(resp[0]){
                                return ["success", "$ "+resp[1]]
                            }
                            else{
                                return ["error", "$ "+resp]
                            }
                        }
                        else{
                            return ["error", "$ Enter username bruh \n"]
                        }
                    case "start.exe":
                        setStarted(1)
                        setBalance(1)
                        return ["success", "$ Game started!"]
                    case "gain.exe":
                        setGain(gain * gainUPG * (1.5 / (1 + Math.exp(-balance / gain)))) // change using gainCount
                        setGainCount(gainCount+1)
                        setBalance(0)
                        return ["success", "$ Gain changed!! And money lost :)"]
                    case "upgradegain.exe":
                        if(balance >= 10 * gain * 1.2/(1 + Math.exp(-gain))){
                            setGainUPGCount(gainUPGCount+1) 
                            setGainUPG((gainUPG+(1/gain))) // change using gainUPGCount
                            setBalance(balance-10 * gain * 1.2/(1 + Math.exp(-gain)) * (1.15**gainUPGCount))
                            return ["success", "$ Gain upgrade activated!"]
                        }
                        else{
                            return ["error", "$ Not enough balance! ("+(getPrettyNum(10 * gain * 1.2/(1 + Math.exp(-gain))))+") \n"]
                        }
                    case "reset.exe":
                        if(balance >= 10_000_000*(prestige+1)){
                            setPrestige(prestige+1)
                            setBalance(0)
                            setStarted(0)
                            setGain(1)
                            setGainUPG(1.01)
                            setOutput([])
                            directory.files = []
                            return ["success", "$ Prestige!!!"]
                        }
                        else{
                            return ["error", "$ Not enough balance! ("+getPrettyNum(10000000*(prestige+1))+") \n"]
                        }
                    default:
                        return ["error", `$ File is not opened... \n`]
                }
            }
        default:
            return ["unknown", "$ Unknown command! \n"]
    }
}

export class Directory{
    constructor(){
        this.files = []
    }

    addFile(file){
        this.files.push(file)
    }

    removeFile(file){
        this.files = this.files.filter(f => f.name!=file.name)
    }

    listFiles(){
        let res = [];
        for(let file of this.files){
            res.push("+-"+file)
        }
        return res
    }
}

export function getPrettyNum(x) {
    if (x < 1000) {
        return Math.round(100*x)/100; // Return the number as-is if it's less than 1000
    } else {
        // Calculate the exponent
        const b = Math.floor(Math.log10(x));
        // Calculate the coefficient
        const a = (x / Math.pow(10, b)).toFixed(2); // Round to 2 decimal places
        return `${a}e${b}`; // Return in scientific notation
    }
}