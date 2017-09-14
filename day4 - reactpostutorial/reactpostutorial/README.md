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

Assuming you already have an array of things you want in your POS, we can start with a new component to display these items. For this tutorial, we'll be filling our array with different types of coffee beans. We also have to add something that will catch the total price and the quantity of items we will put in our cart, so it should look something like this:


```
class CoffeeClass extends Component {

  constructor(props) {
    super(props);
    this.state = {coffeeTypes : [ {name:"Arabica, 500g", description: "something", price: 200, imageid: "arabica" },
    {name: "Robusta, 500g", description: "something", price: 140, imageid: "robusta" },
    {name: "Barako, 500g", description: "something", price: 180, imageid: "barako" },
    {name: "Excelsa, 500g", description: "something", price: 160, imageid: "excelsa" } ] ,
    superQty: 0, superTotal: 0  };

    this.changeSuperTotal = this.changeSuperTotal.bind(this);
    this.changeSuperQty = this.changeSuperQty.bind(this);
  }
```

Before we work on the `render` part, we should create a class that displays each individual item in our store.
