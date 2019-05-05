import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import HomePage from "./HomePage";
import Books from "./Books";
import NavBar from "./HeaderComponent/NavBar";
import Footer from "./FooterComponent/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="text-center mbn">
              <h1>Header</h1>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 phn">
              <NavBar />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-offset-md-2">
              <Route name="home" exact path="/" component={HomePage} />
              <Route name="books" exact path="/books" component={Books} />
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
