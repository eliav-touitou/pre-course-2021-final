"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // creating variables

  let tasks = JSON.parse(localStorage.getItem("my-todo"));
  if (!tasks) {
    tasks = [];
  }
  const addButton = document.querySelector("#add-button");
  const viewSection = document.querySelector("#view-section");
  const sortButton = document.querySelector("#sort-button");
  const counter = document.querySelector("#counter");

  for (const task of tasks) {
    viewSection.append(createContainer(task));
  }
  showTasks();
  //event listeners

  addButton.addEventListener("click", addTodo);
  sortButton.addEventListener("click", sortTasks);
  viewSection.addEventListener("click", doneTask);
  // trashButton.addEventListener("click", removeTask);
  // completedButton.addEventListener("click", doneTask);

  //functions
  function getLocalStorage() {
    let getLocalStorageData = localStorage.getItem("my-todo");
    if (!getLocalStorageData) {
      tasks = [];
    } else {
      tasks = JSON.parse(getLocalStorageData);
    }
  }
  function addTodo() {
    let task = {
      text: document.querySelector("#text-input").value,
      priority: document.querySelector("#priority-selector").value,
      date: new Date().getTime(),
    };
    viewSection.append(createContainer(task));
    tasks.push(task);
    localStorage.setItem("my-todo", JSON.stringify(tasks));
    showTasks();
    document.querySelector("#text-input").value = "";
  }

  function createContainer(task) {
    //  generating the container of the new task
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";
    //  generating the text div of the new task
    const todoText = document.createElement("div");
    todoText.innerText = task.text;
    todoText.className = "todo-text";
    todoContainer.append(todoText);
    //  generating the priority div of the new task
    const todoPriority = document.createElement("div");
    todoPriority.className = "todo-priority";
    todoPriority.innerText = task.priority;
    todoContainer.append(todoPriority);
    //  generating the time div of the new task
    const createdAt = document.createElement("div");
    createdAt.innerText = new Date(task.date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    createdAt.className = "todo-created-at";
    todoContainer.append(createdAt);

    //create complete button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoContainer.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoContainer.appendChild(trashButton);

    return todoContainer;
  }
  // function for counting tasks
  function showTasks() {
    getLocalStorage();
    counter.textContent = tasks.length;
  }
  // function for sorting tasks by their priorty
  function sortTasks() {
    getLocalStorage();
    tasks = tasks.sort((a, b) => b.priority - a.priority);
    viewSection.innerHTML = " ";
    for (const task of tasks) {
      const container = createContainer(task);
      viewSection.append(container);
    }
  }

  function doneTask(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      todo.classList.add("fall");
      //at the end
      removeLocalTodos(todo);
      todo.remove();
    }
    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
    }
  }
  function removeLocalTodos(todo) {
    getLocalStorage();
    const todoIndex = todo.children[0].innerText;
    tasks.splice(tasks.indexOf(todoIndex), 1);
    localStorage.setItem("my-todo", JSON.stringify(tasks));
    counter.textContent = tasks.length;
  }
});
