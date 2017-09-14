# This tutorial will guide you in creating a POS using ReactJS

Before we begin, we must make sure that we have all the necessary files installed, such as Node, NPM, all of that, and then we can start.

####    `npm install create-react-app`
        (create-react-app + the name of your app, in this case it's reactpostutorial)
####    `create-react-app reactpostutorial`
####    `cd reactpostutorial`

Your project should look like this:

```
reactpostutorial/
    README.md
    node_modules/
    package.json
    public/
        index.html
        favicon.ico
    src/
        App.css
        App.js
        App.test.js
        index.css
        index.js
        logo.svg
```


After that, we can fire up the app in development mode by typing

#### `npm start`

It will automatically open in [http://localhost:3000](http://localhost:3000) in the browser.

## Now we can start coding for reals!

Personally, I prefer adding Bootstrap and jQuery and everything else I need before I start fiddling with `App.js`, just so I can add the `classNames` to my divs and other elements while I'm working on `App.js`. I won't have to keep going back just to add the `classNames` later on. After we've added the Bootstrap and jQuery CDN, we can open up `App.js` (in the src folder) and start with the good stuff.

Go ahead and delete the default content of the `App` class, maybe but "Hello" or whatever.
Our class will be called `CoffeeClass`, and this is what we'll be calling in our main `App` class. We'll be putting stuff in this class in a bit.

````
    class App extends Component {
      render() {
        return (
            < CoffeeClass />
        );
      }
    }
````

Assuming you already have an array of things you want in your POS, we can start with a new class to display these items. For this tutorial, we'll be filling our array with different types of coffee beans, so I'll name it `CoffeeClass`. We also have to add something that will catch the total price and the quantity of items we will put in our cart, so it should look something like this:

```
class CoffeeClass extends Component {

  constructor(props) {
    super(props);
    this.state = {coffeeTypes : [ {name:"Arabica, 500g", description: "something", price: 200, imageid: "arabica" },
    {name: "Robusta, 500g", description: "something", price: 140, imageid: "robusta" },
    {name: "Barako, 500g", description: "something", price: 180, imageid: "barako" },
    {name: "Excelsa, 500g", description: "something", price: 160, imageid: "excelsa" } ] ,
    coffeeQty: 0, coffeeTotal: 0 };
    this.changeTotal = this.changeTotal.bind(this);
    }

    changeTotal(price) {
      this.setState({coffeeTotal: this.state.coffeeTotal + price});
    }

    render() {
    }
  }
```

Leave the `render` part empty for now, we'll need to work on a class that displays each individual item in our store.

```
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
```

Right now you might be thinking, "Woah there, what's all of that?! Slow down!" (And if you aren't, well, ...okay, you can skip this part then).

This new class should have a function that will control the quantity of each order, so a basic `+` and `-` button with `onClick` events with our `moreQty()` and `lessQty()` functions will do. These functions update the quantity of orders of each type of coffee. Don't forget to bind them to your constructor! I also added an if statement so the user is alerted when the Qty goes below 0.

Got it? Okay, good! Next we'll create the individual posts that will display the coffee.

````
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
````

This is how we want our individual post rendered, with an image on top, the name and price, its description, and then the buttons to change the quantity.
But wait, what's up with your funky `img` tag? See, you need to be able to call images from the public folder, so that's why there's extra code there to make it work. It makes sure that you're able to call the right path and then display the right image.
The `this.props.(key)` calls the values from our array, and then they're displayed on our `div`. Add the buttons, and you're good to go. Pretty, simple, right?

Wronggggg.

This code isn't gonna work right, cause it doesn't go through the array to get the values. How do you get those then?

Remember that empty `render` from our `App` class? Let's go fill that up.

````
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
````

"We're only on the first line of that render, and I don't know what the heck that variable is doing..."

Fear not, friend! See, that ensures that we're calling the right `this`, the bigger component!
To be able to `map` the function, we enclose it in a variable so it's easier to call. This then sets the values for our `IndivCoffee` class. It also handles the changes for the constantly updating `Total`. The `return` then calls the variable that holds the `map` function, which will display each object from our coffeeTypes array.

But wait, what's that `Summary`? It's a new class we're creating in a bit to be able to display the total in its own little div so that everything's nice and tidy. Go ahead and create a new class. This one should be pretty simple!

````
    class Summary extends Component {
      render() {
        return (
              <div className="col-xs-12">
              <h3>TOTAL: {this.props.coffeeTotal}</h3>
              </div>
          </div>
        )
      }
    }
````

Okay, let's discuss this part. We just want to call and `coffeeTotal`. If you fire the app up, the `coffeeTotal` should have collected all the changes with the `changeTotal()` function. Pretty simple, right?

Now it's up to you to design everything, use Bootstrap or just do everything manually with CSS... And there you go, a POS! Good luck coding!
