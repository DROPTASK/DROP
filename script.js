// Native testnets
const nativeTestnets = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
    ];

// Load from localStorage
let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];

// Render projects
function renderProjects() {
    const nativeList = document.getElementById("projectList");
    nativeList.innerHTML = nativeTestnets.map(name => `<div class="project-box">${name} <button onclick="markDone(this)">✅</button> <button onclick="removeProject('${name}')">❌</button></div>`).join("");

    const customList = document.getElementById("customTestnetList");
    customList.innerHTML = customTestnets.map(name => `<div class="project-box">${name} <button onclick="markDone(this)">✅</button> <button onclick="removeProject('${name}')">❌</button></div>`).join("");
}

function openCustomTestnetForm() {
    let name = prompt("Enter Custom Testnet Name:");
    if (name) {
        customTestnets.push(name);
        localStorage.setItem("customTestnets", JSON.stringify(customTestnets));
        renderProjects();
    }
}

renderProjects();
