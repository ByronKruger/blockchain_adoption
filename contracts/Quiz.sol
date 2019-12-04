pragma solidity ^0.5.0;

contract Quiz {
    
    Blacklist bl;
    
    struct questionAndAnswer {
        uint id;
        string question;
        bytes32 answer;
    }
    
    // Store questionAndAnswer count
    uint public questionAndAnswerCount;
    
    // the set of questions and their answers.
    mapping (uint => questionAndAnswer) public questions;
    
    // the set of users (not necessarily students.)
    mapping (address => User) users;
     
    // address of the owner/principle with special rights (granting user a student.)
    address principle; 
    
    // 
    struct User {

        bool student;
    }
    
    function isAddrOnBlacklist(address queryAddress) public returns (bool){

        return bl.getBlackListed(queryAddress);
    }

    function getQuestionsCount() public returns (uint){

        return questionAndAnswerCount;
    }
    
    //grant a user to be a student (We don't want experts to take quizes)
    function grantStudent(address to) public {
        // =only the principle is allowed to grant a user to be a student
        require(
            msg.sender == principle,
            "Only Crypto principle may grant a user a student."
        );
        // grant user to be a strudent
        users[to].student = true;
    }

    // function answerQ(bytes memory answer, uint id) public { // answer a question
    function answerQ(uint answer, uint id) public { // answer a question
        /* Every exchange, wallet, game, etc. using smart contracts must use this code to prevent 
           supposed criminals from conducting any transactions.
           Checks to see if an address is on the ONE blacklist.*/
        bool isOnBlacklist = isAddrOnBlacklist(msg.sender);
        require(isOnBlacklist == false);
        /* Ends here.*/

        // require( // principle is not allowed to answer questions.
        //     msg.sender != principle,
        //     "Principle is not allowed to answer questions, they're experts."    
        // );
        
        // require( // user must be a granted student (no experts).
        //     users[msg.sender].student,
        //     "Other users may not answer questions, they are probably experts."
        // );

        questionAndAnswer memory myQuestionAndAnswer = questions[id];
        
        // bytes32 studentsAnswer = sha256(answer);
        
        uint a = 0;

        if (answer == 1){
            a = 1;
        } else {
            a = 2;
        }

        // if((studentsAnswer) == (myQuestionAndAnswer.answer)){
        //     msg.sender.transfer(1000000000000000); //0.01 ETH
        // }else{
        //     return;
        // }
    }
    
    // add a question
    function addQuestion(string memory q, bytes32 a) public{
        // only crypto principle may add questions
        require(
            msg.sender == principle,
            "Only Crypto principle may add questions."
        );
        questionAndAnswer memory myQuestionAndAnswer = questionAndAnswer(questionAndAnswerCount++, q, a);
        questions[questionAndAnswerCount] = myQuestionAndAnswer;
    }
    
    // Accept any incoming amount to fund the contract.
    function () external payable {}
    
    constructor(address blAddress) public { // create contract, make sender the "owner" of the contract.
        /*
            Every exchange, wallet, game, etc. using smart contract must use this code to prevent 
            supposed criminals from conducting any transactions.
            initialises this smart contract's instance of the ONE blacklist contract.
        */
        bl = Blacklist(blAddress);
        /*
            Ends here.
        */
        principle = msg.sender;
        addQuestion("What consensus algorithm does Bitcoin use?", 0x73B01E93631118159B40599836BB23022CA7AD00C1203D18984CD982654E7F40);
        addQuestion("Normal currencies follow an inflationary price model, Bitcoin follows a ___ price model?", 0x0069A1598BE3E8A3F4EB13B8B3ABEB4F62934EECF21E06E4BD7DD0E954C8F436);
        addQuestion("A blockchain that is strictly private, is just a glorified what?", 0x3549B0028B75D981CDDA2E573E9CB49DEDC200185876DF299F912B79F69DABD8);
        addQuestion("What is the collection of all Ethereum nodes also known as? A world ___?", 0xAA97302150FCE811425CD84537028A5AFBE37E3F1362AD45A51D467E17AFDC9C);
        addQuestion("What process is impossible to conduct on the Bitcoin blockchain, double ___?", 0x262CD7E8D3156B5B97113A373C84D53289DB4530E285D5C8DB3E9874ABC891A9);
        addQuestion("What part of a cryptocurrency wallet must you never expose?", 0xD7CD482CB958EF235F5D26E852472BA1EE5309EAB18E3C6712181A7BFAE80000);
    }

    function selfdestruct() public {
        require(
            msg.sender == principle,
            "Only Crypto principle may destroy the Crypto School."
        );
        selfdestruct();
    }
}

