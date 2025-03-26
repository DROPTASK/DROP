document.addEventListener("DOMContentLoaded", function() {
    // Load Project List
    const projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ];

    // Populate home page
    const projectListDiv = document.querySelector('.project-list');
    projects.forEach(name => {
        const div = document.createElement('div');
        div.className = "project-item";
        div.innerText = name;
        div.onclick = () => window.open(`${name}.html`, "_blank");
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
    const amount = document.getElementById("entryAmount").value;

    if (!amount) return alert("Please enter an amount");

    let logDiv = document.createElement("div");
    logDiv.className = "summary-box";
    logDiv.innerHTML = `<p>${type.toUpperCase()}</p><h3>$${amount}</h3><p>${project}</p>`;
    
    document.getElementById("logs").appendChild(logDiv);
    document.getElementById("popupForm").style.display = "none";
}
