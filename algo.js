const Web3 = require('web3');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const ethereumjs=require('ethereumjs-abi');
const port = process.argv[2];
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
let address="0x598691D58e3afbDB3A13DeC8D54289eCA89E5468";		//<=== Replace Deployed Contract Address 	
const bytecode="608060405260038060016101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60125560405160208061233a833981018060405281019080805190602001909291905050506000341115156100dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f42657420616d6f756e742063616e2774206265207a65726f000000000000000081525060200191505060405180910390fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600281905550603c8102601181905550506121fc8061013e6000396000f3006080604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e1da6c3146100e05780630e76f9db146100f757806329dae39d146101225780633264a34b1461016c57806359a5f12d146101e25780636c0d3f751461023957806370dea79a146102d75780637a45589414610302578063b688a36314610319578063bdb337d114610323578063c19d93fb14610352578063c51d69f4146103b6578063d24257c0146103e7578063d30895e414610412578063ea8a1af014610469575b600080fd5b3480156100ec57600080fd5b506100f5610480565b005b34801561010357600080fd5b5061010c6105be565b6040518082815260200191505060405180910390f35b34801561012e57600080fd5b5061016a600480360381019080803560ff169060200190929190803560ff169060200190929190803560ff1690602001909291905050506105c4565b005b34801561017857600080fd5b50610181610f55565b604051808260036000925b818410156101d25782846020020151600360200280838360005b838110156101c15780820151818401526020810190506101a6565b50505050905001926001019261018c565b9250505091505060405180910390f35b3480156101ee57600080fd5b506101f761100e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561024557600080fd5b506102d5600480360381019080803560ff169060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192908035600019169060200190929190803560ff169060200190929190803560ff169060200190929190505050611034565b005b3480156102e357600080fd5b506102ec611326565b6040518082815260200191505060405180910390f35b34801561030e57600080fd5b5061031761132c565b005b6103216114e0565b005b34801561032f57600080fd5b506103386117bb565b604051808215151515815260200191505060405180910390f35b34801561035e57600080fd5b506103676117ce565b604051808360ff1660ff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156103c257600080fd5b506103cb61180d565b604051808260ff1660ff16815260200191505060405180910390f35b3480156103f357600080fd5b506103fc611820565b6040518082815260200191505060405180910390f35b34801561041e57600080fd5b50610427611826565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561047557600080fd5b5061047e61184b565b005b600360009054906101000a900460ff16151515610505576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b601254421015151561051657600080fd5b6001600360006101000a81548160ff02191690831515021790555061055f601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611a3a565b73ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501580156105bb573d6000803e3d6000fd5b50565b60115481565b60008073ffffffffffffffffffffffffffffffffffffffff1660048460ff166003811015156105ef57fe5b600302018360ff1660038110151561060357fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561064757600080fd5b600360009054906101000a900460ff161515156106cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420796f7572207475726e2e00000000000000000000000000000000000081525060200191505060405180910390fd5b600360019054906101000a900460ff1660ff168360ff161015156107b457fe5b600360019054906101000a900460ff1660ff168260ff161015156107d457fe5b3360048460ff166003811015156107e757fe5b600302018360ff166003811015156107fb57fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600d600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550508360ff16601060000160009054906101000a900460ff1660ff161415156108fb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f496e636f72726563742073657175656e6365206e756d6265722e00000000000081525060200191505060405180910390fd5b600090505b600360019054906101000a900460ff1660ff168160ff161015610a2357601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660048260ff1660038110151561096b57fe5b600302018360ff1660038110151561097f57fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156109c357610a23565b6001600360019054906101000a900460ff160360ff168160ff161415610a1657610a11601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c5d565b610f4f565b8080600101915050610900565b600090505b600360019054906101000a900460ff1660ff168160ff161015610b4b57601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660048460ff16600381101515610a9357fe5b600302018260ff16600381101515610aa757fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610aeb57610b4b565b6001600360019054906101000a900460ff160360ff168160ff161415610b3e57610b39601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c5d565b610f4f565b8080600101915050610a28565b8160ff168360ff161415610c8257600090505b600360019054906101000a900460ff1660ff168160ff161015610c8157601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660048260ff16600381101515610bc957fe5b600302018260ff16600381101515610bdd57fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c2157610c81565b6001600360019054906101000a900460ff160360ff168160ff161415610c7457610c6f601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c5d565b610f4f565b8080600101915050610b5e565b5b6001600360019054906101000a900460ff160360ff1682840160ff161415610de157600090505b600360019054906101000a900460ff1660ff168160ff161015610de057601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660048260ff16600381101515610d1457fe5b60030201826001600360019054906101000a900460ff16030360ff16600381101515610d3c57fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610d8057610de0565b6001600360019054906101000a900460ff160360ff168160ff161415610dd357610dce601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c5d565b610f4f565b8080600101915050610ca9565b5b6002600360019054906101000a900460ff160a60ff16600d60009054906101000a900460ff1660ff161415610e1d57610e18611e17565b610f4f565b610e2633611a3a565b601060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001601060000160008282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6012819055507f83266dccf22adc9a289b947b87c46af82ecc482f96a07bf4aa62b8c91f6aedc633858585604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018460ff1660ff1681526020018360ff1660ff1681526020018260ff1660ff16815260200194505050505060405180910390a15b50505050565b610f5d61217e565b6004600380602002604051908101604052809291906000905b8282101561100557838260030201600380602002604051908101604052809291908260038015610ff1576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610fa7575b505050505081526020019060010190610f76565b50505050905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806110dc5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515611150576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4e6f74206120706c6179657220696e20746869732067616d650000000000000081525060200191505060405180910390fd5b601060000160009054906101000a900460ff1660ff168560ff1610151515611206576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f53657175656e6365206e756d6265722063616e6e6f7420676f206261636b776181526020017f7264732e0000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166112278486612093565b73ffffffffffffffffffffffffffffffffffffffff161415156112b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f496e76616c696420496e7075740000000000000000000000000000000000000081525060200191505060405180910390fd5b84601060000160006101000a81548160ff021916908360ff16021790555033601060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061131f8583836105c4565b5050505050565b60125481565b600360009054906101000a900460ff161515156113b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b6113ba33611a3a565b73ffffffffffffffffffffffffffffffffffffffff16601060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156114a7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f43616e6e6f7420737461727420612074696d656f7574206f6e20796f7572736581526020017f6c662e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60115442016012819055507f02bdd5174ce27e71542ca96bbba5c2c21920793759d94795d2f17eff6f7f2a0f60405160405180910390a1565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611590576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f47616d652068617320616c726561647920737461727465642e0000000000000081525060200191505060405180910390fd5b600360009054906101000a900460ff16151515611615576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f47616d65207761732063616e63656c65642e000000000000000000000000000081525060200191505060405180910390fd5b6002543414151561168e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f57726f6e672062657420616d6f756e742e00000000000000000000000000000081525060200191505060405180910390fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16601060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f31e760aa525306aba638a784082a013b6a1cc0a9a1789f3f22281c0453b10b1f600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1565b600360009054906101000a900460ff1681565b60108060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b600360019054906101000a900460ff1681565b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561190f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4f6e6c7920666972737420706c61796572206d61792063616e63656c2e00000081525060200191505060405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156119bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f47616d652068617320616c726561647920737461727465642e0000000000000081525060200191505060405180910390fd5b6001600360006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015611a37573d6000803e3d6000fd5b50565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151515611aec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f47616d6520686173206e6f7420737461727465642e000000000000000000000081525060200191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611b6b57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050611c58565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611bea576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050611c58565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c696420706c617965722e000000000000000000000000000000000081525060200191505060405180910390fd5b919050565b60006001600360006101000a81548160ff0219169083151502179055507f8245a3876d42d9b0bdb7f24184c03fc24e3d8a079f492b1ec9ceae70b366edf982604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a13073ffffffffffffffffffffffffffffffffffffffff16319050600115158273ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501515141515611da7576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611d9a5780600e81905550611da2565b80600f819055505b611e13565b7f2a44162a2d5223e37cacacc3f626dcfee1396e0be3616534c5c7b718f786b6738282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5050565b60006001600360006101000a81548160ff0219169083151502179055507f2207d46a2ba0f2acda06e9a222b40fd004e385738b3f868e63b2c0bfe4bc094c60405160405180910390a160023073ffffffffffffffffffffffffffffffffffffffff1631811515611e8357fe5b049050600015156000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015151415611efd5780600e60008282540192505081905550611f8a565b7f2a44162a2d5223e37cacacc3f626dcfee1396e0be3616534c5c7b718f786b6736000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b60001515600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151514156120025780600f60008282540192505081905550612090565b7f2a44162a2d5223e37cacacc3f626dcfee1396e0be3616534c5c7b718f786b673600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b50565b6000806000806120a28561213a565b809350819450829550505050600186848484604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af1158015612125573d6000803e3d6000fd5b50505060206040510351935050505092915050565b6000806000806000806041875114151561215357600080fd5b6020870151925060408701519150606087015160001a90508083839550955095505050509193909250565b610120604051908101604052806003905b6121976121ad565b81526020019060019003908161218f5790505090565b6060604051908101604052806003906020820280388339808201915050905050905600a165627a7a7230582021113676e1bf790f3cad8855709e306e93a755c81923b15504ccaf55b3e5d36f0029";
const abi=[
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
		"constant": false,
		"inputs": [],
		"name": "claimTimeout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "join",
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
		"constant": false,
		"inputs": [],
		"name": "startTimeout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "TimeoutStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"name": "_timeoutInterval",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
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
	}
];

