import React, { Component } from "react";
import "./itemAddForm.css";

class ItemAddForm extends Component {
  state = {
    value: ""
  };
  onInputChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };
  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="item-add-form d-flex">
        <textarea
          type="text"
          className="form-control"
          placeholder="enter your plans "
          onChange={this.onInputChange}
          value={value}
        ></textarea>
        <button type="submit" className="btn btn-outline-secondary">
          Add plans
        </button>
      </form>
    );
  }
}

export default ItemAddForm;
