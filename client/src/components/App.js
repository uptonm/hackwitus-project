import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup";
import "../assets/css/login.css";

const Container = () => {
  return (
    <div>
      <div className="login-container">
        <Signup />
      </div>
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/sign-up" component={Container} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
