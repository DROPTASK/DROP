document.addEventListener("DOMContentLoaded", function() {
    const projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ];

    const projectListDiv = document.querySelector('.project-list');
    const removedListDiv = document.querySelector('.removed-list');
    let removedProjects = JSON.parse(localStorage.getItem('removedProjects')) || [];

    function updateProgress() {
        let completed = document.querySelectorAll(".project-item.done").length;
        document.getElementById("progress").innerText = `${completed} / ${projects.length} Completed`;
    }

    projects.forEach(name => {
        const div = document.createElement('div');
        div.className = "project-item";
        div.innerHTML = `<span>${name}</span>
            <button class="details-btn">Details</button>
            <button class="done-btn">✅</button>
            <button class="remove-btn">❌</button>`;

        div.querySelector(".done-btn").onclick = function() {
            div.classList.toggle("done");
            div.style.background = div.classList.contains("done") ? "lightgreen" : "white";
            updateProgress();
        };

        div.querySelector(".remove-btn").onclick = function() {
            removedProjects.push(name);
            localStorage.setItem("removedProjects", JSON.stringify(removedProjects));
            div.remove();
            updateProgress();
        };

        projectListDiv.appendChild(div);
    });

    removedProjects.forEach(name => {
        const div = document.createElement('div');
        div.className = "project-item";
        div.innerHTML = `<span>${name}</span>
            <button class="restore-btn">📥 Restore</button>`;

        div.querySelector(".restore-btn").onclick = function() {
            removedProjects = removedProjects.filter(p => p !== name);
            localStorage.setItem("removedProjects", JSON.stringify(removedProjects));
            div.remove();
        };

        removedListDiv.appendChild(div);
    });

    updateProgress();
});

function openTab(tab) {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
    document.getElementById(tab).style.display = "block";
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
