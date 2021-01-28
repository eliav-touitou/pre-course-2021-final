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
    // saveLocalTodos(todoContainer);
    return todoContainer;
  }

  //
  // function taskCounter() {
  //     ++counter;
  //     document.getElementById("counter").innerHTML = counter + "tasks on list";
  //   }
});
