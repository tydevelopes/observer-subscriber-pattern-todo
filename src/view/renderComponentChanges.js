import { getCompletedCount } from "../helpers";
import { renderListItem } from "./renderComponent";

export const renderTodosCount = (todos) => {
  console.log(todos.length);
  document.querySelector(".total-todos").textContent = todos.length;
};
export const renderCompletedCount = (todos) => {
  console.log(todos.length);
  let count = getCompletedCount(todos);
  document.querySelector(".completed-todos").textContent = count;
};

export const renderTodos = (todos) => {
  document.querySelector(".list").innerHTML = `${todos
    .map((todo) => renderListItem(todo))
    .join("")}`;
};
