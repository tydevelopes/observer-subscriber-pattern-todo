import { getCompletedCount } from "../helpers";
import { formatDistanceToNow, parseISO } from "date-fns";

export const renderTodoCountLabel = (count) => {
  return `<span class="label">todos:</span><span class="label total-todos">${count}</span>`;
};
export const renderCompletedCountLabel = (count) => {
  return `<span class="label">completed:</span><span class="label completed-todos">${count}</span>`;
};
export const renderTitle = () => `<div class="title">TODO APP</div>`;

export const renderHeader = (todosCount, completedCount) => {
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `${renderTitle()}
  ${renderTodoCountLabel(todosCount)}
  ${renderCompletedCountLabel(completedCount)}`;
  return header;
};

export const renderForm = () => {
  const form = document.createElement("form");
  form.classList.add("form");
  form.dataset.session = "add";
  form.dataset.editedtodoid = "";
  form.innerHTML = `<input type="text" placeholder='add todo'>
  <button>Add</button>`;
  return form;
};

export const renderListItem = ({ id, todo, completed, date }) => {
  return `<li class="list-item" data-id="${id}">
  <span class="todo ${completed ? "completed" : ""}">${todo}</span>
  <span class="date">${formatDistanceToNow(parseISO(date), {
    includeSeconds: true
  })}</span>
  <span class="material-symbols-outlined delete" data-action="delete">delete</span>
  <span class="material-symbols-outlined edit" data-action="edit">edit</span>
  <span class="material-symbols-outlined toggle-completed" data-action="toggle">${
    completed ? "check_circle" : "circle"
  }</span>
</li>`;
};

export const renderList = (todos) => {
  const list = document.createElement("ul");
  list.classList.add("list");
  list.innerHTML = `${todos.map((todo) => renderListItem(todo)).join("")}`;
  return list;
};

export const renderAppContent = (todos) => {
  const app = document.querySelector("#app");
  const todosCount = todos.length;
  const completedCount = getCompletedCount(todos);

  app.append(
    renderHeader(todosCount, completedCount),
    renderForm(),
    renderList(todos)
  );
};
