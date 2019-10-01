# TicTacStateChannel
A command line based TicTacToe game on ethereum state channel built on nodejs\

Run Ganache with localhost:7545 for contract deployment & interaction.\
Run npm i to install dependencies\

Step1-: run truffle migrate--reset to deploy contract on ganache , copy the address of TGToken as well the TicTacToe & paste it in server.js.&nbsp;\

Step2-:  Paste private keys from ganache accounts with '0x' prefixed for player1 & player2 in package.json, to load account.&nbsp;\

Step3-: Run 'npm run player1' & also 'npm run player2' in other terminal, this will create two players running on different ports(player1 on 3001 & player2 on 3002).&nbsp;\

Step4-:  Open Postman & create a post request to http://localhost:3001/startbid with arguments as {"bet":"10","timeout":"100"} timeout in minutes & bet is in tokens.&nbsp;\

Step5-: create a get request to http://localhost:3002/requestTokens for sending 100 tokens to the new address.&nbsp;\

Step6-:create a get request to http://localhost:3002/acceptbid ,now both players are joined to game & game has started.&nbsp;\

Step8-:to start playing game a post request to http://localhost:3001/moveFromState(for sending game moves on state channel) with arguments  {"seq":"0","x":"0","y":"0"} here seq is the moves made & should be incremented with each turn , x & y represents rows & columns of 3X3 tic tac board.&nbsp;\

other Methods-:cancel() for canceling the game if player2 has'nt joined &nbsp;\
starttimeout() -if a player’s opponent has stopped making moves, the player needs to invoke a timeout by calling startTimeout()&nbsp;\
totalGameBid()- for getting total game bid\
state()- for geting update Game state&nbsp;\
getBoard()- players respective move on the tictac toe board.&nbsp;\

token api-:\
post request tokenbalanceOf() for sending 100 tokens to the new address  args as {"address":"0xA988f03F9a188973A5D71fe5C4E1409E7eD2179f"}\
post request transfer() args as {"recipient":"0x83aED58E260289Dfad0CE5731a0694AE7C39af1D","amount":"500"}\
