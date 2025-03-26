const projects = [
    "Bless", "Dawn", "Grass", "Graident", "One Football", "Teneo", "Nexus",
    "Nodepay", "Blockmesh", "Flow3", "Mygate", "Treasury", "Layeredge",
    "Common", "Beamable", "Giza", "Exhabits", "Sogni", "Solflare NFT",
    "Deshare [Cess]", "Wonix", "Arch", "Dvin", "Blockscout", "Malda",
    "Somnia", "Social Incentive", "Billions", "Pod [Dreamers]"
];

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    updateProgress();
});

function loadProjects() {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";
    projects.forEach((project, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("project-item");

        const projectName = document.createElement("span");
        projectName.textContent = project;

        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.classList.add("done-btn");
        doneButton.onclick = () => toggleDone(index, doneButton);

        listItem.appendChild(projectName);
        listItem.appendChild(doneButton);
        projectList.appendChild(listItem);
    });

    document.getElementById("total-projects").textContent = projects.length;
}

function toggleDone(index, button) {
    button.classList.toggle("done");
    updateProgress();
}

function updateProgress() {
    const doneCount = document.querySelectorAll(".done-btn.done").length;
    document.getElementById("completed-count").textContent = doneCount;
}

function showTab(tabName) {
    alert(`Switching to ${tabName} tab (Implement tab switching here)`);
}

function openModal() {
    document.getElementById("add-entry-modal").style.display = "block";
    loadProjectDropdown();
}

function closeModal() {
    document.getElementById("add-entry-modal").style.display = "none";
}

function loadProjectDropdown() {
    const dropdown = document.getElementById("project-name");
    dropdown.innerHTML = "";
    projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project;
        option.textContent = project;
        dropdown.appendChild(option);
    });
}

function addEntry() {
    const type = document.getElementById("entry-type").value;
    const project = document.getElementById("project-name").value;
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;

    console.log(`Added ${type}: ${project}, $${amount}, Description: ${description}`);

    closeModal();
}