let account=web3.eth.accounts.privateKeyToAccount(process.argv[3].toString());

app.post('/deploy',function(req,res){
const {timeout,betAmount}=req.body;
if(!timeout||!betAmount){
    return res.status(400).json("Fill all details");
}
else{
    let tictactoeContract = new web3.eth.Contract(abi);
    tictactoeContract.deploy({
      data:bytecode,
      arguments:[timeout],
    }).send({
      from: account.address,
      gas: 5000000 ,
      gasPrice: '3000000000',
      value: web3.utils.toWei(betAmount.toString(), "ether")
       }).then(contract=>{
          if (typeof contract._address !== 'undefined') {
           res.json('Contract mined! address: ' + contract._address);
       }
       else(res.json("contract Deployement Failed"))
       })
}
});

let deployedcontract = new web3.eth.Contract(abi,address);

app.get('/cancel',function(req,res){
    deployedcontract.methods.cancel().send({from: account.address}).on('transactionHash', function(hash){
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
    deployedcontract.methods.claimTimeout().send({from: account.address}).on('transactionHash', function(hash){
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



app.post('/join',function(req,res){
    const {betAmount}=req.body;
    if(!betAmount){
        return res.status(400).json("Enter correct BetAmount");
    }
    else {
    deployedcontract.methods.join().send({from: account.address,value: web3.utils.toWei(betAmount.toString(), "ether")}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
    })}
});


app.post('/move',function(req,res){
    const {seq,x,y}=req.body;
    if(!seq || !x || !y ){
        return res.status(400).json("Enter all details");
    }
    else {
	deployedcontract.methods.move(seq,x,y).send({from: account.address,
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


app.post('/moveFromState',function(req,res){
    const {seq,x,y}=req.body;
    if(!seq || !x || !y ){
        return res.status(400).json("Enter all details");
    }
    else {
		let sig=signMessage(prefixed(generateHash(seq,x,y)));
	deployedcontract.methods.moveFromState(seq,sig.signature,sig.messageHash,x,y).send({from: account.address,
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
    deployedcontract.methods.startTimeout().send({from: account.address}).on('receipt', function(receipt){
        if(receipt.status == '0x1' || receipt.status == 1){
           res.json(receipt.events);
        }
    })
    .catch( err => {
        res.status(500).json(err.toString());
    })
});

app.get('/betAmount',function(req,res){
    deployedcontract.methods.betAmount().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/boardSize',function(req,res){
    deployedcontract.methods.boardSize().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/gameOver',function(req,res){
    deployedcontract.methods.gameOver().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/getBoard',function(req,res){
    deployedcontract.methods.getBoard().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/player1',function(req,res){
    deployedcontract.methods.player1().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/player2',function(req,res){
    deployedcontract.methods.player2().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/state',function(req,res){
    deployedcontract.methods.state().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.get('/timeoutInterval',function(req,res){
    deployedcontract.methods.timeoutInterval().call({from: account.address}, function(error, result){
        if(error){
            res.status(400).json(error);
        }
        else{
            res.json(result);
        }
    });
});

app.listen(port,function(){
	console.log(`Server ${port} is Running`);
}); 


