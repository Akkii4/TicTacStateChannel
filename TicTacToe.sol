pragma solidity ^0.4.23;

contract TicTacToe {
    address public player1;
    address public player2;
    uint256 public betAmount;
    bool public gameOver;
    uint8 public boardSize = 3;
    address[3][3] board;
    uint8 movesCounter;
    
    uint balanceToWithdrawPlayer1;
    uint balanceToWithdrawPlayer2;


    struct GameState {
        uint8 seq;
        address whoseTurn;
    }
    GameState public state;

    uint256 public timeoutInterval;
    uint256 public timeout = 2**256 - 1;

    event PlayerJoined(address player);
    event MoveMade(address player, uint8 seq, uint8 x,uint8 y);
    event GameOverWithWin(address winner);
    event PayoutSuccess(address receiver, uint amountInWei);
    event GameOverWithDraw();
    event TimeoutStarted();


    // Setup methods

    constructor(uint256 _timeoutInterval) public payable {
        require(msg.value> 0 wei,"Bet amount can't be zero");
        player1 = msg.sender;
        betAmount = msg.value;
        timeoutInterval = _timeoutInterval*1 minutes;       //coverted into minutes 
    }

    function join() public payable {
        require(player2 == 0, "Game has already started.");
        require(!gameOver, "Game was canceled.");
        require(msg.value == betAmount, "Wrong bet amount.");

        player2 = msg.sender;
        state.whoseTurn = player1;
        emit PlayerJoined(player2);
    }

    function cancel() public {                                                  //to cancel the game before player 2 joins
        require(msg.sender == player1, "Only first player may cancel.");
        require(player2 == 0, "Game has already started.");

        gameOver = true;
        msg.sender.transfer(address(this).balance);
    }
    
    function getBoard() public view returns(address[3][3] memory) {
        return board;
    }
    
    function setWinner(address  player) private {
        gameOver = true;
        //emit an event
        emit GameOverWithWin(player);
        uint balanceToPayOut = address(this).balance;
         /**
        * In Real-World application consider removing the player.send part completely and let the player
        * Withdraw the money later on!
         */
        if(player.send(balanceToPayOut) != true) {
            if(player == player1) {
                balanceToWithdrawPlayer1 = balanceToPayOut;
            } else {
                balanceToWithdrawPlayer2 = balanceToPayOut;
            }
        } else {
            emit PayoutSuccess(player, balanceToPayOut);
        }
        //transfer money to the winner
    }
    
    function setDraw() private {
        gameOver = true;
        emit GameOverWithDraw();

        uint balanceToPayOut = address(this).balance/2;

        if(player1.send(balanceToPayOut) == false) {
            balanceToWithdrawPlayer1 += balanceToPayOut;
        } else {
            emit PayoutSuccess(player1, balanceToPayOut);
        }
        if(player2.send(balanceToPayOut) == false) {
            balanceToWithdrawPlayer2 += balanceToPayOut;
        } else {
            emit PayoutSuccess(player2, balanceToPayOut);
        }

    }

    // Play methods

    function move(uint8 seq, uint8 x, uint8 y) public {
        require(board[x][y] == address(0));
        require(!gameOver, "Game has ended.");
        require(msg.sender == state.whoseTurn, "Not your turn.");
        assert(x < boardSize);
        assert(y < boardSize);
        board[x][y] = msg.sender;
        movesCounter++;
        require(state.seq == seq, "Incorrect sequence number.");

        for(uint8 i = 0; i < boardSize; i++) {
            if(board[i][y] != state.whoseTurn) {
                break;
            }
            //win
            if(i == boardSize - 1) {
                //winner
                setWinner(state.whoseTurn);
                return;
            }
        }
        
        for( i = 0; i < boardSize; i++) {
            if(board[x][i] != state.whoseTurn) {
                break;
            }
            //win

            if(i == boardSize - 1) {
                //winner
                setWinner(state.whoseTurn);
                return;
            }
        }

        //diagonale
        if(x == y) {
            for( i = 0; i < boardSize; i++) {
                if(board[i][i] != state.whoseTurn) {
                    break;
                }
                //win
                if(i == boardSize - 1) {
                    //winner
                    setWinner(state.whoseTurn);
                    return;
                }
            }
        }

        //anti-diagonale
        if((x+y) == boardSize-1) {
            for( i = 0; i < boardSize; i++) {
                if(board[i][(boardSize-1)-i] != state.whoseTurn) {
                    break;
                }
                //win

                if(i == boardSize - 1) {
                    //winner
                    setWinner(state.whoseTurn);
                    return;
                }
            }
        }

        //draw
        if(movesCounter == (boardSize**2)) {
            //draw
            setDraw();
            return;
        }
        
        state.whoseTurn = opponentOf(msg.sender);
        state.seq += 1;

        // Clear timeout
        timeout = 2**256 - 1;
        
        emit MoveMade(msg.sender, seq, x,y);
    }

    function moveFromState(uint8 seq, bytes sig,bytes32 messageHash, uint8 x,uint8 y) public {
        require(msg.sender == player1 || msg.sender == player2, "Not a player in this game");
        require(seq >= state.seq, "Sequence number cannot go backwards.");
        require(recoverSigner(messageHash, sig) ==(msg.sender),"Invalid Input");

        state.seq = seq;
        state.whoseTurn = msg.sender;

        move(seq, x,y);
    }

    function opponentOf(address player) internal view returns (address) {
        require(player2 != 0, "Game has not started.");

        if (player == player1) {
            return player2;
        } else if (player == player2) {
            return player1;
        } else {
            revert("Invalid player.");
        }
    }


    // Timeout methods

    function startTimeout() public {
        require(!gameOver, "Game has ended.");
        require(state.whoseTurn == opponentOf(msg.sender),
            "Cannot start a timeout on yourself.");

        timeout = now + timeoutInterval;
        emit TimeoutStarted();
    }

    function claimTimeout() public {
        require(!gameOver, "Game has ended.");
        require(now >= timeout);

        gameOver = true;
        opponentOf(state.whoseTurn).transfer(address(this).balance);
    }


    // Signature methods

    function splitSignature(bytes sig)
        internal
        pure
        returns (uint8, bytes32, bytes32)
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes sig)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    // Builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256("\x19Ethereum Signed Message:\n32", hash);
    }
}