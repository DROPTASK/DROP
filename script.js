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

        // Open project HTML if exists
        button.addEventListener("dblclick", () => {
            const filename = `${task.toLowerCase().replace(/\s+/g, '')}.html`;
            fetch(filename)
                .then(response => {
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
        saveDailyStats(completedTasks);
    }

    function saveDailyStats(count) {
        const today = new Date().toISOString().split("T")[0];
        let stats = JSON.parse(localStorage.getItem("dailyStats")) || {};
        stats[today] = count;

        const keys = Object.keys(stats);
        if (keys.length > 90) delete stats[keys[0]];

        localStorage.setItem("dailyStats", JSON.stringify(stats));
    }

    // Handle Tabs
    document.getElementById("home-tab").addEventListener("click", () => switchTab("home"));
    document.getElementById("analytics-tab").addEventListener("click", () => switchTab("analytics"));
    document.getElementById("earnings-tab").addEventListener("click", () => switchTab("earnings"));
    document.getElementById("past-projects-tab").addEventListener("click", () => switchTab("past-projects"));

    function switchTab(tab) {
        document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
        document.getElementById(tab + "-tab").classList.add("active");

        if (tab === "home") {
            taskList.style.display = "block";
        } else {
            taskList.style.display = "none";
            alert(`This is a placeholder for the ${tab} section!`);
        }
    }
});
