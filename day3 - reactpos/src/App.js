import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BingeBeetle from './RestoComps/BingeBeetle'
import Munchiez from './RestoComps/Munchiez'
import Pendong from './RestoComps/Pendong'
import RoadGrille from './RestoComps/RoadGrille'
import Yamashita from './RestoComps/Yamashita'

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {superTotal:0, superQty:0 };
      this.superTotal = this.superTotal.bind(this);
      this.superTotal = this.superTotal.bind(this);
    }

    superTotal() {
      this.setState({superTotal: this.state.restoBBtotal + this.state.restoMtotal + this.state.restoPGtotal + this.state.restoRGtotal + this.state.restoYtotal});
    }
    superQty() {
      this.setState({superQty: this.state.restoBBqty + this.state.restoMqty + this.state.restoPGqty + this.state.restoRGqty + this.state.restoYqty});
    }

  render() {
    var pancit = this;
    return (
      <div className="App">
      <div>
      < SuperSummary superTotal={this.state.superTotal} superQty={this.state.superQty} />
      </div>
      <div className="col-xs-12 col-md-6">
      <h1>Binge Beetle</h1>
        <BingeBeetle />
      </div>
      <div className="col-xs-12 col-md-6">
      <h1>Munchiez</h1>
        <Munchiez />
      </div>
      <div className="col-xs-12 col-md-6">
      <h1>Pendong</h1>
        <Pendong />
      </div>
      <div className="col-xs-12 col-md-6">
      <h1>Road Grille</h1>
        <RoadGrille />
      </div>
      <div className="col-xs-12 col-md-6">
      <h1>Yamashita</h1>
        <Yamashita />
      </div>
      </div>
    );
  }
}

class SuperSummary extends Component {
render() {
return (
  <div className="col-md-12">
    <h3>Super Total: {this.props.superTotal}</h3>
    <h3>Qty Total: {this.props.superQty}</h3>
  </div>
)
}
}

export default App;
