import React from "react";
import TodoListItem from "./todoListItem/TodoListItem";
import "./todo-list.css";
const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
  const items = todos.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onDeleted={() => onDeleted(id)}
          {...itemProps}
        />
      </li>
    );
  });
  return <ul className="list-group todo-list">{items}</ul>;
};

export default TodoList;
