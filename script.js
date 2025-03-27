document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

// Tabs Switching
function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Load Tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let container = document.getElementById("todoList");
    container.innerHTML = "";
    tasks.forEach(task => {
        container.innerHTML += createTaskElement(task.name, task.date);
    });
}

// Create Task Element
function createTaskElement(name, date) {
    return `
        <div class="todo-item" id="task-${name}">
            <span>${name} (${date || 'N/A'})</span>
            <button class="done-btn" onclick="markDone('${name}', this)">DONE ✅</button>
            <button onclick="removeTask('${name}')">❌</button>
        </div>
    `;
}

// Mark as Done
function markDone(name, button) {
    let element = document.getElementById(`task-${name}`);
    element.classList.add("done");
    button.classList.add("completed");
    button.innerText = "✔ COMPLETED";
}

// Remove Task (Move to Recovery)
function removeTask(name) {
    document.getElementById(`task-${name}`).remove();
    let removedTasks = JSON.parse(localStorage.getItem("removedTasks")) || [];
    removedTasks.push(name);
    localStorage.setItem("removedTasks", JSON.stringify(removedTasks));
    loadRecoveryTab();
}

// Open Task Form
function openTaskForm() {
    document.getElementById("taskForm").style.display = "block";
}

// Close Task Form
function closeTaskForm() {
    document.getElementById("taskForm").style.display = "none";
}

// Add New Task
function addTask() {
    let taskName = document.getElementById("taskName").value.trim();
    if (taskName === "") return alert("Please enter a task name.");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: taskName, date: new Date().toLocaleDateString() });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
    closeTaskForm();
}

// Load Recovery Tab
function loadRecoveryTab() {
    let removedTasks = JSON.parse(localStorage.getItem("removedTasks")) || [];
    let container = document.getElementById("recoveryList");
    container.innerHTML = "";
    removedTasks.forEach(name => {
        container.innerHTML += `<div class="todo-item">
            <span>${name}</span>
            <button onclick="restoreTask('${name}')">🔄 Restore</button>
        </div>`;
    });
}

// Restore Task
function restoreTask(name) {
    let removedTasks = JSON.parse(localStorage.getItem("removedTasks")) || [];
    removedTasks = removedTasks.filter(item => item !== name);
    localStorage.setItem("removedTasks", JSON.stringify(removedTasks));

    loadTasks();
    loadRecoveryTab();
}
