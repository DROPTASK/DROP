document.addEventListener("DOMContentLoaded", function() {
    // Load Projects
    const projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3"
    ];

    // Populate home page
    const projectListDiv = document.querySelector('.project-list');
    projects.forEach(name => {
        const div = document.createElement('div');
        div.className = "project-item";
        div.innerHTML = `${name} <button class="done-btn" onclick="openProject('${name}')">✔</button>`;
        projectListDiv.appendChild(div);
    });

    // Populate dropdown
    const projectSelect = document.getElementById("projectSelect");
    projects.forEach(name => {
        let option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        projectSelect.appendChild(option);
    });

    openTab('home');
});

// Open Project (if link exists)
function openProject(name) {
    const link = `${name}.html`;
    fetch(link)
        .then(response => {
            if (response.ok) {
                window.open(link, "_blank");
            }
        })
        .catch(() => console.log("No link found."));
}

function openTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";
    });
    document.getElementById(tabName).style.display = "block";
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function saveEntry() {
    const type = document.getElementById("entryType").value;
    const project = document.getElementById("projectSelect").value;
    const description = document.getElementById("entryDescription").value;
    const amount = parseFloat(document.getElementById("entryAmount").value);

    if (!amount) return alert("Please enter an amount");

    let logDiv = document.createElement("div");
    logDiv.className = "summary-box";
    logDiv.innerHTML = `<p>${type.toUpperCase()}</p><h3>$${amount}</h3><p>${project}</p>`;
    
    document.getElementById("logs").appendChild(logDiv);

    // Update totals
    let total = type === "investment" ? "investmentTotal" : "earningsTotal";
    let currentTotal = parseFloat(document.getElementById(total).innerText.substring(1)) || 0;
    document.getElementById(total).innerText = `$${(currentTotal + amount).toFixed(2)}`;

    document.getElementById("popupForm").style.display = "none";
}
