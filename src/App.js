import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Form from "./Components/Form";
import "./App.css"

const App = () => {
  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
          <ul>
            <Link to="/">Home</Link>
          </ul>
          <ul>
            <Link to="/pizza">Order Now!</Link>
          </ul>
      </nav>

      <Switch>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route exact path="/" component={Home} />
      </Switch>
    </>

  );
};
export default App;
