document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    scheduleMidnightReset();
});

// Toggle popup menu
function togglePopup() {
    let popup = document.getElementById("popupMenu");
    popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

// Close popup menu
function closePopup() {
    document.getElementById("popupMenu").style.display = "none";
}

// Open and close forms
function openForm(type) {
    closeForm(); // Close any open form first
    let form = document.getElementById(`${type}TaskForm`);
    if (form) {
        form.style.display = "block";
    } else {
        console.error(`Form with ID '${type}TaskForm' not found.`);
    }
}
function closeForm() {
    document.querySelectorAll(".popup-form").forEach(form => form.style.display = "none");
}

// Add task
function addTask() {
    let taskName = document.getElementById("taskName").value.trim();
    let taskList = document.getElementById("taskList").value;
    if (!taskName) return;

    let list = document.getElementById(taskList);
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `${taskName} <button onclick="markDone(this)">✔</button>`;
    list.appendChild(taskDiv);

    saveTasks();
    closeForm();
}

// Mark task as done/undone
function markDone(button) {
    button.parentElement.classList.toggle("completed");
    saveTasks();
}

// Remove task (fixed)
function removeTask() {
    let listName = document.getElementById("removeTaskList").value;
    let taskName = document.getElementById("removeTaskName").value.trim();
    let list = document.getElementById(listName);
    let tasks = list.getElementsByClassName("task");

    if (!taskName) return; // Prevent empty input

    let taskRemoved = false;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].textContent.includes(taskName)) {
            tasks[i].remove();
            taskRemoved = true;
            break;
        }
    }

    if (!taskRemoved) {
        alert("Task not found in the selected list.");
    } else {
        saveTasks();
        closeForm();
    }
}

// Save tasks to local storage
function saveTasks() {
    let allTasks = {};
    document.querySelectorAll(".task-list").forEach(list => {
        let listId = list.id;
        allTasks[listId] = [];

        list.querySelectorAll(".task").forEach(task => {
            allTasks[listId].push({
                name: task.textContent.replace("✔", "").trim(),
                completed: task.classList.contains("completed")
            });
        });
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Load tasks from local storage
function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    
    Object.keys(storedTasks).forEach(listId => {
        let list = document.getElementById(listId);
        storedTasks[listId].forEach(task => {
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            taskDiv.innerHTML = `${task.name} <button onclick="markDone(this)">✔</button>`;
            if (task.completed) taskDiv.classList.add("completed");
            list.appendChild(taskDiv);
        });
    });
}

// Reset all tasks to undone
function resetTasks() {
    document.querySelectorAll(".task").forEach(task => task.classList.remove("completed"));
    saveTasks();
}

// Schedule reset at midnight
function scheduleMidnightReset() {
    let now = new Date();
    let midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to next midnight

    let timeUntilMidnight = midnight - now;
    setTimeout(() => {
        resetTasks();
        scheduleMidnightReset(); // Schedule for the next day
    }, timeUntilMidnight);
}


function openmanage() {
    window.location.href = "manage.html";
}
