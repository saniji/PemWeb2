const todos = [];
const RENDER_EVENT = "render-todo";
let isCompleted = false;
let keyword = "";

const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "TODO_APPS";

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const checkTodo = document.getElementById("readClear");
checkTodo.addEventListener("change", checkBoxTodo);

const search = document.getElementById("search");
search.addEventListener("change", (e) => {
  keyword = e.target.value;
  document.dispatchEvent(new Event(RENDER_EVENT));
});

function addTodo() {
  const clock = document.getElementById("clock").value;
  const activity = document.getElementById("activity").value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(
    generatedID,
    clock,
    activity,
    isCompleted
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  isCompleted = false;
  checkTodo.checked = false;
}

function generateId() {
  return +new Date();
}

function generateTodoObject(id, clock, activity, isCompleted) {
  return {
    id,
    clock,
    activity,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  const completedTODOList = document.getElementById("todos");
  completedTODOList.innerHTML = "";

  for (const todoItem of todos.filter(({ clock }) =>
    clock.toLowerCase().includes(keyword.toLowerCase())
  )) {
    const todoElement = makeTodo(todoItem);
    if (todoItem.isCompleted) completedTODOList.append(todoElement);
  }
});
function makeTodo(todoObject) {
  const clockText = document.createElement("h2");
  clockText.innerText = "Jam Kegiatan : " + todoObject.clock;

  const activityText = document.createElement("p");
  activityText.innerText = "Penulis : " + todoObject.activity;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(clockText, activityText);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.innerText = "List Kegiatan";
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.innerText = "Hapus Kegiatan";
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  }
  return container;
}

function checkBoxTodo(e) {
  isCompleted = e.target.checked;
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}
function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }

  return -1;
}
function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}