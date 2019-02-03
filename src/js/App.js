import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

// for price data at CryptoCompare
import axios from 'axios'

// for replacing MetaMask usage (bad for adoption to need to download extensions)
import Fortmatic from 'fortmatic';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { // using component's state for App
      account: '0x0', // account connected
      balance: 0, // account connected balance in ETH
      questions: [], // all questions
      tokenContractInstance: null,
    }

    ///////////////////////////////////////////////////////////
    /////////////////////// Fortmatic /////////////////////////
    ///////////////////////////////////////////////////////////

    // --------------------------------------------------------
    // (1/2 options) With Fortmatic's API you don't need
    // users of the dApp to install MetaMask and have that 
    // wallet backed up somewhere, as this API uses phone 
    // numbers that creates a wallet on Fortmatic servers.
    // (look into phone usage as a possible vulnerability)
    //
    // the reason for the lesser amount of elegance in this
    // option is because instead of removing the tedious
    // activities of manually updating the ABI and address,
    // we need to as programmers do this by copying and pasting
    // from a solidity compiler. But this is for now the only 
    // way to use Fortmatic. 
    //
    // this un-elegant soltion includes: 
    //
    // 1.   configuring web3 in order to have something
    //      that can talk to the BC:
    // 1.1. create a new instance of the Fortmatic object with
    //      the API keys (test keys!). "const fm = new Fortmatic('YOUR_API_KEY');"
    // 1.2. with the instance get its provider and instantiate a new
    //      web3 instance with that provider. "window.web3 = new Web3(fm.getProvider());"
    //      
    // 2.   Request user login if needed. "web3.currentProvider.enable();"
    // 
    // 3.   set up smart contract for interfacing with front-end.
    // 3.1. get and set the contract ABI by simply copying it and pasting it.
    //      "const erc20TokenContractAbi = [SMART_CONTRACT_ABI]".
    // 3.2. create a contract object. "const tokenContract = web3.eth.contract(erc20TokenContractAbi);"
    // 3.3. Instantiate contract. "const tokenContractInstance = tokenContract.at("CONTRACT_ADDRESS_GOES_HERE")"
    // ---------------------------------------------------------

    // 1.
    // 1.1.
    const fm = new Fortmatic('pk_test_2DCE57A1B9040F2F');
    // 1.2.
    window.web3 = new Web3(fm.getProvider());

    // 2. Request user login if needed, returns current user account address
    web3.currentProvider.enable();

    web3.eth.defaultAccount = web3.eth.accounts[0]

    // for moving funds around.
    fm.transactions.send({
      amount: '0.00172',
      // to: '0xd992f489468ca9d7dc68c70c62362668d0559b8f'
      // to: '0x44542139d30AB308a5779B3BfE88cdE3239213eE'
      // to: '0x870641C09FF136AEEA1bB01A0CfE5a604F7B788C'
      // to: '0xB19B235085D2259A2E408a8a6A2A78D425533E79'
      to: '0xebece42cbea4bc00192596ff9ce82cf555bd4e74'
    });

    // bind the component's functions to its scope
    this.answerQuestion = this.answerQuestion.bind(this);
    // this.setStateAnswer = this.setStateAnswer.bind(this);

    ////////////////////////////////////////////////////////////////
    /////////////////////// Fortmatic //////////////////////////////
    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    /////////////////////// Gregory ////////////////////////////////
    /////////////////////// from ///////////////////////////////////
    /////////////////////// dApp ///////////////////////////////////
    /////////////////////// university /////////////////////////////
    ////////////////////////////////////////////////////////////////

    // -------------------------------------------------------------
    // (2/2 options) with dApp uni, we use "TruffleContract" 
    // object that is a more eligant solution (it automatically 
    // updates ABI and contract address as you change it)
    // 
    // for this option: the reason for the elegance behind the
    // solution is once you have the if-else-web3-provider pattern:
    // 
    // 1.   configure web3 in order to have something that can 
    //      talk to the BC:
    // 1.1. if there is web3, use current one (MetaMask), else, 
    //      create new one with HttpProvider(7545). 
    //      "if (typeof web3 != 'undefined') { 
    //         this.web3Provider = web3.currentProvider
    //       } else {  
    //         this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    //       }"
    // 1.2. use configured web3 to create a new instance of the
    //      Web3 object. "this.web3 = new Web3(this.web3Provider)"
    //
    // 2. "this.election = TruffleContract(Election)", where 
    // "Election" is a dynamically changing ABI of the contract due
    // to the Truffle framework, and this line of code also includes
    // updating the changing address of the contract.
    //
    // 3. set the provider for the contract to with the same 
    //    configuration as in 1. "this.election.SetProvider(this.web3Provider)"
    // 
    // below is the full code of this option 2/2.
    // -------------------------------------------------------------

    // 1.
    // 1.1. specify which node/website (provider) is used to interct with BC.
    // if (typeof web3 != 'undefined') { // setting up web3
      //// get the provider currently injected into DOM (is it in the DOM?) this will be Metamask
      // this.web3Provider = web3.currentProvider
    // } else { // if there is no web3 provider, 
      // this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    // }

    // 1.2. this.web3 = new Web3(this.web3Provider)

    // 2. create a Truffle contract of the eligant (above) Election JSON
    // this.election = TruffleContract(Election)

    // 3. set the provider (the node/website used to interact with BC.)
    // this.election.setProvider(this.web3Provider)

    // bind the component's functions to its scope
    // ...
    
    ////////////////////////////////////////////////////////////////
    /////////////////////// Gregory ////////////////////////////////
    /////////////////////// from ///////////////////////////////////
    /////////////////////// dApp ///////////////////////////////////
    /////////////////////// university /////////////////////////////
    ////////////////////////////////////////////////////////////////
  }

  onUpdateParent = val => {
    this.setState({
      fieldVal: val
    });
  }

  componentDidMount() {
    ////////////////////////////////////////////////////////////////
    /////////////////////// Fortmatic //////////////////////////////
    ////////////////////////////////////////////////////////////////

    // 3.1. Get the contract ABI from compiled smart contract json
    const cryptoCademyContractAbi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      }
    ],
    "name": "grantStudent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "questions",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "question",
        "type": "string"
      },
      {
        "name": "answer",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "selfdestruct",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "questionAndAnswerCount",
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
        "name": "q",
        "type": "string"
      },
      {
        "name": "a",
        "type": "bytes32"
      }
    ],
    "name": "addQuestion",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getQuestionsCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "answer",
        "type": "bytes"
      },
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "answerQ",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  }
]

    // 3.2. Create contract object
    const cryptoCademyContract = web3.eth.contract(cryptoCademyContractAbi);
      
    // 3.3. Instantiate contract
    const tokenContractInstance = cryptoCademyContract.at('0xebece42cbea4bc00192596ff9ce82cf555bd4e74');


    console.log(tokenContractInstance);
    this.setState({ tokenContractInstance: tokenContractInstance });

    // Sync functions that returns users' addresses if they are already logged in with enable().
    // Not recommended as sync functions will be deprecated in web3 1.0
    // console.log(web3.eth.accounts); // ['0x...']
    // console.log(web3.eth.coinbase); // '0x...'

    // Async functions that triggers login modal, if user not already logged in
    // web3.eth.getAccounts(function(error, accounts) {
    //   if (error) throw error;
    //   console.log(accounts); // ['0x...']
    // });
    // web3.eth.getCoinbase(function(error, coinbase) {
    //   if (error) throw error;
    //   this.setState({ account: coinbase });
    //   console.log(coinbase); // '0x...'
    // });

    // short lesson on asyncronous funcrions in JavaScript:
    // ------------------------------------------------------------------------
    // JS has a type of function called asynchronous, these are different
    // from conventional functions that are syncronous (these functions simply
    // return/void things that are immediately achieved or accessed, such as 
    // local storage). Asyncronous functions, are functions that work on things
    // not immediately accessible, such as remote storage/a blockchain, so we 
    // work with the results only when they are available in the future because
    // of the delay when returning their results.
    // ------------------------------------------------------------------------

    web3.eth.getCoinbase((err, coinbase) => {
      this.setState({ account: coinbase })
      web3.eth.defaultAccount = coinbase
      web3.eth.getBalance(this.state.account, (err, balance) => {
        console.log(web3.fromWei(balance, "ether").toNumber())
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ZAR').then( res => {
        balance = web3.fromWei(balance, "ether") * res.data['ZAR']
          this.setState({ balance: balance })
        })
      });

      tokenContractInstance.questionAndAnswerCount((err, questionAndAnswerCount) => {
        for (var i = 1; i <= questionAndAnswerCount; i++) {
          tokenContractInstance.questions(i, (err, question) => {
            const questions = [...this.state.questions]
            questions.push({
              id: question[0],
              question: question[1],
            });
            this.setState({ questions: questions })
          });
        }
      })
    })

    ////////////////////////////////////////////////////////////////
    /////////////////////// Fortmatic //////////////////////////////
    ////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////
    /////////////////////// Gregory ////////////////////////////////
    /////////////////////// from ///////////////////////////////////
    /////////////////////// dApp ///////////////////////////////////
    /////////////////////// university /////////////////////////////
    ////////////////////////////////////////////////////////////////

    // this.web3.eth.getCoinbase((err, account) =>{
    //   this.setState({ account })
    //   // this
    //   this.web3.eth.getBalance(this.state.account, (err, balance) => {
    //     axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ZAR').then(res=>{
    //       balance = this.web3.fromWei(balance, "ether") * res.data['ZAR']
    //       this.setState({ balance: balance })
    //     })
    //   });
    //   this.election.deployed().then((electionInstance) => {
    //     this.electionInstance = electionInstance
    //     this.electionInstance.questionAndAnswerCount().then((questionAndAnswerCount) => {
    //       for (var i = 1; i <= questionAndAnswerCount; i++) {
    //         this.electionInstance.questions(i).then((question) => {
    //           const questions = [...this.state.questions]
    //           questions.push({
    //             id: question[0],
    //             question: question[1],
    //             // option1: this.web3.toAscii(question[2]),
    //             // option2: this.web3.toAscii(question[3]),
    //             // option3: this.web3.toAscii(question[4]),
    //             // answer: this.web3.toAscii(question[5])
    //           });
    //           this.setState({ questions: questions })
    //         });
    //       }
    //     })
    //   })
    // })

    ////////////////////////////////////////////////////////////////
    /////////////////////// Gregory ////////////////////////////////
    /////////////////////// from ///////////////////////////////////
    /////////////////////// dApp ///////////////////////////////////
    /////////////////////// university /////////////////////////////
    ////////////////////////////////////////////////////////////////
  }

  answerQuestion(qId, answer){
    console.log(qId);
    console.log('Hello World?1')
    console.log(answer);
    console.log(typeof(answer));
    console.log(typeof(qId));
    console.log('Hello World?2')
    qId += 1;
    this.state.tokenContractInstance.answerQ("0x70726f6f66206f6620776f726b", 1, { from: this.state.account }, (error, result) => {
      if (error) throw error;
      console.log(result);
    });
  }

  render() {
    return (
      <Content 
        answer={ this.state.answer }
        account={ this.state.account }
        balance={ this.state.balance }  
        questions={ this.state.questions }
        answerQuestion={ this.answerQuestion }
        setStateAnswer={ this.setStateAnswer }
        onUpdate={ this.onUpdateParent }
      />
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
