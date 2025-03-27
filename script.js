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
    }

    function openForm() {
        document.getElementById("popupForm").style.display = "block";
    }

    setInterval(() => { localStorage.removeItem("removed"); renderProjects(); }, 86400000);

    renderProjects();
});
