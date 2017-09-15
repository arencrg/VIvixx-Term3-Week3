# This tutorial will guide you in creating a Shopping Cart using ReactJS

Hopefully you're coming into this with a little bit of knowledge on how HTML, CSS and JS work, and if not... Uh, I guess you can still try to follow along.

Before we begin, we must make sure that we have all the necessary files installed, such as Node [NPM](https://nodejs.org/en/) (so we can install everything with NPM), the text editor of your choice (I personally use Atom, but feel free to use Sublime or any online editor like Codepen.io), all of that. Open up your Terminal or Powershell, cd to wherever you want to put the project, and then do the following:

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

Personally, I prefer adding Bootstrap and jQuery and everything else I need before I start fiddling with `App.js`, just so I can add the `classNames` to my divs and other elements while I'm working on `App.js`. I won't have to keep going back just to add the `classNames` later on. After we've added the Bootstrap and jQuery CDN (or link to your local files), it should look like:

````
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <title>My POS</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  </body>
</html>

````


### Got it? good! We can open up `App.js` (in the src folder) and start with the good stuff.

Go ahead and delete the default content of the `App` class, maybe put "Hello" or whatever. For this tutorial, we'll be filling our array with different types of coffee beans, so I'll name our new component `CoffeeClass`, (but feel free to change it to anything you like) and this is what we'll be calling in our main `App` class. We'll be putting stuff in this class in a bit.

````
    class App extends Component {
      render() {
        return (
            <h1>Hello!</h1>
            < CoffeeClass />
        );
      }
    }
````

Assuming you already have an array of things you want in your POS, we can start filling up `CoffeeClass` to display these items. We want it to display the name, a short description, the price, and the imageid. We also have to add something that will catch the total price and the quantity of items we will put in our cart, so it should look something like this:

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

Let's go through this part real quick. We start creating a component with `class (class name) extends Component`. We always have to put `super(props);`, Gretchen Weiner says that that's, like, the rules of React. (That was a Mean Girls reference, in case you didn't get it.) Next we have to build our array `coffeeTypes`, which belongs to `this.state`. We also have to put the quantity of orders and the total price of our purchase, which will be updated while we run our virtual React DOM.

We have to add a function that will catch the price whenever an item is added to the cart, and add that to our total. Don't forget to bind it to the constructor!

Leave the `render` part empty for now, we'll go back to that in a bit.

We have to actually put photos in a folder somewhere so we can call them in our app later. We'll put these photos inside the `public` folder, and we'll create a `images` folder in that to make it neat. It should look something like this:

```
reactpostutorial/
    README.md
    node_modules/
    package.json
    public/
        images/
            arabica.jpg
            excelsa.jpg
            liberica.jpg
            robusta.jpg
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

Okay, great. The next step is to work on a class that displays each individual item in our store. We'll create a new class called `IndivCoffee`.

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

This new class should have a function that will control the quantity of each order, so a basic `+` and `-` button with `onClick` events with our `moreQty()` and `lessQty()` functions will do. I like using very literal function and variable names so everything is easy to figure out. These functions update the quantity of orders of each type of coffee, and also update the total of everything we add to our cart. I also added an if statement so the user is alerted when the Qty goes below 0. Don't forget to bind them to your constructor!

Got it? Okay, good! Next we'll create the individual posts that will display the coffee types. Head on over to the `render()` part.

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

The `this.props.(key)` calls the values from our array (so the name, description, price, and imageid for each type of coffee), and then they're displayed on our `div`. Add the buttons with their `onClick` events, and you're good to go. Pretty simple, right?

Wronggggg.

This code isn't gonna work right, cause it doesn't go through the array to get the values. How do you get those then?

Remember that empty `render` from `CoffeeClass`? Let's go fill that up.

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

Okay, let's discuss this part. We just want to call and `coffeeTotal`. If you fire the app up, the `coffeeTotal` should have collected all the changes with the `changeTotal()` function. Easy peasy lemon squeezy.

Go check out my `App.js` to see if you've done it the same way. Did you get it right? Are we on the same page? Is everything in the right order?

Now it's up to you to design everything, use Bootstrap or just do everything manually with CSS... And there you go, a Shopping Cart! Good luck coding!
