document.addEventListener("DOMContentLoaded", function () {
    checkForDailyReset();
    loadTasks();
});

// Default tasks
const defaultTasks = {
    "Check-in": ["One football", "Shaga", "Somnia", "Dvin", "Cess", "Arch", "Part of Dream", "Sogni AI", "Billion"],
    "Check Connection": ["Dawn", "Blockmesh", "Grass", "Gradient", "Teneo", "Nexus", "Bless", "Openloop", "Distribute"],
    "Testnet": ["Taker", "Chaos", "Stork", "Parasil", "Initia", "Blackscout", "Coresky", "Linera"],
    "Simple Task": ["Malda [soon testnet]", "Exabits", "Arch", "Plasma", "Abstract", "World3"],
    "Others": ["Node Shift", "Giza", "Dango [early adopter]", "Sophon", "Solflare NFT"]
};

// Check and reset daily
function checkForDailyReset() {
    let lastDate = localStorage.getItem("lastResetDate");
    let today = new Date().toISOString().split("T")[0];

    if (lastDate !== today) {
        localStorage.setItem("lastResetDate", today);
        resetTasks();
    }
}

// Open and close forms
function openTaskForm() { document.getElementById("taskForm").style.display = "block"; }
function closeTaskForm() { document.getElementById("taskForm").style.display = "none"; }
function openRemoveTaskForm() { document.getElementById("removeTaskForm").style.display = "block"; loadRemoveOptions(); }
function closeRemoveTaskForm() { document.getElementById("removeTaskForm").style.display = "none"; }

// Add Task
function addTask() {
    let name = document.getElementById("taskName").value.trim();
    let category = document.getElementById("taskCategory").value;
    if (!name) return;

    let taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <span>${name}</span>
        <button class="done-btn" onclick="markDone(this)">✅ DONE</button>
    `;

    document.getElementById(category).appendChild(taskElement);
    saveTasks();
    closeTaskForm();
}

// Mark Task as Done
function markDone(button) {
    let item = button.closest(".task-item");
    let taskName = item.querySelector("span").textContent.trim();
    let category = item.closest("section").id;

    item.classList.add("completed");
    item.innerHTML = `<span>${taskName}</span> <span class="completed">✅🗿 Completed</span>`;

    saveTasks();
}

// Remove Task via Dropdown
function removeTask() {
    let selectedTask = document.getElementById("taskToRemove").value;
    if (!selectedTask) return;

    document.querySelectorAll(".task-item").forEach(task => {
        if (task.querySelector("span").textContent.trim() === selectedTask) {
            task.remove();
        }
    });

    saveTasks();
    closeRemoveTaskForm();
}

// Load Remove Dropdown
function loadRemoveOptions() {
    let select = document.getElementById("taskToRemove");
    select.innerHTML = "";

    document.querySelectorAll(".task-item").forEach(task => {
        let taskName = task.querySelector("span").textContent.trim();
        let option = document.createElement("option");
        option.value = taskName;
        option.textContent = taskName;
        select.appendChild(option);
    });
}

// Remove All Tasks
function removeAllTasks() {
    document.querySelectorAll(".task-item").forEach(task => task.remove());
    saveTasks();
}

// Save Tasks
function saveTasks() {
    let taskData = {};

    document.querySelectorAll("section").forEach(section => {
        let category = section.id;
        let tasks = [];

        section.querySelectorAll(".task-item").forEach(task => {
            let name = task.querySelector("span").textContent.trim();
            let isCompleted = task.classList.contains("completed");
            tasks.push({ name, completed: isCompleted });
        });

        taskData[category] = tasks;
    });

    localStorage.setItem("savedTasks", JSON.stringify(taskData));
}

// Load Tasks
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || defaultTasks;

    Object.keys(savedTasks).forEach(category => {
        let container = document.getElementById(category);
        if (!container) return;

        savedTasks[category].forEach(task => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-item");

            if (task.completed) {
                taskElement.classList.add("completed");
                taskElement.innerHTML = `<span>${task.name}</span> <span class="completed">✅🗿 Completed</span>`;
            } else {
                taskElement.innerHTML = `
                    <span>${task.name}</span>
                    <button class="done-btn" onclick="markDone(this)">✅ DONE</button>
                `;
            }

            container.appendChild(taskElement);
        });
    });
}

// Reset Tasks (Load Default)
function resetTasks() {
    document.querySelectorAll(".task-item").forEach(task => task.remove());
    localStorage.removeItem("savedTasks");
    saveTasks();
    loadTasks();
}
