document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("menu-btn").addEventListener("click", () => {
    document.getElementById("popup-menu").style.display = "block";
});

document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup-menu").style.display = "none";
});

document.getElementById("add-task-btn").addEventListener("click", () => {
    document.getElementById("add-task-form").style.display = "block";
});

document.getElementById("save-task").addEventListener("click", () => {
    let taskName = document.getElementById("task-name").value;
    let taskCategory = document.getElementById("task-category").value;

    if (taskName) {
        let taskObj = { name: taskName, category: taskCategory, completed: false };
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        addTaskToDOM(taskObj);
        document.getElementById("add-task-form").style.display = "none";
    }
});

function addTaskToDOM(taskObj) {
    let taskBox = document.createElement("div");
    taskBox.classList.add("task");
    if (taskObj.completed) {
        taskBox.classList.add("completed");
    }
    taskBox.innerHTML = `${taskObj.name} <button class="done-btn">${taskObj.completed ? "✅ Completed" : "✔️ Done"}</button>`;

    document.getElementById(taskObj.category).appendChild(taskBox);

    taskBox.querySelector(".done-btn").addEventListener("click", function () {
        taskBox.classList.toggle("completed");
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let task = tasks.find(t => t.name === taskObj.name && t.category === taskObj.category);
        task.completed = taskBox.classList.contains("completed");
        localStorage.setItem("tasks", JSON.stringify(tasks));

        this.textContent = task.completed ? "✅ Completed" : "✔️ Done";
    });
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Auto-reset completed tasks at midnight
setInterval(() => {
    let now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => task.completed = false);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.querySelectorAll(".task.completed").forEach(task => {
            task.classList.remove("completed");
            task.querySelector(".done-btn").textContent = "✔️ Done";
        });
    }
}, 60000);
