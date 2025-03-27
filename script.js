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

// Check if it's a new day and reset tasks
function checkForDailyReset() {
    let lastDate = localStorage.getItem("lastResetDate");
    let today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD

    if (lastDate !== today) {
        localStorage.setItem("lastResetDate", today);
        resetTasks();
    }
}

// Open Task Form
function openTaskForm() {
    document.getElementById("taskForm").style.display = "block";
}

// Close Task Form
function closeTaskForm() {
    document.getElementById("taskForm").style.display = "none";
}

// Add Task to List
function addTask() {
    let name = document.getElementById("taskName").value.trim();
    let category = document.getElementById("taskCategory").value;

    if (name === "") return;

    let container = document.getElementById(category);
    let taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <span>${name}</span>
        <button class="done-btn" onclick="markDone(this)">✅ DONE</button>
    `;

    container.appendChild(taskElement);
    saveTasks();
    closeTaskForm();
}

// Mark Task as Done
function markDone(button) {
    let item = button.closest(".task-item");
    item.classList.add("completed");
    item.innerHTML = `<span>${item.textContent.replace("✅ DONE", "").trim()}</span> <span class="completed">✅🗿 Completed</span>`;
    saveTasks();
}

// Remove Task (Dropdown Method)
function openRemoveForm() {
    document.getElementById("removeTaskForm").style.display = "block";
    populateRemoveDropdown();
}

function closeRemoveTaskForm() {
    document.getElementById("removeTaskForm").style.display = "none";
}

// Populate Remove Dropdown
function populateRemoveDropdown() {
    let dropdown = document.getElementById("taskToRemove");
    dropdown.innerHTML = ""; // Clear previous options

    document.querySelectorAll(".task-item").forEach(task => {
        let option = document.createElement("option");
        option.textContent = task.textContent.replace("✅🗿 Completed", "").trim();
        dropdown.appendChild(option);
    });
}

// Remove Selected Task
function removeTask() {
    let selectedTask = document.getElementById("taskToRemove").value;
    if (!selectedTask) return;

    document.querySelectorAll(".task-item").forEach(task => {
        if (task.textContent.includes(selectedTask)) {
            task.remove();
        }
    });

    saveTasks();
    closeRemoveTaskForm();
}

// Remove All Tasks
function removeAllTasks() {
    document.querySelectorAll(".task-item").forEach(task => task.remove());
    saveTasks();
}

// Reset Tasks at Midnight (Loads Default Tasks)
function resetTasks() {
    document.querySelectorAll(".task-item").forEach(task => task.remove());
    localStorage.removeItem("savedTasks");

    // Load default tasks again
    loadTasks();
}

// Save Tasks to Local Storage
function saveTasks() {
    let taskData = {};

    document.querySelectorAll("section").forEach(container => {
        let category = container.id;
        let tasks = [];

        container.querySelectorAll(".task-item").forEach(task => {
            tasks.push(task.textContent.replace("✅🗿 Completed", "").trim());
        });

        taskData[category] = tasks;
    });

    localStorage.setItem("savedTasks", JSON.stringify(taskData));
}

// Load Tasks from Local Storage
function loadTasks() {
    let savedTasks = localStorage.getItem("savedTasks");
    
    // Check if data exists, else use defaultTasks
    if (!savedTasks) {
        savedTasks = defaultTasks;
    } else {
        try {
            savedTasks = JSON.parse(savedTasks);
        } catch (e) {
            console.error("Error reading localStorage. Resetting...", e);
            localStorage.removeItem("savedTasks");
            savedTasks = defaultTasks;
        }
    }

    Object.keys(savedTasks).forEach(category => {
        let container = document.getElementById(category);
        if (!container) return;

        savedTasks[category].forEach(taskName => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-item");
            taskElement.innerHTML = `
                <span>${taskName}</span>
                <button class="done-btn" onclick="markDone(this)">✅ DONE</button>
            `;
            container.appendChild(taskElement);
        });
    });

}
