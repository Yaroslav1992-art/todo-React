import React, { Component } from "react";

class ItemStatusFilter extends Component {
  state = {};

  arrButton = [{ name: "All" }, { name: "Active" }, { name: "Done" }];

  onHandleClickButton = e => {
    this.props.onSetFilter(e.target.name);
  };

  render() {
    const { filter } = this.props;

    const buttons = this.arrButton.map(({ name }) => {
      const isActive = name === filter;
      console.log(filter);
      return (
        <button
          key={name}
          className={`btn ${isActive ? "btn-info" : "btn-outline-secondary"} `}
          type="button"
          onClick={this.onHandleClickButton}
          name={name}
        >
          {name}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
  }
}

export default ItemStatusFilter;
