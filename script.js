document.addEventListener("DOMContentLoaded", function () {
    const tasks = [
        "Bless", "Dawn", "Grass", "Graident", "One Football", "Teneo", "Nexus", 
        "Nodepay", "Blockmesh", "Flow3", "Mygate", "Treasury", "Layeredge", "Common", 
        "Beamable", "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]", 
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia", "Social Incentive", 
        "Billions", "Pod [Dreamers]"
    ];

    const taskList = document.getElementById("task-list");
    const completedCount = document.getElementById("completed");
    const totalCount = document.getElementById("total");

    totalCount.textContent = tasks.length;

    let taskStatus = JSON.parse(localStorage.getItem("taskStatus")) || {};
    let earningsData = JSON.parse(localStorage.getItem("earningsData")) || [];
    let pastProjects = JSON.parse(localStorage.getItem("pastProjects")) || [];

    tasks.forEach((task, index) => {
        if (!(index in taskStatus)) {
            taskStatus[index] = false;
        }

        const li = document.createElement("li");

        const button = document.createElement("button");
        button.textContent = task;
        button.classList.add("task-button");
        if (taskStatus[index]) button.classList.add("completed");

        button.addEventListener("click", () => {
            button.classList.toggle("completed");
            taskStatus[index] = button.classList.contains("completed");
            localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
            updateProgress();
        });

        button.addEventListener("dblclick", () => {
            const filename = `${task.toLowerCase().replace(/\s+/g, '')}.html`;
            fetch(filename).then(response => {
                if (response.ok) window.open(filename, "_blank");
            });
        });

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("done-btn");
        doneBtn.addEventListener("click", () => {
            button.classList.add("completed");
            taskStatus[index] = true;
            localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
            updateProgress();
        });

        li.appendChild(button);
        li.appendChild(doneBtn);
        taskList.appendChild(li);
    });

    updateProgress();

    function updateProgress() {
        let completedTasks = Object.values(taskStatus).filter(status => status).length;
        completedCount.textContent = completedTasks;
    }

    document.getElementById("home-tab").addEventListener("click", () => switchTab("home"));
    document.getElementById("analytics-tab").addEventListener("click", () => switchTab("analytics"));
    document.getElementById("earnings-tab").addEventListener("click", () => switchTab("earnings"));
    document.getElementById("past-projects-tab").addEventListener("click", () => switchTab("past-projects"));

    function switchTab(tab) {
        document.querySelectorAll(".hidden").forEach(section => section.style.display = "none");
        if (tab !== "home") document.getElementById(tab).style.display = "block";
    }
});
