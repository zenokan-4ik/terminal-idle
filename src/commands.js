import { login } from './server'

export const ProcessCommand = (command, directory, setStarted, setBalance,
                            setGain, gain, balance, gainUPG, setGainUPG,
                            prestige, setPrestige, setOutput
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
                        setGain(gain*gainUPG)
                        setBalance(0)
                        return ["success", "$ Gain increased!! And money lost :)"]
                    case "upgradegain.exe":
                        if(balance >= 100 * gain){// TODO: FIX GAIN GAINUPG ETC.
                            setGainUPG((gainUPG+1/gain))
                            setBalance(balance-100*gain)
                            return ["success", "$ Gain upgrade activated!"]
                        }
                        else{
                            return ["error", "$ Not enough balance! ("+(Math.round(100*gain*100)/100)+") \n"]
                        }
                    case "reset.exe":
                        if(balance >= 10_000_000*(prestige+1)){
                            setPrestige(prestige+1)
                            setBalance(0)
                            setStarted(0)
                            setOutput([])
                            directory.files = []
                            return ["success", "$ Prestige!!!"]
                        }
                        else{
                            return ["error", "$ Not enough balance! ("+10000000*(prestige+1)+") \n"]
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