// App.js contains Browser Router view and navigation bar.

import React, { Component } from "react";

import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import addItem from "../src/components/addItem";
import itemList from "../src/components/itemList";

class App extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Stock manager
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/items"} className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add item
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>React Firebase Database CRUD APP</h2>
        <Switch>
          <Route exact path={["/", "/items"]} component={itemList} />
          <Route exact path="/add" component={addItem} />
        </Switch>
      </div>
    </div>
    );
  }
}

export default App;
