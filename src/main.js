"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // creating variables
  const addButton = document.querySelector("#add-button");
  const viewSection = document.querySelector("#view-section");
  const sortButton = document.querySelector("#sort-button");
  const counter = document.querySelector("#counter");
  // getting the array out of the storage and creating container for each object of the array
  let tasks = await getPersistent();
  if (!tasks) {
    tasks = [];
  }
  for (const task of tasks) {
    viewSection.append(createContainer(task));
  }
  //calling the showTask function for updating the tasks counter on loading
  showTasks();

  //event listeners -
  addButton.addEventListener("click", addTodo);
  sortButton.addEventListener("click", sortTasks);
  viewSection.addEventListener("click", doneTask);
  viewSection.addEventListener("click", completeTask);

  //functions -

  //function for creating new task as an arrays object
  function addTodo() {
    let task = {
      text: document.querySelector("#text-input").value,
      priority: document.querySelector("#priority-selector").value,
      date: new Date().getTime(),
    };
    console.log(task);
    //inserting the data to a container for displaying it properly on the pge
    viewSection.append(createContainer(task));
    tasks.push(task);
    setPersistent(tasks);
    showTasks();
    //emptying the input for the next task todo
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

    //  generating the time div of the new task and displaying it in SQL format
    const createdAt = document.createElement("div");
    createdAt.innerText = new Date(task.date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    createdAt.className = "todo-created-at";
    todoContainer.append(createdAt);
    //create complete button and assigning classes for decoration
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-button");
    todoContainer.appendChild(completedButton);
    //Create trash button and assigning classes for decoration
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-button");
    todoContainer.appendChild(trashButton);

    return todoContainer;
  }

  // function for counting tasks and displaying the amount in the counter
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

  //2 functions for assigning a new class to the todo-container for animating it due to the clicked button(trash/complete) -

  //when the complete button is clicked the code below will be executed to animate the container
  function completeTask(e) {
    const item = e.target;
    if (item.classList[0] === "complete-button") {
      const taskContainer = item.parentElement;
      taskContainer.classList.toggle("completed");
    }
  }
  //when the trash button is clicked the code below will be executed to animate the container and then delete it
  function doneTask(e) {
    const item = e.target;
    if (item.classList[0] === "trash-button") {
      const taskContainer = item.parentElement;
      //alerting the user to make sure he wants to delete the task
      if (!confirm(`Are you sure you want to delete task?`)) {
        return;
      }
      taskContainer.classList.add("fall");
      taskContainer.addEventListener("transitionend", (e) => {
        removeFromStorage(taskContainer);
      });
    }
  }
  // function for removing the deleted task  out of the storage
  function removeFromStorage(taskContainer) {
    const containerNodeList = document.querySelectorAll(".todo-container");
    const containerArray = Array.from(containerNodeList);
    const taskIndex = containerArray.indexOf(taskContainer);
    tasks.splice(taskIndex, 1);
    taskContainer.remove();
    setPersistent(tasks);
    counter.textContent = tasks.length;
  }
});
