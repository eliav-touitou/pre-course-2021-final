// creating variables
const addButton = document.querySelector("#add-button");
const viewSection = document.querySelector("#view-section");
//event listeners
addButton.addEventListener("click", addTodo);
//functions
function addTodo(e) {
  e.preventDefault();
  //  generating the container of the new task
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";
  viewSection.append(todoContainer);
  //  generating the priority div of the new task
  const todoPriority = document.createElement("div");
  todoPriority.innerText = document.querySelector("#priority-selector").value;
  todoPriority.className = "todo-priority";
  todoContainer.append(todoPriority);
  //  generating the time div of the new task
  const createdAt = document.createElement("div");
  createdAt.innerText = new Date().toISOString().slice(0, 19).replace("T", " ");
  createdAt.className = "todo-created-at";
  todoContainer.append(createdAt);
  //  generating the text div of the new task
  const todoText = document.createElement("div");
  todoText.innerText = document.querySelector("#text-input").value;
  todoText.className = "todo-text";
  todoContainer.append(todoText);
  document.querySelector("#text-input").value = "";
}
