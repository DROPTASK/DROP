/// Toggle the Options Window

function toggleOptions() {
    let menu = document.getElementById("optionsWindow");

    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        menu.style.display = "none";
    } else {
        menu.classList.add("show");
        menu.style.display = "flex";
    }
}

// Open Task Form & Auto-Close Options Menu
function openTaskForm() {
closeAllPopups();
document.getElementById("taskForm").style.display = "block";
}

// Close Task Form
function closeTaskForm() {
document.getElementById("taskForm").style.display = "none";
}

// Open Manage Money (Redirect)
function openManageMoney() {
closeAllPopups();
window.location.href = 'manage.html';
}

// Open Remove Task Form & Auto-Close Options Menu
function openRemoveTaskForm() {
closeAllPopups();
document.getElementById("removeTaskForm").style.display = "block";
}

// Close Remove Task Form
function closeRemoveTaskForm() {
document.getElementById("removeTaskForm").style.display = "none";
}

// Close All Popups
function closeAllPopups() {
document.getElementById("taskForm").style.display = "none";
document.getElementById("removeTaskForm").style.display = "none";
document.getElementById("optionsWindow").style.display = "none";
}

// Add Task Function
function addTask() {
let taskName = document.getElementById("taskName").value;
let category = document.getElementById("taskCategory").value;

if (taskName.trim() === "") return alert("Please enter a task name!");  

// Create task in the main section  
let section = document.getElementById(category);  
let task = document.createElement("div");  
task.classList.add("task");  
  
// Generate a unique ID for the task  
let taskId = "task-" + Date.now();   
task.id = taskId;  

task.innerHTML = `<p>${taskName} <button onclick="completeTask(this)">✔ Done</button></p>`;  
section.appendChild(task);  

// Add the task to the remove dropdown  
let select = document.getElementById("taskToRemove");  
let option = document.createElement("option");  
option.value = taskId;  
option.textContent = taskName;  
select.appendChild(option);  
document.getElementById("optionsWindow").style.display = "none";
closeTaskForm(); // Close popup

}

// Complete Task (Change Background to Green)
function completeTask(button) {
let task = button.parentElement.parentElement;
task.classList.add("completed");
button.remove(); // Remove "✔ Done" button
}

// Remove All Tasks
function removeAllTasks() {
document.querySelectorAll(".task").forEach(task => task.remove());
closeAllPopups();
}

// Remove Selected Task
function removeTask() {
let select = document.getElementById("taskToRemove");
let taskName = select.value;

document.querySelectorAll(".task").forEach(task => {  
    if (task.innerText.includes(taskName)) {  
        task.remove();  
    }  
});  

closeRemoveTaskForm(); // Close popup

}function removeTask() {
let select = document.getElementById("taskToRemove");
let selectedTaskId = select.value;

if (!selectedTaskId) return alert("No task selected!");  

// Remove task from the main section  
let task = document.getElementById(selectedTaskId);  
if (task) task.remove();  

// Remove task from the dropdown  
select.options[select.selectedIndex].remove();

}

// Load tasks from localStorage on page load
function loadTasks() {
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("work").innerHTML = "";  
document.getElementById("personal").innerHTML = "";  
document.getElementById("taskToRemove").innerHTML = "";  

tasks.forEach(task => {  
    let section = document.getElementById(task.category);  
    let taskDiv = document.createElement("div");  
    taskDiv.classList.add("task");  
    taskDiv.id = task.id;  

    if (task.completed) taskDiv.classList.add("completed");  

    taskDiv.innerHTML = `  
        <p>${task.name}   
            ${task.completed ? "" : `<button onclick="completeTask('${task.id}')">✔ Done</button>`}  
        </p>`;  
    section.appendChild(taskDiv);  

    // Add to remove dropdown  
    let option = document.createElement("option");  
    option.value = task.id;  
    option.textContent = task.name;  
    document.getElementById("taskToRemove").appendChild(option);  
});

}

window.onload = loadTasks; // Load tasks on page load

function resetCompletedTasks() {
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Reset only completed tasks  
tasks = tasks.map(task => {  
    if (task.completed) task.completed = false;  
    return task;  
});  

localStorage.setItem("tasks", JSON.stringify(tasks));  
loadTasks(); // Refresh UI

}
