document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    updateCompletedCount();

    document.querySelectorAll("nav button").forEach(button => {
        button.addEventListener("click", function () {
            switchTab(this.getAttribute("data-tab"));
        });
    });

    document.querySelector(".add-btn").addEventListener("click", function () {
        showEarningsForm();
    });

    generateUserDescription();
});

// List of projects
const projects = [
    "Bless", "Dawn", "Grass", "Graident", "One football", "Teneo", "Nexus", "Nodepay",
    "Blockmesh", "Flow3", "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
    "Giza", "Exhabits", "Sogni", "Solflare nft", "Deshare [Cess]", "Wonix", "Arch",
    "Dvin", "Blockscout", "Malda", "Somnia", "Social incentive", "Billions", "Pod [Dreamers]"
];

// Load tasks
function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    projects.forEach(project => {
        const li = document.createElement("li");
        li.innerHTML = `
            <button class="project-btn" onclick="openProject('${project}')">${project}</button>
            <button class="done-btn" onclick="toggleTask(this)">✔️</button>
        `;
        taskList.appendChild(li);
    });
}

// Open project page if exists
function openProject(project) {
    const fileName = `${project.toLowerCase().replace(/\s+/g, '')}.html`;
    fetch(fileName).then(response => {
        if (response.ok) window.location.href = fileName;
    });
}

// Toggle task completion
function toggleTask(button) {
    button.classList.toggle("completed");
    saveTasks();
    updateCompletedCount();
}

// Update completed task count
function updateCompletedCount() {
    const total = document.querySelectorAll("#task-list li").length;
    const completed = document.querySelectorAll(".completed").length;
    document.getElementById("completed").textContent = completed;
    document.getElementById("total").textContent = total;
}

// Switch tab
function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
    document.getElementById(tabId).classList.remove("hidden");
}

// Show earnings form
function showEarningsForm() {
    const type = prompt("Investment or Earning?");
    if (!type) return;

    const project = prompt("Select Project Name:");
    if (!projects.includes(project)) return;

    const amount = prompt("Enter Amount:");
    const description = prompt("Enter Description:");

    if (!amount || !description) return;

    const entry = document.createElement("div");
    entry.classList.add("portfolio-entry");
    entry.innerHTML = `<span class="expandable">● ${project} - $${amount}</span>
                        <p class="hidden">${description}</p>`;
    entry.addEventListener("click", () => {
        entry.querySelector("p").classList.toggle("hidden");
    });

    document.getElementById("portfolio-list").appendChild(entry);

    updateTotalEarnings(type, amount);
}

// Update total earnings
function updateTotalEarnings(type, amount) {
    let total = parseFloat(document.getElementById(type === "Earning" ? "total-earnings" : "total-investments").textContent.replace("$", ""));
    total += parseFloat(amount);
    document.getElementById(type === "Earning" ? "total-earnings" : "total-investments").textContent = `$${total}`;
}

// Generate user description
function generateUserDescription() {
    const userDescription = `You have been actively working on ${projects.length} testnet projects. 
    Keep track of your progress and earnings here.`;
    document.getElementById("user-description").textContent = userDescription;
}
