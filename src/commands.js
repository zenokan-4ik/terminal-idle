export const ProcessCommand = (command) => {
    switch(command.toLowerCase()){
        case "clear":
            return ["clear", "$ "+command+"\n"]
        default:
            if(command.toLowerCase().slice(0, 5) == "create"){
                let arg = command.toLowerCase().slice(7)
                console.log(command.toLowerCase().slice(7, 0))
                return ["create", `$ Created : ${arg}`]
            }
            else{
                return ["unknown", "$ Unknown command!"]
            }
    }
}