const TGToken = artifacts.require("TGToken");
 const TicTacToe = artifacts.require("TicTacToe");

module.exports = async deployer => {
  await deployer.deploy(TGToken, 10000);
   await deployer.deploy(TicTacToe, TGToken.address);
};
