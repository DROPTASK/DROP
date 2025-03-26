document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        "Bless", "Dawn", "Grass", "Graident", "One Football", "Teneo", "Nexus",
        "Nodepay", "Blockmesh", "Flow3", "Mygate", "Treasury", "Layeredge",
        "Common", "Beamable", "Giza", "Exhabits", "Sogni", "Solflare NFT",
        "Deshare [Cess]", "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ];

    const projectList = document.getElementById("projectList");
    projects.forEach(proj => {
        const div = document.createElement("div");
        div.classList.add("project-item");
        div.innerHTML = `
            ${proj}
            <button class="done-btn">✔️</button>
        `;
        projectList.appendChild(div);
    });

    document.getElementById("addEntry").addEventListener("click", function () {
        document.getElementById("entryForm").classList.remove("hidden");
    });

    document.getElementById("closeForm").addEventListener("click", function () {
        document.getElementById("entryForm").classList.add("hidden");
    });

    document.getElementById("saveEntry").addEventListener("click", function () {
        const type = document.getElementById("entryType").value;
        const testnet = document.getElementById("testnet").value;
        const description = document.getElementById("description").value;
        const amount = document.getElementById("amount").value;

        const logEntry = document.createElement("div");
        logEntry.classList.add("log-entry");
        logEntry.innerHTML = `
            <strong>${type.toUpperCase()}</strong><br>
            ${testnet} - $${amount}<br>
            ${description}
        `;
        document.getElementById("earningsLog").appendChild(logEntry);
        document.getElementById("entryForm").classList.add("hidden");
    });

    function switchTab(tab) {
        document.getElementById("home").classList.add("hidden");
        document.getElementById("earnings").classList.add("hidden");
        document.getElementById(tab).classList.remove("hidden");
    }
});
