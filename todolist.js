const taskList = document.getElementById("task-list");
const taskInput = document.querySelector('input[type="text"]');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((taskText) => {
    addTaskToDOM(taskText);
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push(li.firstChild.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(taskText) {
  const listItem = document.createElement("li");
  listItem.innerHTML =
    taskText +
    ' <button class="btn btn-danger btn-sm float-end">Delete</button>';
  listItem.className = "list-group-item";
  taskList.appendChild(listItem);
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToDOM(taskText);
    saveTasks();
    taskInput.value = "";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Delete") {
    const listItem = e.target.parentElement;
    taskList.removeChild(listItem);
    saveTasks();
  }
});

// Initial load
loadTasks();
