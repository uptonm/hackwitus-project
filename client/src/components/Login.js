import React, { Component } from "react";
import InputField from "./InputField";

class Login extends Component {
  state = {
    email: {
      value: "",
      error: ""
    },
    password: {
      value: "",
      error: ""
    }
  };
  validateEmail = () => {
    let error = this.state.email.value.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    )
      ? ""
      : "Please enter a valid email";
    this.setState({
      email: {
        ...this.state.email,
        error
      }
    });
    return error;
  };
  validatePassword = () => {
    console.log(`validating ${this.state.password.value.length} long`);
    let error =
      this.state.password.value.length < 8
        ? "Password must be > 8 characters"
        : "";
    this.setState({
      password: {
        ...this.state.password,
        error
      }
    });
    return error;
  };
  canSubmit = () => {
    return this.validateEmail() && this.validatePassword();
  };
  handleSubmit = e => {
    e.preventDefault();
    let emailValid = this.validateEmail();
    let passValid = this.validatePassword();
    if (emailValid && passValid) {
      console.log({
        email: this.state.email,
        password: this.state.password
      });
    } else {
      console.log({
        email: this.state.email,
        password: this.state.password
      });
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="display-4">Sign-In</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <InputField
            name="email"
            label="Email Address"
            placeholder="Enter email"
            small="We'll never share your email with anyone else."
            error={this.state.email.error}
            value={this.state.email.value}
            onChange={e => {
              e.preventDefault();
              this.setState({
                email: {
                  value: e.target.value
                }
              });
            }}
          />
          <InputField
            name="password"
            label="Password"
            placeholder="Enter password"
            error={this.state.password.error}
            value={this.state.password.value}
            onChange={e => {
              e.preventDefault();
              this.setState({
                password: {
                  value: e.target.value
                }
              });
            }}
          />
          <button className="btn btn-lg btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
