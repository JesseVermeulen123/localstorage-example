const defaultTasks = [
  {
    title: "example 1",
  },
  {
    title: "example 2",
  },
]

function initialise() {
  // Try load local storage
  // - if it doesn't exist, set it to default tasks
  // Render list of tasks in local storage
  let tasks = localStorage.getItem("tasks")
  if (!tasks) {
    localStorage.setItem("tasks", `${JSON.stringify(defaultTasks)}`)
  }
  renderTasks();
}

function renderTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"))
  const taskListElement = document.getElementById("taskList")
  taskListElement.innerHTML = "";
  let i = 0;
  for (const task of tasks) {
    const taskElement = document.createElement("li")
    taskElement.id = `task${i}`
    taskElement.innerHTML = task.title
    taskElement.onclick = deleteTask
    taskListElement.appendChild(taskElement)
    i++;
  }
}

function addTask(event) {
  const taskTitle = document.getElementById("taskTitle")
  const newTask = {
    title: taskTitle.value
  }
  let tasks = JSON.parse(localStorage.getItem("tasks"))
  tasks.push(newTask)
  localStorage.setItem("tasks", `${JSON.stringify(tasks)}`)
  renderTasks()
  taskTitle.value = ""
}

  
function deleteTask(event) {
  let tasks = JSON.parse(localStorage.getItem("tasks"))
  let taskId = parseInt(event.target.id.replace("task", ""), 10)
  tasks.splice(taskId, 1)
  localStorage.setItem("tasks", `${JSON.stringify(tasks)}`)
  renderTasks()
}

const addTaskButton = document.getElementById("taskButton")
addTaskButton.onclick = addTask

initialise()