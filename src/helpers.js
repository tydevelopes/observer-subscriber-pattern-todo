import {
  addedTodo,
  toggledTodo,
  deletedTodo,
  editedTodo
} from "./observables/observableObjects";

export const getCompletedCount = (todos) => {
  return todos.filter((todo) => todo.completed).length;
};

export const addListeners = () => {
  const form = document.querySelector(".form");
  const input = form.querySelector("input");
  const submitBtn = form.querySelector("button");
  const list = document.querySelector(".list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todo = input.value.trim();
    console.log(todo);
    if (todo) {
      if (form.dataset.session === "add") {
        addedTodo.notify(todo);
      }
      if (form.dataset.session === "edit") {
        let todoId = Number(form.dataset.editedtodoid);
        editedTodo.notify({ todoId, todo });
        form.dataset.session = "add";
        form.dataset.editedtodoid = "";
        submitBtn.textContent = "Add";
      }
    }
    input.value = "";
  });

  list.addEventListener("click", (e) => {
    let action = e.target.dataset.action;
    if (action) {
      let id = Number(e.target.parentElement.dataset.id);
      switch (action) {
        case "toggle":
          toggledTodo.notify(id);
          break;
        case "delete":
          deletedTodo.notify(id);
          break;
        case "edit":
          input.value = e.target.parentElement.firstElementChild.textContent;
          form.dataset.session = "edit";
          form.dataset.editedtodoid = id;
          submitBtn.textContent = "Edit";
          break;
        default:
          break;
      }
    }
  });
};
