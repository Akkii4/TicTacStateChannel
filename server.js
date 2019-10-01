const Web3 = require('web3');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const ethereumjs=require('ethereumjs-abi');
const port = process.argv[2];
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const gameContractabi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_betAmount",
				"type": "uint256"
			},
			{
				"name": "_timeoutInterval",
				"type": "uint256"
			}
		],
		"name": "startbid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimTimeout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "timeoutInterval",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "acceptbid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "seq",
				"type": "uint8"
			},
			{
				"name": "x",
				"type": "uint8"
			},
			{
				"name": "y",
				"type": "uint8"
			}
		],
		"name": "move",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBoard",
		"outputs": [
			{
				"name": "",
				"type": "address[3][3]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "player2",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "seq",
				"type": "uint8"
			},
			{
				"name": "sig",
				"type": "bytes"
			},
			{
				"name": "messageHash",
				"type": "bytes32"
			},
			{
				"name": "x",
				"type": "uint8"
			},
			{
				"name": "y",
				"type": "uint8"
			}
		],
		"name": "moveFromState",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "timeout",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "startTimeout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "gameOver",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"name": "seq",
				"type": "uint8"
			},
			{
				"name": "whoseTurn",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boardSize",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "betAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "player1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalGameBid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "a",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "player",
				"type": "address"
			}
		],
		"name": "PlayerJoined",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "seq",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "x",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "y",
				"type": "uint8"
			}
		],
		"name": "MoveMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "winner",
				"type": "address"
			}
		],
		"name": "GameOverWithWin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amountInWei",
				"type": "uint256"
			}
		],
		"name": "PayoutSuccess",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "GameOverWithDraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "TimeoutStarted",
		"type": "event"
	}
];

const tokenContractabi=[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "requestTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
];

let tokenAddress="0xa55B01d10F14887E96c9225c874c17E94a93c7a0";	//paste your depolyed TG token address
let gameContractAddress="0x3e31115e33B70941C6360476802E0DEEfb6adD2F";	//paste your deployed TicTacToe Game address

let GameContract = new web3.eth.Contract(gameContractabi,gameContractAddress);
let TokenContract = new web3.eth.Contract(tokenContractabi,tokenAddress);

let account=web3.eth.accounts.privateKeyToAccount(process.argv[3].toString());

//token api
app.get('/requestTokens',function(req,res){
    TokenContract.methods.requestTokens().send({from: account.address}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
	})
});

app.post('/tokenbalanceOf',function(req,res){
	const {address}=req.body;
	TokenContract.methods.balanceOf(address).call({from: account.address}, function(error, result){
	if(error){
		res.status(400).json(error);
	}
	else{
		res.json(result);
	}
})
});

app.post('/transfer',function(req,res){
	const {recipient,amount}=req.body;
	TokenContract.methods.transfer(recipient,amount).send({from: account.address}).on('transactionHash', function(hash){
        web3.eth.getTransactionReceipt(hash).then(receipt=>{
         if(receipt.status == '0x1' || receipt.status == 1||receipt.status == true){
             res.json("Token Transfer succesfully");
         }
     })
        })
        .catch( err => {
            res.status(500).json(err.toString());
        })
});


//GAME api
app.get('/cancel',function(req,res){
    GameContract.methods.cancel().send({from: account.address}).on('transactionHash', function(hash){
       web3.eth.getTransactionReceipt(hash).then(receipt=>{
        if(receipt.status == '0x1' || receipt.status == 1||receipt.status == true){
            res.json("Game Cancelled Succesfully");
        }
    })
       })
       .catch( err => {
        res.status(500).json(err.toString());
    })
});

app.get('/claimTimeout',function(req,res){
    GameContract.methods.claimTimeout().send({from: account.address}).on('transactionHash', function(hash){
        web3.eth.getTransactionReceipt(hash).then(receipt=>{
         if(receipt.status == '0x1' || receipt.status == 1||receipt.status == true){
             res.json("Timeout Claimed");
         }
     })
        })
        .catch( err => {
            res.status(500).json(err.toString());
        })
});

app.post('/startbid',function(req,res){
    const {bet,timeout}=req.body;
    if(!bet || !timeout ){
        return res.status(400).json("Enter all details");
    }
    else {
	GameContract.methods.startbid(bet,timeout).send({from: account.address,
	gasPrice: '1000000000000',
    gas: 1000000}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json("Bid Started successfully, waiting for player2 to join");
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
    })}
});

app.get('/acceptbid',function(req,res){
    GameContract.methods.acceptbid().send({from: account.address,gas:3000000}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
	})
});


app.post('/move',function(req,res){
    const {seq,x,y}=req.body;
    if(!seq || !x || !y ){
        return res.status(400).json("Enter all details");
    }
    else {
	GameContract.methods.move(seq,x,y).send({from: account.address,
	gasPrice: '10000000000000',
    gas: 1000000}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
    })}
});

app.post('/moveFromState',function(req,res){
    const {seq,x,y}=req.body;
    if(!seq || !x || !y ){
        return res.status(400).json("Enter all details");
    }
    else {
		let sig=signMessage(prefixed(generateHash(seq,x,y)));
	GameContract.methods.moveFromState(seq,sig.signature,sig.messageHash,x,y).send({from: account.address,
	gasPrice: '1000000000000',
    gas: 1000000}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
    })}
});

app.get('/startTimeout',function(req,res){
    GameContract.methods.startTimeout().send({from: account.address}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
    })
});

app.get('/betAmount',function(req,res){
    GameContract.methods.betAmount().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/totalGameBid',function(req,res){
    GameContract.methods.totalGameBid().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/boardSize',function(req,res){
    GameContract.methods.boardSize().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/gameOver',function(req,res){
    GameContract.methods.gameOver().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/getBoard',function(req,res){
    GameContract.methods.getBoard().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/player1',function(req,res){
    GameContract.methods.player1().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/player2',function(req,res){
    GameContract.methods.player2().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/state',function(req,res){
    GameContract.methods.state().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/timeoutInterval',function(req,res){
    GameContract.methods.timeoutInterval().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});



function generateHash(seq,x,y) {
	const hash = '0x' + ethereumjs.soliditySHA3(
		["address","uint8","uint8","uint8"],
		[address,seq,x,y]
	).toString('hex')

	return hash
}

function prefixed(hash) {
	return ethereumjs.soliditySHA3(
	  ["string", "bytes32"],
	  ["\x19Ethereum Signed Message:\n32", hash]
	);
  }
  
function signMessage(hash) {
	return account.sign(hash,account.privateKey);
}

app.listen(port,function(){
	console.log(`Server ${port} is Running`);
}); 


