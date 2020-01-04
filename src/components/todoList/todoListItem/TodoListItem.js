import React, { Component } from "react";
import "./todo-list-item.css";

class TodoListItem extends Component {
  //   state = {
  //     done: false,
  //     important: false
  //   };

  //   onHandleClickText = () => {
  //     this.setState(prevState => {
  //       return { done: !prevState.done };
  //     });
  //   };

  //   onHandleImportant = () => {
  //     this.setState(prevState => {
  //       return { important: !prevState.important };
  //     });
  //   };

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important
    } = this.props;
    let classNames = "todo-list-item";

    return (
      <span
        className={
          (done ? (classNames += " done") : classNames,
          important ? classNames + " important" : classNames)
        }
      >
        <span onClick={onToggleDone} className="todo-list-item-label ">
          {label}
        </span>
        <button
          type="button"
          onClick={onToggleImportant}
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-exclamation"></i>
        </button>
        <button
          type="button"
          onClick={onDeleted}
          className="btn btn-outline-danger btn-sm float-right"
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </span>
    );
  }
}

export default TodoListItem;
