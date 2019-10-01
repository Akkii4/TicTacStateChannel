//const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
//const fs = require("fs");
//const path = require("path");

//const mnemonicPath = path.resolve(__dirname, "mnemonic");
//const MNEMONIC = fs.readFileSync(mnemonicPath, "utf8");

module.exports = {
  networks: {
    development: {
      provider: function() {
        return new Web3.providers.WebsocketProvider("https://localhost:7545");
      },
      network_id: "*"
     }
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       MNEMONIC,
    //       "https://ropsten.infura.io/v3/9ec1ba34a9164ea6a05f44a4168aa065"
    //     );
    //   },
    //   network_id: 3,
    //   gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
    // },
    // rinkeby: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       MNEMONIC,
    //       "https://rinkeby.infura.io/v3/221cb1c28ce24c269b98142f855c008e"
    //     );
    //   },
    //   network_id: 4,
    //   gas: 1000000
    // }
  },
  compilers: {
    solc: {
      version: "0.4.23" // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
