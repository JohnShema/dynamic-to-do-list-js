// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  loadTasks();

  // Add event listener to button
  addButton.addEventListener("click", addTask);

  // Add event listener for Enter key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Function to load and render tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => {
      createTaskElement(taskText, false);
    });
  }

  // Function to add task
  function addTask() {
    const taskText = taskInput.value.trim(); // 💥 This line was missing

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    createTaskElement(taskText, true);
    taskInput.value = ""; // Clear the input field
  }

  // Function to create a task element in the DOM
  function createTaskElement(taskText, save = true) {
    // Create list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Handle removal
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    // Append to DOM
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save task
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // Function to remove task from storage
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
});
