import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Account extends Component {
constructor(props) {
  super(props);
  this.state = {name:"Aren", balance: 100000};
  this.withdraw = this.withdraw.bind(this);
  this.deposit = this.deposit.bind(this);
}

withdraw(e) {
  e.preventDefault();
  var amount = parseInt(this.refs.amount.value);
  this.setState({balance: this.state.balance - amount})
}

deposit(e) {
  e.preventDefault();
  var amount = parseInt(this.refs.amount.value);
  this.setState({balance: this.state.balance + amount})
}

render() {
  return (
      <div className="container">
      <h1>{this.state.name} has ${this.state.balance}</h1>
      <form>
          <input type="text" ref="amount" placeholder="Input Amount Here"></input> &nbsp;
          <button onClick={this.withdraw} className="btn btn-primary">Withdraw</button>&nbsp;<button onClick={this.deposit} className="btn btn-primary">Deposit</button>
      </form>
    </div>
  );
}
}

export default Account;
