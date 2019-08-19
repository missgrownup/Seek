This project was code test for SEEK Learning

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br> It correctly bundles
React in production mode and optimizes the build for the best performance.

### `project summary`

This is product is to build a job ads checkout page. In this project you could
first choose different customers, which contains different pricing rules. Then
in checkout section, you add products to cart, it will figure out how much in
total based on different pricing rules/different customers.

### `pricing rules senarios`

- single match, e.g. buy 5 classic ads for 4
- min and match, e.g. buy 2 classic ads and 1 stand out ad for \$999
- discount, e.g. buye premium ad for \$249

### `things to improve`

- Customers and products should be dynamic from database.
- Pricing rule result can only accept a single KVP or a number, which doesn't
  work for senarios like: 20% off or \$200 off. But I don't think multiple KVP
  would be a necessary case.
- Move methods in checkout.js component to ultils if they could share with other
  components.
- In checkout component, should be able to navigate back to change to a
  different customer.
