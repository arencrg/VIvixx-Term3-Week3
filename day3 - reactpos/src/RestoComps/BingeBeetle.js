import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


class BingeBeetle extends Component {

  constructor(props) {
    super(props);
    this.state = {restoBingeBeetle : [ {name: "Pasta Pomodoro", price: 129},
          {name: "Honey Mustard Chicken", price: 129},
          {name: "Cheesy Chicken", price: 129},
          {name: "Sloppy Joes", price: 129},
          {name: "German Franks/Cheesy Franks", price: 99},
          {name: "Lechon Kawali", price: 99},
          {name: "Popcorn Chicken", price: 85},
          {name: "Turon a la Mode", price: 65},
          {name: "Bacon Ice Cream - Single Scoop", price: 55},
          {name: "Bacon Ice Cream - Double Scoop", price: 75},
          {name: "Ice Cream Cookie Cups", price: 65},
          {name: "Cheesecake Springrolls", price: 90} ] ,
    restoBBqty: 0, restoBBtotal: 0, };
    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(price) {
    this.setState({restoBBtotal: this.state.restoBBtotal + price});
  }

  render() {
    var pancit = this;
    var menuitems = this.state.restoBingeBeetle.map(function(menuitem) {
      return(
        <BBMenuItem name={menuitem.name} price={menuitem.price} handleChange={pancit.changeTotal}/>
      );
    });

    return(
      <div>
      {menuitems}
      <hr/>
      <BBsummary restoBBtotal={this.state.restoBBtotal}/>
      </div>
    );
  }
}

class BBsummary extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Total: {this.props.restoBBtotal}</h3>
      </div>
    )
  }
}

class BBMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {restoBBqty:0, restoBBtotal: 0};
    this.moreQty = this.moreQty.bind(this);
    this.lessQty = this.lessQty.bind(this);
  }
    moreQty() {
      this.setState({restoBBqty: this.state.restoBBqty + 1});
      this.props.handleChange(this.props.price);
    }
    lessQty() {
      this.setState({restoBBqty: this.state.restoBBqty - 1});
      this.props.handleChange(-this.props.price);
      if (this.state.restoBBqty < 0)
      return alert("Error! Orders can't be less than 0");
    }

  render() {
    return (
      <div className="col-xs-6">
          <h5>{this.props.name}, {this.props.price}
          <br/> {this.state.restoBBqty} orders</h5>
          <button onClick = {this.moreQty}> + </button> &nbsp;
          <button onClick = {this.lessQty}> - </button>
      </div>
      );
  }
}

export default BingeBeetle;
