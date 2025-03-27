document.addEventListener("DOMContentLoaded", function () {
    let projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ]; // Add your projects here
    let completedProjects = JSON.parse(localStorage.getItem("removed")) || [];
    let earnings = JSON.parse(localStorage.getItem("earnings")) || [];

    function renderProjects() {
        const projectGrid = document.getElementById("projectGrid");
        projectGrid.innerHTML = "";
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
                projectGrid.appendChild(div);
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
        removedList.innerHTML = "";
        completedProjects.forEach(name => {
            const div = document.createElement("div");
            div.innerHTML = `${name} <button onclick="restoreProject('${name}')">↩</button>`;
            removedList.appendChild(div);
        });
    }

    function restoreProject(name) {
        completedProjects = completedProjects.filter(p => p !== name);
        localStorage.setItem("removed", JSON.stringify(completedProjects));
        renderProjects();
        renderRemoved();
    }

    setInterval(() => { localStorage.removeItem("removed"); renderProjects(); }, 86400000);

    renderProjects();
    renderRemoved();
});
