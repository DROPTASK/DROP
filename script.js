document.addEventListener("DOMContentLoaded", function() {
    loadProjects();
    openTab('home');
    resetTasksAtMidnight();
});

const projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ];

let removedProjects = [];

function loadProjects() {
    const projectListDiv = document.getElementById('project-list');
    projectListDiv.innerHTML = "";
    projects.forEach((name, index) => {
        let div = document.createElement("div");
        div.className = "project-item";
        div.innerHTML = `
            <span>${name}</span>
            <button onclick="markDone(this)">✅</button>
            <button onclick="removeProject(${index})">❌</button>
            <button onclick="openDetails('${name}')">🔗</button>
        `;
        projectListDiv.appendChild(div);
    });
    updateTaskCount();
}

function openTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

function markDone(btn) {
    let parent = btn.parentElement;
    parent.classList.toggle("done");
    updateTaskCount();
}

function removeProject(index) {
    removedProjects.push(projects[index]);
    projects.splice(index, 1);
    loadProjects();
}

function openDetails(projectName) {
    const links = {
        "Bless": "https://example.com/bless",
        "Dawn": "https://example.com/dawn"
    };
    if (links[projectName]) window.open(links[projectName], "_blank");
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function saveEntry() {
    let type = document.getElementById("entryType").value;
    let amount = parseFloat(document.getElementById("entryAmount").value);
    if (!amount) return;

    let totalId = type === "investment" ? "investmentTotal" : "earningsTotal";
    let total = parseFloat(document.getElementById(totalId).innerText.replace("$", "")) || 0;
    document.getElementById(totalId).innerText = `$${total + amount}`;
    
    document.getElementById("popupForm").style.display = "none";
}

function updateTaskCount() {
    let completed = document.querySelectorAll(".project-item.done").length;
    document.getElementById("taskCount").innerText = `Completed: ${completed} / ${projects.length}`;
}

function resetTasksAtMidnight() {
    let now = new Date();
    let timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;
    setTimeout(() => {
        loadProjects();
        resetTasksAtMidnight();
    }, timeUntilMidnight);
}
