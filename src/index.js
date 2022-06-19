import "./styles.css";
import {
  addedTodo,
  deletedTodo,
  editedTodo,
  toggledTodo,
  todosDbChanges,
  pageLoaded
} from "./observables/observableObjects";
import {
  addToDb,
  deleteFromDb,
  updateTodo,
  toggleCompleted,
  loadTodos
} from "./model/db";

import { renderAppContent } from "./view/renderComponent";
import {
  renderTodosCount,
  renderCompletedCount,
  renderTodos
} from "./view/renderComponentChanges";
import { addListeners } from "./helpers";

// subscriptions
addedTodo.subscribe(addToDb);
deletedTodo.subscribe(deleteFromDb);
editedTodo.subscribe(updateTodo);
toggledTodo.subscribe(toggleCompleted);

pageLoaded.subscribe(renderAppContent);
todosDbChanges.subscribe(renderCompletedCount);
todosDbChanges.subscribe(renderTodosCount);
todosDbChanges.subscribe(renderTodos);

// todosDbChanges.notify([1, 2, 4, 6]);

const todos = [
  {
    id: 1,
    todo: "buy milk",
    completed: false,
    date: new Date()
  },
  {
    id: 2,
    todo: "buy egg",
    completed: true,
    date: new Date("2022-06-16T03:24:00")
  },
  {
    id: 3,
    todo: "buy icecream",
    completed: false,
    date: new Date("2022-06-17T03:03:10")
  }
];
// Save books to local storage
const saveToLocalStorage = () => {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

saveToLocalStorage();

window.addEventListener("DOMContentLoaded", () => {
  console.log("page loaded");
});
loadTodos();
addListeners();
