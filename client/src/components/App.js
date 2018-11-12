import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup";
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/sign-up" component={Signup} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