contract Blacklist {
    // function blackAddrsQuery(address queryAddress) public pure returns (bool);
    function getBlackListed(address queryAddress) public returns (bool);
    function appendToBlacklist (address blackAddress) public;
    function requestRemoval (address blackAddress) public;
    function remove (address blackAddress) public;
    function voteForRemoval(address blackAddress, bool vote) public;
    function calcRemovalConsensus (address blackAddress) public returns (uint256);
    function getTimestamp() public returns (uint);
}

// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------

// pragma solidity ^0.5.0;

// contract QuizDapp {
//     Blacklist bl;

//     struct questionAndAnswer {
//         uint id;
//         string question;
//         bytes32 answer;
//     }

//     uint public questionAndAnswerCount; // Store questionAndAnswer count
//     mapping (uint => questionAndAnswer) public questions; // the set of questions and their answers.
//     mapping (address => User) users; // the set of users (not necessarily students.)
//     address principle; // address of the owner/principle with special rights (granting user a student.)
//     struct User {bool student;}

//     function isAddrOnBlacklist(address queryAddress) public returns (bool){

//         return bl.getBlackListed(queryAddress);
//     }
    
//     function getQuestionsCount() public returns (uint){

//         return questionAndAnswerCount;
//     }
    
//     function grantStudent(address to) public { //grant a user to be a student (We don't want experts to take quizes)
//         require( // only the principle is allowed to grant a user to be a student
//             msg.sender == principle,
//             "Only Crypto principle may grant a user a student."
//         );
//         users[to].student = true; // grant user to be a strudent
//     }
    
//     function answerQ(bytes memory answer, uint id) public { // answer a question
//         /*
//             Every exchange, wallet, game, etc. using smart contract must use this code to prevent 
//             supposed criminals from conducting any transactions.
//             Checks to see if an address is on the ONE blacklist.
//         */
//         bool isOnBlacklist = isAddrOnBlacklist(msg.sender);
//         require(isOnBlacklist == false);
//         /*
//             Ends here.
//         */

//         require( // principle is not allowed to answer questions.
//             msg.sender != principle,
//             "Principle is not allowed to answer questions, they're experts."    
//         );
        
//         // require( // user must be a granted student (no experts).
//         //     users[msg.sender].student,
//         //     "Other users may not answer questions, they are probably experts."
//         // );

//         questionAndAnswer memory myQuestionAndAnswer = questions[id];
        
//         bytes32 studentsAnswer = sha256(answer);
        
//         if((studentsAnswer) == (myQuestionAndAnswer.answer)){
//             msg.sender.transfer(1000000000000000); //0.01 ETH
//         }else{
//             return;
//         }
//     }
    
//     function addQuestion(string memory q, bytes32 a) public{ // add a question
//         require( // only crypto principle may add questions
//             msg.sender == principle,
//             "Only Crypto principle may add questions."
//         );
//         questionAndAnswer memory myQuestionAndAnswer = questionAndAnswer(questionAndAnswerCount++, q, a);
//         questions[questionAndAnswerCount] = myQuestionAndAnswer;
//     }
    
//     function () external payable {} // Accept any incoming amount to fund the contract.

//     constructor(address blAddress) public { // create contract, make sender the "owner" of the contract.
//         /*
//             Every exchange, wallet, game, etc. using smart contract must use this code to prevent 
//             supposed criminals from conducting any transactions.
//             initialises this smart contract's instance of the ONE blacklist contract.
//         */
//         bl = Blacklist(blAddress);
//         /*
//             Ends here.
//         */
//         principle = msg.sender;
//         addQuestion("What consensus algorithm does Bitcoin use?", 0x73B01E93631118159B40599836BB23022CA7AD00C1203D18984CD982654E7F40);
//         addQuestion("Normal currencies follow an inflationary price model, Bitcoin follows a ___ price model?", 0x0069A1598BE3E8A3F4EB13B8B3ABEB4F62934EECF21E06E4BD7DD0E954C8F436);
//         addQuestion("A blockchain that is strictly private, is just a glorified what?", 0x3549B0028B75D981CDDA2E573E9CB49DEDC200185876DF299F912B79F69DABD8);
//         addQuestion("What is the collection of all Ethereum nodes also known as? A world ___?", 0xAA97302150FCE811425CD84537028A5AFBE37E3F1362AD45A51D467E17AFDC9C);
//         addQuestion("What process is impossible to conduct on the Bitcoin blockchain, double ___?", 0x262CD7E8D3156B5B97113A373C84D53289DB4530E285D5C8DB3E9874ABC891A9);
//         addQuestion("What part of a cryptocurrency wallet must you never expose?", 0xD7CD482CB958EF235F5D26E852472BA1EE5309EAB18E3C6712181A7BFAE80000);
//     }
    
//     function selfdestruct() public {
//         require(
//             msg.sender == principle,
//             "Only Crypto principle may destroy the Crypto School."
//         );
//         selfdestruct();
//     }
// }
