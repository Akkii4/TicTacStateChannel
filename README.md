# TicTacStateChannel
A command line based TicTacToe game on ethereum state channel built on nodejs

Run Ganache with localhost:7545 for contract deployment & interaction.

Step1-: open two terminal in this directory.
Step2-:  Paste private keys from ganache accounts with '0x' prefixed for player1 & player2 in package.json, to load account.
Step3-: 'npm run player1' player 1 is live on localhost:3001.
Step4-:  Open Postman & create a post request to http://localhost:3001/deploy with arguments as {"timeout":100,"betAmount":1} timeout in minutes & betAmount is in ether.
Step5-: Step4 will respond with deployed contract address , copy it & paste it in algo.js, against the variable "address".
Step6-: Rerun the 'npm run player1' & also 'npm run player2' in other terminal, this will create two players running on different ports(player1 on 3001 & player2 on 3002).
Step7-:create a post request to http://localhost:3002/join with arguments as {"betAmount":1} , betAmount should be similar as, mentioned in step4, now both players are joined to game & game has started.
Step8-:to start playing game a post request to http://localhost:3001/moveFromState(for sending game moves on state channel) with arguments  {"seq":"0","x":"0","y":"0"} here seq is the moves made & should be incremented with each turn , x & y represents rows & columns of 3X3 tic tac board.

other Methods-:cancel() for canceling the game if player2 has'nt joined 
starttimeout() -if a player’s opponent has stopped making moves, the player needs to invoke a timeout by calling startTimeout()
state()- for geting update Game state
getBoard()- players respective move on the tictac toe board.
