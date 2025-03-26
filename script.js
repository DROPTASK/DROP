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

    // Load task status from LocalStorage or create an empty object
    let taskStatus = JSON.parse(localStorage.getItem("taskStatus")) || {};
    
    // Create task buttons dynamically
    tasks.forEach((task, index) => {
        if (!(index in taskStatus)) {
            taskStatus[index] = false;  // Default: Not completed
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

        li.appendChild(button);
        taskList.appendChild(li);
    });

    updateProgress(); // Initial progress update

    function updateProgress() {
        let completedTasks = Object.values(taskStatus).filter(status => status).length;
        completedCount.textContent = completedTasks;
        saveDailyStats(completedTasks);
    }

    function saveDailyStats(count) {
        const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        let stats = JSON.parse(localStorage.getItem("dailyStats")) || {};
        
        stats[today] = count;

        // Keep data for 90 days
        const keys = Object.keys(stats);
        if (keys.length > 90) {
            delete stats[keys[0]];
        }

        localStorage.setItem("dailyStats", JSON.stringify(stats));
    }
});
