document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ];

    let completedProjects = JSON.parse(localStorage.getItem("removed")) || [];
    let earnings = JSON.parse(localStorage.getItem("earnings")) || [];

    function renderProjects() {
        const projectList = document.getElementById("projectList");
        projectList.innerHTML = "";
        projects.forEach(name => {
            if (!completedProjects.includes(name)) {
                const div = document.createElement("div");
                div.className = "project-box";
                div.innerHTML = `
                    <span>${name}</span>
                    <button onclick="markDone(this)">✅</button>
                    <button onclick="openLink('${name}')">🔗</button>
                    <button onclick="removeProject('${name}')">❌</button>
                `;
                projectList.appendChild(div);
            }
        });
        document.getElementById("taskCounter").textContent = `${document.querySelectorAll('.project-box.done').length} / ${projects.length} Completed`;
    }

    function markDone(btn) {
        btn.parentElement.classList.add("done");
        renderProjects();
    }

    function openLink(name) {
        let link = localStorage.getItem(name + "_link");
        if (link) window.open(link, "_blank");
    }

    function removeProject(name) {
        completedProjects.push(name);
        localStorage.setItem("removed", JSON.stringify(completedProjects));
        renderProjects();
        renderRemoved();
    }

    function renderRemoved() {
        const removedList = document.getElementById("removedProjects");
        removedList.innerHTML = completedProjects.map(name => `<div>${name} <button onclick="restoreProject('${name}')">↩</button></div>`).join("");
    }

    function restoreProject(name) {
        completedProjects = completedProjects.filter(p => p !== name);
        localStorage.setItem("removed", JSON.stringify(completedProjects));
        renderProjects();
        renderRemoved();
    }

    function openForm() {
        document.getElementById("popupForm").style.display = "block";
    }

    function saveEntry() {
        // Handle saving earnings
    }

    setInterval(() => { localStorage.removeItem("removed"); renderProjects(); }, 86400000);

    renderProjects();
    renderRemoved();
});
