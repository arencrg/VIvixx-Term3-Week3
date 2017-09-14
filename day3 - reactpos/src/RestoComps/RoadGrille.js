import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


class RoadGrille extends Component {

  constructor(props) {
    super(props);
    this.state = { restoRoadGrille : [ {code: 1, name: "Grilled Pork Ribs", price: 185 },
      {code: 2, name: "Grilled Quarter Chicken", price: 105 },
      {code: 3, name: "Grilled Hungarian Sausage", price: 115 },
      {code: 4, name: "SquadGoal Bundle (good for 4-6 persons)", price: 985 },
      {code: 5, name: "Chicken Wings", price: 175 },
      {code: 6, name: "Poutine", price: 115 },
      {code: 7, name: "Fries", price: 65 },
      {code: 8, name: "Grilled Corn", price: 55 },
      {code: 9, name: "Coleslaw", price: 45 },
      {code: 10, name: "Rice", price: 20 },
      {code: 11, name: "Deep Fried Ice Cream", price: 125 },
      {code: 12, name: "Mineshine Milk Tea", price: 55 },
      {code: 13, name: "Sola Iced Tea", price: 50 },
      {code: 14, name: "Mon Passion RTD Coffee", price: 55 },
      {code: 15, name: "Pineapple Juice", price: 40 },
      {code: 16, name: "Soda (in can)", price: 35 },
      {code: 17, name: "Bottled Water", price: 20 },
      {code: 18, name: "Brewed Coffee", price: 30 },
      {code: 19, name: "Italian Soda", price: 65 },
      {code: 20, name: "Regular-sized Square Burger", price: 225 },
      {code: 21, name: "Giant Square Burger", price: 375 },
      {code: 22, name: "Giant Hotdog Sandwich with Fries - single", price: 135 },
      {code: 23, name: "Sausage Sandwich with Fries - single", price: 135 } ] ,
restoRGqty: 0, restoRGtotal: 0 };
    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(price) {
    this.setState({restoRGtotal: this.state.restoRGtotal + price});
  }

  render() {
    var pancit = this;
    var menuitems = this.state.restoRoadGrille.map(function(menuitem) {
      return(
        <RGMenuItem name={menuitem.name} price={menuitem.price} handleChange={pancit.changeTotal}/>
      );
    });

    return(
      <div>
      {menuitems}
      <hr/>
      <RGsummary restoRGtotal={this.state.restoRGtotal}/>
      </div>
    );
  }
}

class RGsummary extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Total: {this.props.restoRGtotal}</h3>
      </div>
    )
  }
}

class RGMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {restoRGqty:0, restoRGtotal: 0};
    this.moreQty = this.moreQty.bind(this);
    this.lessQty = this.lessQty.bind(this);
  }
    moreQty() {
      this.setState({restoRGqty: this.state.restoRGqty + 1});
      this.props.handleChange(this.props.price);
    }
    lessQty() {
      this.setState({restoRGqty: this.state.restoRGqty - 1});
      this.props.handleChange(-this.props.price);
      if (this.state.restoRGqty < 0)
      return alert("Error! Orders can't be less than 0");
    }

  render() {
    return (
      <div className="col-xs-6">
          <h5>{this.props.name}, {this.props.price}
          <br/> {this.state.restoRGqty} orders</h5>
          <button onClick = {this.moreQty}> + </button> &nbsp;
          <button onClick = {this.lessQty}> - </button>
      </div>
      );
  }
}

export default RoadGrille;
