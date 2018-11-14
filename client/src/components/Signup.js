import React, { Component } from "react";
import axios from "axios";
import InputField from "./InputField";

class Signup extends Component {
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
    //console.log(`validating ${this.state.password.value.length} long`);
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
  handleSubmit = async e => {
    e.preventDefault();
    let emailValid = this.validateEmail();
    let passValid = this.validatePassword();
    if (emailValid.length === 0 && passValid.length === 0) {
      const data = {
        email: this.state.email.value,
        password: this.state.password.value
      };
      const response = await axios.post("http://localhost:8000/users", data);
      if (response.data.error !== "") {
        this.setState({
          email: {
            ...this.state.email,
            error: "Email already in use"
          }
        });
      } else {
        this.setState({
          email: {
            ...this.state.email,
            error: ""
          }
        });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="display-4">Sign-Up</h1>
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
          <div className="btn-toolbar float-right">
            <button className="mr-1 btn btn-outline-success" type="submit">
              Sign Up
            </button>
            <a
              className="ml-1 btn btn-outline-success"
              href="/auth/google"
              role="button"
            >
              <i className="fab fa-google" style={{ marginRight: "0.5rem" }} />{" "}
              Sign Up With Google
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
