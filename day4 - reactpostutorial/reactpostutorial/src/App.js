import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="container">
        < CoffeeClass />
      </div>
    );
  }
}

class CoffeeClass extends Component {

  constructor(props) {
    super(props);
    this.state = {coffeeTypes : [
    {name:"Arabica, 500g", description: "Arabica's flavor profile varies from being sweet, soft, tangy, floral, smooth, fruity, and bright. Arabica is one of the best-known and widely consumed coffees in the world. It is mainly cultivated in high altitude areas. Arabica grown in the mountainous Cordillera region is generally acidic and sweet to the taste, while those in Mindanao has a bittersweet taste and floral aroma. Some of the best Arabica coffee comes from the provinces of Benguet, Sagada, Ifugao, and Mt. Matutum.", price: 200, imageid: "arabica"},
    {name: "Robusta, 500g", description: "Robusta is usually bitter and strong. It thrives in lowlands like in Cavite, Bulacan, and Mindoro. With its high caffeine content, Robusta has a sharper flavor and a burnt or woody aftertaste, and its flavor profile is also likened to chocolate. Despite being one of the most commercialized types of coffee, Robusta has been slowly raising its profile to the level of Arabica and other gourmet coffees. It is also used for the luxury civet coffee in Indonesia and the Philippines, as well as most Vietnamese coffee.", price: 140, imageid: "robusta"},
    {name: "Barako, 500g", description: "Abundant in the provinces of Batangas, Cavite, and Quezon, Barako is the most famous variation of Liberica in the Philippines. This type of coffee has a distinct aroma and strong woody taste with high natural acidity. It commonly uses the drip and French presses as its method of extraction.", price: 180, imageid: "liberica"},
    {name: "Excelsa, 500g", description: "Pure Excelsa has a distinct sweet and fruity flavor that is somewhat like jackfruit. However, its aroma is more prominent than its taste. It is commonly cultivated in the mountains of Batangas and Quezon, and in Sorsogon, Bicol region.", price: 160, imageid: "excelsa"} ] ,
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
      <div className="col-md-9">
      {coffeeTypes}
      </div>
      <div className="col-md-3">
      <Summary coffeeTotal={this.state.coffeeTotal}/>
      </div>
      </div>
    );
  }
}

class Summary extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Total: {this.props.coffeeTotal}</h3>
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
      <div className="col-xs-6">
          <h4>{this.props.name}, {this.props.price}</h4>
          <p>{this.props.description}</p>
          <img src={process.env.PUBLIC_URL + '/images/'+ this.props.imageid +'.jpg'} style={{height:"200px"}}/>
          <br/>

          <h5>{this.state.coffeeQty} orders of {this.props.name}</h5>
          <button onClick = {this.moreQty}> + </button> &nbsp;
          <button onClick = {this.lessQty}> - </button>
      </div>
      );
  }
}

export default CoffeeClass;
