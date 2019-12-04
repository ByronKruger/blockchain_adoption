import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Quiz.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

// for price data at CryptoCompare
import axios from 'axios'

// for replacing MetaMask usage (bad for adoption to need to download extensions)
// import Fortmatic from 'fortmatic';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { // using component's state for App
      account: '0x0', // account connected
      balance: 0, // account connected balance in ETH
      questions: [], // all questions
      tokenContractInstance: null,
    };

    this.answerQuestion = this.answerQuestion.bind(this);

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
    // ethereum.enable();
    // 1.
    // 1.1. specify which node/website (provider) is used to interct with BC.
    if (typeof web3 != 'undefined') { // setting up web3
      // get the provider currently injected into DOM (is it in the DOM?) this will be Metamask
      this.web3Provider = web3.currentProvider
    } else { // if there is no web3 provider, 
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
      // this.web3 = new Web3(this.web3Provider) // 1.2
    }

    // 1.2. this.web3 = new Web3(this.web3Provider)
    this.web3 = new Web3(this.web3Provider)

    // 2. create a Truffle contract of the eligant (above) Election JSON
    this.election = TruffleContract(Election)

    // 3. set the provider (the node/website used to interact with BC.)
    this.election.setProvider(this.web3Provider)

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
    this.web3.eth.getCoinbase((err, account) =>{
      this.setState({ account });
      // this
      this.web3.eth.getBalance(this.state.account, (err, balance) => {
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ZAR').then(res=>{
          balance = this.web3.fromWei(balance, "ether") * res.data['ZAR']
          this.setState({ balance: balance })
        })
      });
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance;
        // this.setState({ electionInstance });
        this.electionInstance.questionAndAnswerCount().then((questionAndAnswerCount) => {
          for (var i = 1; i <= questionAndAnswerCount; i++) {
            this.electionInstance.questions(i).then((question) => {
              const questions = [...this.state.questions]
              questions.push({
                id: question[0],
                question: question[1],
                // option1: this.web3.toAscii(question[2]),
                // option2: this.web3.toAscii(question[3]),
                // option3: this.web3.toAscii(question[4]),
                // answer: this.web3.toAscii(question[5])
              });
              this.setState({ questions: questions })
            });
          }
        });
      });
    })
  }

  answerQuestion(qId, answer){
    // this.electionInstance.questionAndAnswerCount().then((res)=>{
    //   console.log(res);
    // });
    // this.election.deployed().then((electionInstance) => {
    //   electionInstance.questionAndAnswerCount().then((ans)=>{
    //     console.log("ans");
    //     console.log(ans);
    //   })
    //   // this.electionInstance = electionInstance;
        
    //   // })
    // });
    this.web3.eth.getCoinbase((error, account)=>{
      console.log(qId);
      console.log('Hello World?1')
      console.log(answer);
      console.log(typeof(answer));
      console.log(typeof(qId));
      console.log('Hello World?2')
      qId += 1;
      console.log("this.electionInstance");
      console.log(this.electionInstance);
      console.log("account");
      console.log(account);
      this.electionInstance.answerQ("0x70726f6f66206f6620776f726b", 1, { from: account }).then((err, result) => {
        if (err) throw err;
        console.log(result);
      });
    })
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
