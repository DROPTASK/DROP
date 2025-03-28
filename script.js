// Function to reset completed tasks at 00:00
function resetTasksAtMidnight() {
    let lastResetDate = localStorage.getItem("lastResetDate");
    let todayDate = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format

    if (lastResetDate !== todayDate) {
        resetCompletedTasks();
        localStorage.setItem("lastResetDate", todayDate); // Update reset date
    }
}

// Reset Completed Tasks (Now Updates LocalStorage)
function resetCompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Reset only completed tasks
    tasks = tasks.map(task => {
        task.completed = false;
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Refresh UI
}

// Load tasks from localStorage on page load
window.onload = function () {
    resetTasksAtMidnight(); // Check if reset is needed
    loadTasks(); // Load tasks
};
// Function to reset completed tasks at 00:00
function resetTasksAtMidnight() {
    let lastResetDate = localStorage.getItem("lastResetDate");
    let todayDate = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format

    if (lastResetDate !== todayDate) {
        resetCompletedTasks();
        localStorage.setItem("lastResetDate", todayDate); // Update reset date
    }
}

// Reset Completed Tasks (Now Updates LocalStorage)
function resetCompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Reset only completed tasks
    tasks = tasks.map(task => {
        task.completed = false;
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Refresh UI
}

// Load tasks from localStorage on page load
window.onload = function () {
    resetTasksAtMidnight(); // Check if reset is needed
    loadTasks(); // Load tasks
};


