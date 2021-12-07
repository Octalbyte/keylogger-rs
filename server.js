let net = require("net")
let crypto = require("crypto")
let fs = require("fs")
let serverlib = require("./lib/server")
let server = net.createServer(serverlib.main)
let banner = require("node-banner")
let prompt = require("prompt")
let errhandle = require("./lib/errhandle")
prompt.start()

console.clear()

let rawconf;
let main = async()=>{
    await banner("JsRat", "Your favorite remote administration tool \n", "red", "white")
    
try {
    rawconf = fs.readFileSync(".data.json")
}catch{
    console.log(".data.json not found, using default configurations...")
    rawconf = fs.readFileSync("standard.json")
}

let conf = JSON.parse(rawconf)

//console.log(conf)

server.listen(conf.port, () => {
    console.log("Server started")
    // eternal recall of async function
    prompt.get(["JsRat"],(err, result)=>{
        if (err) {errhandle.main(err)}
        console.log("Received input: "+String(result.JsRat))
    })
})
    

}

main()