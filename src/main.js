"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // creating variables

  const addButton = document.querySelector("#add-button");
  const viewSection = document.querySelector("#view-section");
  const sortButton = document.querySelector("#sort-button");
  const counter = document.querySelector("#counter");
  // getting the array out of the storage and creating container for each object of the array
  // let tasks = JSON.parse(localStorage.getItem("my-todo"));
  // if (!tasks) {
  //   tasks = [];
  // }
  // for (const task of tasks) {
  //   viewSection.append(createContainer(task));
  // }
  let tasks = await getPersistent();
  if (!tasks) {
    tasks = [];
  }
  for (const task of tasks) {
    viewSection.append(createContainer(task));
  }
  //calling the showTask function for updating the tasks counter on loading
  showTasks();

  //event listeners
  addButton.addEventListener("click", addTodo);
  sortButton.addEventListener("click", sortTasks);
  viewSection.addEventListener("click", doneTask);

  //functions

  //function for creating new task as an arrays object
  function addTodo() {
    let task = {
      text: document.querySelector("#text-input").value,
      priority: document.querySelector("#priority-selector").value,
      date: new Date().getTime(),
    };
    console.log(task);

    viewSection.append(createContainer(task));
    tasks.push(task);
    // localStorage.setItem("my-todo", JSON.stringify(tasks));
    setPersistent(tasks);
    showTasks();
    document.querySelector("#text-input").value = "";
  }
  //function for generating the html container for the "task" object
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
    completedButton.classList.add("complete-button");
    todoContainer.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-button");
    todoContainer.appendChild(trashButton);

    return todoContainer;
  }

  // function for counting tasks
  function showTasks() {
    counter.textContent = tasks.length;
    console.log(tasks.length);
  }
  // function for sorting tasks by their priority
  function sortTasks() {
    tasks = tasks.sort((a, b) => b.priority - a.priority);
    viewSection.innerHTML = " ";
    for (const task of tasks) {
      const container = createContainer(task);
      viewSection.append(container);
    }
  }
  //function for checking a done task by parent element of the clicked button
  function doneTask(e) {
    const item = e.target;

    if (item.classList[0] === "trash-button") {
      const task = item.parentElement;
      if (!confirm(`Are you sure you want to delete task?`)) {
        return;
      }
      //assigning a new class for fall animation, and delete only after
      task.classList.add("fall");
      task.addEventListener("transitionend", (e) => {
        removeLocalTodos(task);
      });
    }
    if (item.classList[0] === "complete-button") {
      const task = item.parentElement;
      task.classList.toggle("completed");
    }
  }
  // function for removing the deleted task  out of the local storage array
  function removeLocalTodos(task) {
    const containerNodeList = document.querySelectorAll(".todo-container");
    const containerArray = Array.from(containerNodeList);
    const taskIndex = containerArray.indexOf(task);
    tasks.splice(taskIndex, 1);
    task.remove();

    // localStorage.setItem("my-todo", JSON.stringify(tasks));
    setPersistent(tasks);
    counter.textContent = tasks.length;
  }
});
