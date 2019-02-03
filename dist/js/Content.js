import React from 'react'
import Questions from './Questions'

// import styles from './css/wallet.css'

const walletStyle = {
  border: '1px solid #bcbcbc',
  textAlign: 'center',
  background: 'white',
  // border-radius: 5px
  borderRadius: '15px',
  // margin: '5px'
  padding: '0 15px 0 15px',
};

const p = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px',
  textAlign: 'center'
}

const widgets = {
    display: 'flex',
}

class Content extends React.Component {
  render() {
    return (
      <div class="container">
        <div>
          <br></br>
          <h1>Cryptocademy</h1>
          <br></br>
        </div>
        <div class="row" style={widgets}>
          <div class="col-md-3 mr-1" style={ walletStyle }>
            <br></br>
          </div>
          <div class="col-md-5 mr-1" style={ walletStyle }>
              <br></br>
              <h3>Crypto Questions</h3>
              <Questions answer={ this.props.answer }
                         questions={ this.props.questions } 
                         answerQuestion={ this.props.answerQuestion } 
                         setStateAnswer={ this.props.setStateAnswer }
                         onUpdate={ this.onUpdateParent }
              />
          </div>
          <div class="col-md-3" style={ walletStyle }>
            <br></br>
            <p style={p}>Address: <strong><i>{ this.props.account }</i></strong></p>
            <p style={p}>Balance: <strong><i>R { this.props.balance }</i></strong></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Content
