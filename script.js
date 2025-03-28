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
        let taskBox = document.createElement("div");
        taskBox.classList.add("task");
        taskBox.innerHTML = `${taskName} <button class="done-btn">✔️ Done</button>`;
        
        document.getElementById(taskCategory).appendChild(taskBox);
        
        taskBox.querySelector(".done-btn").addEventListener("click", function () {
            taskBox.classList.toggle("completed");
            this.textContent = taskBox.classList.contains("completed") ? "✅ Completed" : "✔️ Done";
        });

        document.getElementById("add-task-form").style.display = "none";
    }
});
