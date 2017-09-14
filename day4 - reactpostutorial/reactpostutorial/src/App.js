import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
        < CoffeeClass />
    );
  }
}

class CoffeeClass extends Component {

  constructor(props) {
    super(props);
    this.state = {coffeeTypes : [
    {name:"Arabica", description: "Arabica's flavor profile varies from being sweet, soft, tangy, floral, smooth, fruity, and bright. Arabica grown in the mountainous Cordillera region is generally acidic and sweet to the taste, while those in Mindanao has a bittersweet taste and floral aroma. Some of the best Arabica coffee comes from the provinces of Benguet, Sagada, Ifugao, and Mt. Matutum.", price: 200, imageid: "arabica"},
    {name: "Robusta", description: "Robusta thrives in lowlands like in Cavite, Bulacan, and Mindoro. With its high caffeine content, Robusta has a sharper flavor and a burnt or woody aftertaste, and its flavor profile is also likened to chocolate. It is also used for the luxury civet coffee in Indonesia and the Philippines, as well as most Vietnamese coffee.", price: 140, imageid: "robusta"},
    {name: "Barako", description: "Abundant in the provinces of Batangas, Cavite, and Quezon, Barako is the most famous variation of Liberica in the Philippines. This type of coffee has a distinct aroma and strong woody taste with high natural acidity. It commonly uses the drip and French presses as its method of extraction.", price: 180, imageid: "liberica"},
    {name: "Excelsa", description: "Pure Excelsa has a distinct sweet and fruity flavor that is somewhat like jackfruit. However, its aroma is more prominent than its taste. It is commonly cultivated in the mountains of Batangas and Quezon, and in Sorsogon, Bicol region.", price: 160, imageid: "excelsa"} ] ,
    coffeeQty: 0, coffeeTotal: 0 };
    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(price) {
    this.setState({coffeeTotal: this.state.coffeeTotal + price});
  }

  render() {
    var that = this;
    var coffeeTypes = this.state.coffeeTypes.map(function(coffeeType) {
      return(
        <IndivCoffee name={coffeeType.name} description={coffeeType.description} price={coffeeType.price} imageid={coffeeType.imageid} handleChange={that.changeTotal}/>
      );
    });

    return(
      <div className="container">
      {coffeeTypes}
      <Summary coffeeTotal={this.state.coffeeTotal}/>
      </div>
    );
  }
}

class Summary extends Component {
  render() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-bottom" id="fixedbottom">
          <div className="col-xs-12 col-md-9" id="cupdiv">
          <h3 id="cup">CALLE UNO POURS</h3>
          </div>
          <div className="col-xs-12 col-md-3" id="totaldiv">
          <h3 id="total">TOTAL: {this.props.coffeeTotal}</h3>
          </div>
      </div>
    )
  }
}

class IndivCoffee extends Component {
  constructor(props) {
    super(props);
    this.state = {coffeeQty:0, coffeeTotal: 0, coffeeSubtotal: 0};
    this.moreQty = this.moreQty.bind(this);
    this.lessQty = this.lessQty.bind(this);
  }
    moreQty() {
      this.setState({coffeeQty: this.state.coffeeQty + 1});
      this.props.handleChange(this.props.price);
    }
    lessQty() {
      this.setState({coffeeQty: this.state.coffeeQty - 1});
      this.props.handleChange(-this.props.price);
      if (this.state.coffeeQty < 0)
      return alert("Error! Orders can't be less than 0");
    }

  render() {
    return (
      <div className="col-xs-12 col-md-3">
      <br/>
          <img src={process.env.PUBLIC_URL + '/images/'+ this.props.imageid +'.jpg'} style={{width:"100%"}}/>
          <h4>{this.props.name}, P{this.props.price} per 500g</h4>
          <p>{this.props.description}</p>
      <br/>
          <h5>{this.state.coffeeQty} orders of {this.props.name}</h5>
          <button onClick = {this.moreQty} id="buttonqty"> + </button> &nbsp;
          <button onClick = {this.lessQty} id="buttonqty"> - </button>
      </div>
      );
  }
}

export default CoffeeClass;
