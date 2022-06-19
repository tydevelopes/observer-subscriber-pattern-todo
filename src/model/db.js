import { todosDbChanges, pageLoaded } from "../observables/observableObjects";

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos"));
};
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
  todosDbChanges.notify(getTodos());
};

export const loadTodos = () => {
  let todos = getTodos();
  pageLoaded.notify(todos);
};

export const addToDb = (todo) => {
  let todos = getTodos();
  if (todos) {
    todos.push({
      id: todos.length + 1,
      todo,
      completed: false,
      date: new Date()
    });
  } else {
    todos = [
      {
        id: 1,
        todo,
        completed: false,
        date: new Date()
      }
    ];
  }
  saveTodos(todos);
};
export const deleteFromDb = (id) => {
  let todos = getTodos().filter((todo) => todo.id !== id);
  saveTodos(todos);
};
export const updateTodo = ({ todoId: id, todo: data }) => {
  let todos = getTodos().map((todo) => {
    if (todo.id === id) {
      return { ...todo, todo: data };
    }
    return todo;
  });
  saveTodos(todos);
};

export const toggleCompleted = (id) => {
  let todos = getTodos().map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos(todos);
};

export const clearTodos = () => {
  todosDbChanges.notify([]);
  localStorage.removeItem("todos");
};
