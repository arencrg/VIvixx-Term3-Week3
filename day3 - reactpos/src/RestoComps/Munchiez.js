import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


class Munchiez extends Component {

  constructor(props) {
    super(props);
    this.state = {restoMunchiez : [ {code: 1, name: "Australian Porterhouse Steak", price: 205},
      {code: 2, name: "Australian Ribeye Steak", price: 160},
      {code: 3, name: "Double Ribeye Steak", price: 290},
      {code: 4, name: "Ginger Glazed Chicken Wings - 2pcs with rice", price: 115},
      {code: 5, name: "Ginger Glazed Chicken Wings - 3pcs with rice", price: 135},
      {code: 6, name: "6pcs Ginger Glazed Chicken Wings - Regular", price: 175},
      {code: 7, name: "6pcs Ginger Glazed Chicken Wings - Spicy", price: 185} ] ,
restoMqty: 0, restoMtotal: 0,};
    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(price) {
    this.setState({restoMtotal: this.state.restoMtotal + price});
  }

  render() {
    var pancit = this;
    var menuitems = this.state.restoMunchiez.map(function(menuitem) {
      return(
        <MMenuItem name={menuitem.name} price={menuitem.price} handleChange={pancit.changeTotal}/>
      );
    });

    return(
      <div>
      {menuitems}
      <hr/>
      <Msummary restoMtotal={this.state.restoMtotal}/>
      </div>
    );
  }
}

class Msummary extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Total: {this.props.restoMtotal}</h3>
      </div>
    )
  }
}

class MMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {restoMqty:0, restoMtotal: 0};
    this.moreQty = this.moreQty.bind(this);
    this.lessQty = this.lessQty.bind(this);
  }
    moreQty() {
      this.setState({restoMqty: this.state.restoMqty + 1});
      this.props.handleChange(this.props.price);
    }
    lessQty() {
      this.setState({restoMqty: this.state.restoMqty - 1});
      this.props.handleChange(-this.props.price);
      if (this.state.restoMqty < 0)
      return alert("Error! Orders can't be less than 0");
    }

  render() {
    return (
      <div className="col-xs-6">
          <h5>{this.props.name}, {this.props.price}
          <br/> {this.state.restoMqty} orders</h5>
          <button onClick = {this.moreQty}> + </button> &nbsp;
          <button onClick = {this.lessQty}> - </button>
      </div>
      );
  }
}

export default Munchiez;
