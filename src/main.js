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
  for (const task of tasks) {
    viewSection.append(createContainer(task));
  }
  showTasks();
  //event listeners

  addButton.addEventListener("click", addTodo);
  //functions
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
    //  generating the text div of the new task
    const todoText = document.createElement("div");
    todoText.innerText = task.text;
    todoText.className = "todo-text";
    todoContainer.append(todoText);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoContainer.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoContainer.appendChild(trashButton);

    // saveLocalTodos(todoContainer);
    return todoContainer;
  }
  //   sortButton.addEventListener("click", () => {
  //     let newArr = [];
  //     for (let j = 5; j >= 1; j--) {
  //       for (let i = 0; i < tasks.length; i++) {
  //         if (Number(tasks[i].priority) === j) {
  //           newArr.push(tasks[i]);
  //         }
  //       }
  //     }
  //     return createContainer(newArr);
  //   });

  function showTasks() {
    let getLocalStorageData = localStorage.getItem("my-todo");
    if (getLocalStorageData == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(getLocalStorageData);
    }
    const counter = document.querySelector("#counter");
    counter.textContent = tasks.length;
  }
});
