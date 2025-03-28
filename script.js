// Toggle the Options Window
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

// Close the Options Window Automatically
function closeOptions() {
    document.getElementById("optionsWindow").style.display = "none";
}

// Open Task Form & Auto-Close Options Menu
function openTaskForm() {
    closeAllPopups();
    document.getElementById("taskForm").style.display = "block";
    closeOptions();
}

// Close Task Form
function closeTaskForm() {
    document.getElementById("taskForm").style.display = "none";
}

// Open Manage Money (Redirect & Auto-Close Options Menu)
function openManageMoney() {
    closeAllPopups();
    closeOptions();
    window.location.href = 'manage.html';
}

// Open Remove Task Form & Auto-Close Options Menu
function openRemoveTaskForm() {
    closeAllPopups();
    document.getElementById("removeTaskForm").style.display = "block";
    closeOptions();
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

// Add Task Function (Auto-Closes Form)
function addTask() {
    let taskName = document.getElementById("taskName").value;
    let category = document.getElementById("taskCategory").value;

    if (taskName.trim() === "") return alert("Please enter a task name!");

    let taskId = "task-" + Date.now();

    let section = document.getElementById(category);
    let task = document.createElement("div");
    task.classList.add("task");
    task.id = taskId;
    task.innerHTML = `<p>${taskName} <button onclick="completeTask('${taskId}')">✔ Done</button></p>`;
    section.appendChild(task);

    let select = document.getElementById("taskToRemove");
    let option = document.createElement("option");
    option.value = taskId;
    option.textContent = taskName;
    select.appendChild(option);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id: taskId, name: taskName, category, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    closeTaskForm(); // Auto-close form
}

// Complete Task (Auto-Saves to LocalStorage)
function completeTask(taskId) {
    let task = document.getElementById(taskId);
    if (!task) return;

    task.classList.add("completed");
    let button = task.querySelector("button");
    if (button) button.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) task.completed = true;
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Selected Task (Auto-Closes Form)
function removeTask() {
    let select = document.getElementById("taskToRemove");
    let selectedTaskId = select.value;

    if (!selectedTaskId) return alert("No task selected!");

    let task = document.getElementById(selectedTaskId);
    if (task) task.remove();

    select.options[select.selectedIndex].remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== selectedTaskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    closeRemoveTaskForm(); // Auto-close form
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

        taskDiv.innerHTML = `<p>${task.name} ${task.completed ? "" : `<button onclick="completeTask('${task.id}')">✔ Done</button>`}</p>`;
        section.appendChild(taskDiv);

        let option = document.createElement("option");
        option.value = task.id;
        option.textContent = task.name;
        document.getElementById("taskToRemove").appendChild(option);
    });
}

// Reset Completed Tasks (Auto-Saves to LocalStorage)
function resetCompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task => {
        task.completed = false; // Mark task as undone
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Function to reset completed tasks at 00:00
function resetTasksAtMidnight() {
    let lastResetDate = localStorage.getItem("lastResetDate");
    let todayDate = new Date().toISOString().split("T")[0];

    if (lastResetDate !== todayDate) {
        resetCompletedTasks();
        localStorage.setItem("lastResetDate", todayDate); // Store today's date
    }
}

// Load tasks on page load
window.onload = function () {
    resetTasksAtMidnight(); // Reset tasks if it's a new day
    loadTasks();
};
