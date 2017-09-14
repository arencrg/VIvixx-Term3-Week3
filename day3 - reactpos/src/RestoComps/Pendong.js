import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


class Pendong extends Component {

  constructor(props) {
    super(props);
    this.state = { restoPendong : [  {code: 1, name: "Chicken Kebab", price: 145 },
      {code: 2, name: "Chicken Kebab with rice", price: 160 },
      {code: 3, name: "Chicken Kebab with rice and a drink", price: 175 },
      {code: 4, name: "Pork BBQ Platter (10 sticks)", price: 165 },
      {code: 5, name: "Marinated Grilled Porkchop", price: 190 },
      {code: 6, name: "Marinated Grilled Porkchop with a drink", price: 205 },
      {code: 7, name: "Grilled Pork Steak", price: 185 },
      {code: 8, name: "Pork BBQ Meal", price: 105 },
      {code: 9, name: "Pork BBQ Meal with a drink", price: 120 },
      {code: 10, name: "Grilled Pink Salmon", price: 115 },
      {code: 11, name: "Grilled Pink Salmon with a drink", price: 130 },
      {code: 12, name: "Pendong Lemonade Fizz - Green Apple/ Passion Fruit/ Watermelon", price: 60 } ] ,
restoPGqty: 0, restoPGtotal: 0 };
    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(price) {
    this.setState({restoPGtotal: this.state.restoPGtotal + price});
  }

  render() {
    var pancit = this;
    var menuitems = this.state.restoPendong.map(function(menuitem) {
      return(
        <PMenuItem name={menuitem.name} price={menuitem.price} handleChange={pancit.changeTotal}/>
      );
    });

    return(
      <div>
      {menuitems}
      <hr/>
      <Psummary restoPGtotal={this.state.restoPGtotal}/>
      </div>
    );
  }
}

class Psummary extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Total: {this.props.restoPGtotal}</h3>
      </div>
    )
  }
}

class PMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {restoPGqty:0, restoPGtotal: 0};
    this.moreQty = this.moreQty.bind(this);
    this.lessQty = this.lessQty.bind(this);
  }
    moreQty() {
      this.setState({restoPGqty: this.state.restoPGqty + 1});
      this.props.handleChange(this.props.price);
    }
    lessQty() {
      this.setState({restoPGqty: this.state.restoPGqty - 1});
      this.props.handleChange(-this.props.price);
      if (this.state.restoPGqty < 0)
      return alert("Error! Orders can't be less than 0");
    }

  render() {
    return (
      <div className="col-xs-6">
          <h5>{this.props.name}, {this.props.price}
          <br/> {this.state.restoPGqty} orders</h5>
          <button onClick = {this.moreQty}> + </button> &nbsp;
          <button onClick = {this.lessQty}> - </button>
      </div>
      );
  }
}

export default Pendong;
