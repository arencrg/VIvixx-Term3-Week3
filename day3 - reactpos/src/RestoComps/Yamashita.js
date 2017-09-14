import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


class Yamashita extends Component {

  constructor(props) {
    super(props);
    this.state = {
restoYamashita : [  {code: 1, name: "Shoyu Ramen (soy sauce-based)", price: 120 },
      {code: 2, name: "Miso Ramen", price: 140 },
      {code: 3, name: "Shio Ramen (salt-based)", price: 130 },
      {code: 4, name: "Pork Ramen", price: 160 },
      {code: 5, name: "Spicy Ramen", price: 140 },
      {code: 6, name: "Wakame Ramen", price: 130 },
      {code: 7, name: "Miso Corn Butter Ramen", price: 200 },
      {code: 8, name: "Cantonese Noodles", price: 200 },
      {code: 9, name: "Yakisoba", price: 170 },
      {code: 10, name: "Cold Ramen 'Hiyashi Chuka'", price: 190},
      {code: 11, name: "Chicken Curry", price: 160 },
      {code: 12, name: "Karaage Curry (fried chicken)", price: 180 },
      {code: 13, name: "Shrimp Fried Curry", price: 180 },
      {code: 14, name: "Oyakodon (chicken wrapped in egg)", price: 150 },
      {code: 15, name: "Tanindon (pork wrapped in egg)", price: 150 },
      {code: 16, name: "Karaagedon (fried chicken)", price: 150 },
      {code: 17, name: "Yakinikudon (fried beef with special sauce)", price: 190 },
      {code: 18, name: "Shogayakidon (ginger pork)", price: 190 },
      {code: 19, name: "Katsudon (breaded pork with egg)", price: 210 },
      {code: 20, name: "Pork Rice Topping", price: 90 },
      {code: 21, name: "Spicy pork Rice Topping", price: 110},
      {code: 22, name: "Chahan (Japanese Fried Rice)", price: 160 },
      {code: 23, name: "California mango rolls", price: 160 },
      {code: 24, name: "Salad Maki", price: 150 },
      {code: 25, name: "Karaage Rolls", price: 140 },
      {code: 26, name: "Onion Salmon Rolls", price: 170 },
      {code: 27, name: "Tekka Maki (tuna)", price: 150 },
      {code: 28, name: "Salmon Maki", price: 150 },
      {code: 29, name: "Gyoza (Japanese dumplings, 6 pcs)", price: 90 },
      {code: 30, name: "Karaage (fried chicken, 3 pcs)", price: 90 },
      {code: 31, name: "Shrimp Fries with special sauce (4 pcs)", price: 140 },
      {code: 32, name: "Plain Japanese Rice", price: 50 } ] ,
restoYqty: 0, restoYtotal: 0 };
    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(price) {
    this.setState({restoYtotal: this.state.restoYtotal + price});
  }

  render() {
    var pancit = this;
    var menuitems = this.state.restoYamashita.map(function(menuitem) {
      return(
        <YMenuItem name={menuitem.name} price={menuitem.price} handleChange={pancit.changeTotal}/>
      );
    });

    return(
      <div>
      {menuitems}
      <hr/>
      <Ysummary restoYtotal={this.state.restoYtotal}/>
      </div>
    );
  }
}

class Ysummary extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Total: {this.props.restoYtotal}</h3>
      </div>
    )
  }
}

class YMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {restoYqty:0, restoYtotal: 0};
    this.moreQty = this.moreQty.bind(this);
    this.lessQty = this.lessQty.bind(this);
  }
    moreQty() {
      this.setState({restoYqty: this.state.restoYqty + 1});
      this.props.handleChange(this.props.price);
    }
    lessQty() {
      this.setState({restoYqty: this.state.restoYqty - 1});
      this.props.handleChange(-this.props.price);
      if (this.state.restoYqty < 0)
      return alert("Error! Orders can't be less than 0");
    }

  render() {
    return (
      <div className="col-xs-6">
          <h5>{this.props.name}, {this.props.price}
          <br/> {this.state.restoYqty} orders</h5>
          <button onClick = {this.moreQty}> + </button> &nbsp;
          <button onClick = {this.lessQty}> - </button>
      </div>
      );
  }
}

export default Yamashita;
