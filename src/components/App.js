import React, { Component } from "react";
import TodoList from "./todoList/TodoList";
import AppHeader from "./appHeader/AppHeader";
import SearchPanel from "./searchPanel/SearchPanel";
import ItemStatusFilter from "./itemStatusFilter/ItemStatusFilter";
import ItemAddForm from "./itemAddForm/ItemAddForm";
import shortId from "short-id";
import "./app.css";

localStorage.getItem("elements") === null &&
  localStorage.setItem("elements", "[]");

let localStoregeElements = JSON.parse(localStorage.getItem("elements"));

class App extends Component {
  state = {
    elements: [
      //   this.createTodoItem("drink coffee"),
      //   this.createTodoItem("study React")
    ],
    searchValue: "",
    filter: "All"
  };

  onSetValueSearch = value => {
    this.setState({ searchValue: value.toLowerCase() });
  };

  onSetFilter = value => {
    this.setState({ filter: value });
  };

  createTodoItem(text) {
    return {
      label: text,
      important: false,
      done: false,
      id: shortId.generate()
    };
  }

  onDeleted = id => {
    // console.log(id);
    this.setState(({ elements }) => {
      return { elements: elements.filter(post => post.id !== id) };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(prevState => {
      return { elements: [...prevState.elements, newItem] };
    });
  };

  onToggleImportant = id => {
    this.setState(state => {
      return {
        elements: this.toggleProperty(state.elements, id, "important")
        // elements: state.elements.map(el => {
        //   if (el.id === id) {
        //     el.important = !el.important;
        //   }
        //   return el;
        // })
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex(el => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    const newArray = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    return newArray;
  };

  onToggleDone = id => {
    this.setState(state => {
      return {
        elements: this.toggleProperty(state.elements, id, "done")
      };
    });
  };

  search = (elements, searchValue) => {
    if (searchValue.length === 0) {
      return elements;
    }
    return elements.filter(el => el.label.toLowerCase().includes(searchValue));
  };

  filter = (elements, filter) => {
    if (filter === "All") {
      return elements;
    }
    if (filter === "Active") {
      return elements.filter(el => !el.done);
    }
    if (filter === "Done") {
      return elements.filter(el => el.done);
    }
  };

  componentDidMount = () => {
    this.setState({ elements: localStoregeElements });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.elements !== this.state.elements) {
      localStorage.setItem("elements", JSON.stringify(this.state.elements));
    }
  };

  render() {
    const { elements, searchValue, filter } = this.state;
    const visibleItems = this.filter(
      this.search(elements, searchValue),
      filter
    );
    // console.log(filter);
    let done = [];
    visibleItems.map(el => {
      if (el.done) {
        done = done + 1;
      }
      return done;
    });

    return (
      <>
        <div className="todo-app">
          <AppHeader toDo={visibleItems.length - done} done={done} />
          <div className="search-panel d-flex">
            <SearchPanel
              onSetValueSearch={this.onSetValueSearch}
              filterItems={this.filterItems}
            />
            <ItemStatusFilter onSetFilter={this.onSetFilter} filter={filter} />
          </div>
          <TodoList
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
            onDeleted={this.onDeleted}
            todos={visibleItems}
          />
          <ItemAddForm onSubmit={this.addItem} />
        </div>
      </>
    );
  }
}

export default App;
