const express = require("express");
const app = express();
const Web3 = require('web3');
const request = require('request');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const web3 = new Web3('wss://mainnet.infura.io/ws/v3/cc20d2dc52f741a89a21bedbb2116977');
const web3bsc = new Web3('wss://bsc-mainnet.nodereal.io/ws/v1/64a9df0874fb4a93b9d0a3849de012d3');

const providers = new Web3.providers.HttpProvider( "https://mainnet.infura.io/v3/cc20d2dc52f741a89a21bedbb2116977")

/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = "https://rssy8ecods08.usemoralis.com:2053/server";
const appId = "WjbKnNRVurxzGAdo53yXaRMESvKrlTv7OwjiKRlu";
const masterKey = "hbRYyzi4e6rSe6MFXO1oF6lSTuFImAn7ZsT1PeHV";

// async function Start() {
//     await Moralis.start({ serverUrl, appId, masterKey });
// }


app.get("/", (request, response) => {
    response.send("Hi there");
});

app.get("/save", (request, response) => { 

     SaveData()

})


app.get("/get",async (request, response) => {
    let topicAddress = "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
    var latest =  await web3.eth.getBlock("latest");
    
    let toB = latest.number

    let fB  = toB - 1000
    let a
   
    await web3.eth.getPastLogs(
                {
                  fromBlock: fB,
                  toBlock: "latest",
                  topics:[topicAddress]
                    },(err,event) => {
                      a = event
                    }
              )


              
            //   a.map( async(res) =>{
              
             
            //     // web3 = new Web3(await providers)
            //     let a = res.topics[1]
            //     let b = res.topics[2]
         
            //     if(parseInt(a,16)==0) {
                 
            //       // console.log(b)
            //       // let address = "0x"+b.slice(26)
            //       // console.log(address)
            //       // console.log('token: '+res.address)
        
        
                  
                       
            //         // console.log(res.address)
            //         // console.log(token2)
            //       // async function checkAddress() {
        
            //         try {
        
                      
                    
            
            //             // console.log(res.address)
            //             let maintoken = res.address
            //             // console.log(maintoken)
            //             // console.log(value[0])
                  
            //             var receipt = await web3.eth.getTransactionReceipt(res.transactionHash)
            //             // console.log(receipt)
            //             // console.log(receipt)
            //             // console.log(Date.now()) 
            //             // if(maintoken == '0x648d1440c96b80254f3cfe48ca27a9334162aaa7')
            //             // {
            //             //  console.log(receipt)
            //             // }
            //            ar[oldArray => [...oldArray,receipt]]
            
                      
            
            //         }
            //         catch(e){
            //           // console.log(e)
            //         }

            //         console.log(ar)
                  
            //     }
                
               
        
            // //    let token1 = web3.eth.abi.decodeParameters(
            // //   ["address"],res.topics[1]
              
            // // );
        
            // // let token2 = web3.eth.abi.decodeParameters(
            // //   ["address"],res.topics[2]
              
            // // );
         
            // // console.log(token1[0])
            // // console.log(token2[0])
            // // console.log("0x0000000000000000000000000000000000000000")
            
            // // if(token1[0]=="0x0000000000000000000000000000000000000000"){
            
           
            // //     // }
        
        
        
            // //     // checkAddress();
              
        
            // // }
          
           
                 
            //   })
            let ar = []
            const batch = new web3.BatchRequest();
            await new Promise(function(resolve, reject){ 
                for (let i = 0; i <10; i++){

                    let b = a[i].topics[1]
                    let c = a[i].topics[2]
             
                    console.log(b)
                    if(parseInt(b,16)==0) {
                        console.log("gumana")
                        console.log(a[i].transactionHash)
    
                        // ar.push(await web3.eth.getTransactionReceipt(a[i].transactionHash))
                        batch.add( web3.eth.getTransactionReceipt.request(a[i].transactionHash,(err, result) => console.log(result))	)
                        // batch.add( web3.eth.getTransactionReceipt.request(,{}, (err,tx) => console.log("tx"))
                        
                       
                    }
                    else {
                        console.log("wala")
                    }
                   
                  }

                  batch.execute()
            })
           
        
              
              response.send("ar")

            //   awa
           
               

            //   console.log(ar)

              
    
});

 const uniswapFactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"; 
 const uniswapPairCreatedTopic = "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9"
 let topicAddress = "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"

 let arr = []


 app.get("/arr",async (request, response) => { 

    response.send(arr);
 })
