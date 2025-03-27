document.addEventListener("DOMContentLoaded", function () {
    let nativeProjects = ["Bless", "Dawn", "Grass", "Graident", "One Football", "Teneo"];
    let customProjects = JSON.parse(localStorage.getItem("customProjects")) || [];
    let removedProjects = JSON.parse(localStorage.getItem("removed")) || [];

    function renderProjects() {
        let renderList = (projects, containerId) => {
            let container = document.getElementById(containerId);
            container.innerHTML = "";
            projects.forEach(name => {
                if (!removedProjects.includes(name)) {
                    let div = document.createElement("div");
                    div.className = "project-box";
                    div.innerHTML = `
                        <span>${name}</span>
                        <button onclick="markDone(this)">✅</button>
                        <button onclick="removeProject('${name}')">❌</button>
                    `;
                    container.appendChild(div);
                }
            });
        };

        renderList(nativeProjects, "nativeGrid");
        renderList(customProjects, "customGrid");
    }

    function markDone(btn) {
        btn.parentElement.classList.add("done");
        renderProjects();
    }

    function removeProject(name) {
        removedProjects.push(name);
        localStorage.setItem("removed", JSON.stringify(removedProjects));
        renderProjects();
        renderRemoved();
    }

    function renderRemoved() {
        const removedList = document.getElementById("removedProjects");
        removedList.innerHTML = "";
        removedProjects.forEach(name => {
            const div = document.createElement("div");
            div.innerHTML = `${name} <button onclick="restoreProject('${name}')">↩</button>`;
            removedList.appendChild(div);
        });
    }

    function restoreProject(name) {
        removedProjects = removedProjects.filter(p => p !== name);
        localStorage.setItem("removed", JSON.stringify(removedProjects));
        renderProjects();
        renderRemoved();
    }

    document.getElementById("logs").innerHTML = "<p>No logs yet</p>";

    setInterval(() => { localStorage.removeItem("removed"); renderProjects(); }, 86400000);

    renderProjects();
    renderRemoved();
});
