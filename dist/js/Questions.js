import React from 'react'
import axios from 'axios'

const questionStyle = {
  border: '1px solid #bcbcbc',
  textAlign: 'center',
  background: 'white',
  // border-radius: 5px
  borderRadius: '15px',
  marginBottom: '15px',
  padding: '15px',
};

const colorGreen = {
  color: 'green',
}

class Questions extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      fieldValChild: ''
    };

    this.updateValues = this.updateValues.bind(this);
  }

  updateValues = e => {
    // console.log("h")
    console.log(e.target.value);
    // console.log("a")
    // this.props.onUpdate(e.target.value);
    this.setState({
      fieldValChild: e.target.value,
    });
  }

  render(){
    return(
      <div>
        {this.props.questions.map((question) => {
          return(
            <div>
            <form style={ questionStyle }
                  onSubmit={ (event) => {
                    event.preventDefault()
                    this.props.answerQuestion(question.id.toNumber(), this.state.fieldValChild)
                  }}
            >
              <h4><strong>{ question.question }</strong></h4>
              <label>
                <input onChange={this.updateValues} type="text"/>
              </label>
              <div className="form-group">
                <button className="btn btn-primary mt-2" type="submit">
                  Answer
                </button>
              </div>
              <div className="container">
              <div className="row">
                
              </div>
            </div>
            </form>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Questions

// onSubmit={ (event) => {
//                     event.preventDefault()
//                     // this.props.setStateAnswer(this.refs.usersAnswer.value)
//                     // console.log("h")
//                     console.log(this.refs.usersAnswer.value)
//                     // console.log("a")
//                     this.props.answerQuestion(this.refs.usersAnswer.getDOMNode().value)
//                   }}

// <input type="text" onChange={ this.props.answerQuestion("Hello") } />

// <div className="col-xs-4 pull-left" style={ colorGreen }>For R10.00</div>
// <div className="col-xs-4"></div>
// <div className="col-xs-4 pull-right" style={ colorGreen }>R111.00</div>

// // 15-23
// //map through candidates and list them out

// class Table extends React.Component {
//   render() {
//     return (
//       <table class='table'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Votes</th>
//           </tr>
//         </thead>
//         <tbody >
//           {this.props.candidates.map((candidate) => {
//             return(
//               <tr>
//                 <th>{candidate.id.toNumber()}</th>
//                 <td>{candidate.name}</td>
//                 <td>{candidate.voteCount.toNumber()}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     )
//   }
// }

// export default Table