async function getNewTokens() {
    console.log("gumana")

    var latest =  await web3.eth.getBlock("latest");
    
    let toB = latest.number
    let fB  = toB - 1000

    let options = {

        // address: uniswapFactoryAddress,
        topics: [
            topicAddress
        ],
        limit:5,
      
        fromBlock: fB,                //Number || "earliest" || "pending" || "latest"
        toBlock: '9999999999'
      };
      
      var subscription = web3.eth.subscribe('logs', {
        // address: '0x123456..',
        topics: [topicAddress]
    }, async function(error, result){
        if (!error) {

            console.log(result);

                    let b = result.topics[1]
                    let c = result.topics[2]
             
                    console.log(b)
                    if(parseInt(b,16)==0) {

                        
                        let hash = result.transactionHash

                        try {
                            let a = await fetchToken(result.address,hash,"eth")
                        }
                        catch(e){
                            console.log(e)
                            console.log('next')
                        }
                        // console.log(a)

                    }
                    else {
                        console.log("wala")
                    }

        }
        else{
            console.log(error)
        }
            
    });


      
}

async function getNewTokensBSC() {
  console.log("gumana")

  var latest =  await web3bsc.eth.getBlock("latest");
  
  let toB = latest.number
  let fB  = toB - 1000

  let options = {

      // address: uniswapFactoryAddress,
      topics: [
          topicAddress
      ],
      limit:5,
    
      fromBlock: fB,                //Number || "earliest" || "pending" || "latest"
      toBlock: '9999999999'
    };
    
    var subscription = web3bsc.eth.subscribe('logs', {
      // address: '0x123456..',
      topics: [topicAddress]
  }, async function(error, result){
      if (!error) {

          console.log(result);

                  let b = result.topics[1]
                  let c = result.topics[2]
           
                  console.log(b)
                  if(parseInt(b,16)==0) {

                      
                      let hash = result.transactionHash

                      try {
                          let a = await fetchToken(result.address,hash,"bsc")
                      }
                      catch(e){
                          console.log(e)
                          console.log('next')
                      }
                      // console.log(a)

                  }
                  else {
                      console.log("wala")
                  }

      }
      else{
          console.log(error)
      }
          
  });


    
}



async function  fetchToken (token,hash,chain) {
let web3s
if(chain=="eth"){
 web3s = new Web3('wss://mainnet.infura.io/ws/v3/cc20d2dc52f741a89a21bedbb2116977');
}else if(chain=="bsc"){
 web3s = new Web3('wss://bsc-mainnet.nodereal.io/ws/v1/64a9df0874fb4a93b9d0a3849de012d3');
}


 if(token != null) {
var receipt = await web3s.eth.getTransactionReceipt(hash)
console.log("1")
let time = await  web3s.utils.hexToNumber(receipt.timeStamp)
console.log("2")


var name = await web3s.eth.call({ to: token, data:web3s.utils.sha3("name()")});

var symbol = await web3s.eth.call({ to: token, data:web3s.utils.sha3("symbol()")});

var decimal = await web3s.eth.call({ to: token, data:web3s.utils.sha3("decimals()")});

console.log("una")

let name0 = web3s.eth.abi.decodeParameters(['string'], name)
let symbol0 = web3s.eth.abi.decodeParameters(['string'], symbol)
let decimal0 = web3s.eth.abi.decodeParameters(['uint8'], decimal)
let dev = receipt.from

 

// console.log(name["0"])
// console.log(Object.values(name0)[0])


   await SaveData(name0,symbol0,decimal0,token,hash,time,dev,chain)
 }

 else {
   console.log("null")
 }


  };



const SaveData = async (name,symbol,decimal,address,hash,time,dev,chain) => {
    await Moralis.start({ serverUrl, appId, masterKey });
  
    let Tokens = Moralis.Object.extend("EthTokens");
    if(chain=="eth"){
      Tokens = Moralis.Object.extend("EthTokens");
    }else if(chain=="bsc"){
      Tokens = Moralis.Object.extend("BSCTokens");
    }

    console.log("nagsave")
    const tokens = new Tokens();
 
    tokens.set("name", Object.values(name)[0]);
    tokens.set("symbol", Object.values(symbol)[0]);
    tokens.set("address", address);
    tokens.set("decimal",  Object.values(decimal)[0]);
    tokens.set("hash", hash);
    tokens.set("dev", dev);
    tokens.set("time", time);
  
    await tokens.save();

    console.log("successfully saved "+chain)
  };

getNewTokensBSC()
getNewTokens()

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});