import React, { Component } from "react";

class InputField extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">{this.props.label}</label>
        <input
          type={this.props.name}
          className={`form-control ${this.props.error ? "is-invalid" : ""}`}
          id={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <div className="invalid-feedback">{this.props.error}</div>
      </div>
    );
  }
}

export default InputField;
