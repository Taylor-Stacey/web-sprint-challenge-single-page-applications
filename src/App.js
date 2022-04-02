import React from "react";
import {Switch, Route, Link} from 'react-router-dom';
import PizzaForm from "./pizza-form";

import "./App.css"


const App = () => {

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link id="order-pizza" to="/pizza">Pizza form</Link>
        
        
      </header>
      <h1>Lambda Eats</h1>
      <main>
        <Switch>
          <Route exact path="/">
            <h2>Home</h2>
          </Route>

          <Route exact path="/pizza/">
            <PizzaForm />
          </Route>
        </Switch>
      </main>
      <footer>

      </footer>
    </>
  );
};
export default App;
