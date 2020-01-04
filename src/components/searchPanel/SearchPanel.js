import React, { Component } from "react";
import "./searchPanel.css";
class SearchPanel extends Component {
  state = {
    value: ""
  };

  onInputValue = async e => {
    e.persist();
    await this.setState({ value: e.target.value });
    await this.props.onSetValueSearch(this.state.value);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onInputValue}
        value={this.state.value}
      />
    );
  }
}

export default SearchPanel;
