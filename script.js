const nativeTestnets = [
    "Bless", "Dawn", "Grass", "Graident", "One Football",
    "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
    "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
    "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
    "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
    "Social Incentive", "Billions", "Pod [Dreamers]"
];

let removedTestnets = [];

document.addEventListener("DOMContentLoaded", function () {
    loadNativeTestnets();
    loadCustomTestnets();
    loadRecoveryList();
});

function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Custom Testnet Functions
function openTestnetForm() {
    document.getElementById("testnetForm").style.display = "block";
}

function closeTestnetForm() {
    document.getElementById("testnetForm").style.display = "none";
}

function addCustomTestnet() {
    let name = document.getElementById("testnetName").value;
    if (!name) return;
    let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    customTestnets.push(name);
    localStorage.setItem("customTestnets", JSON.stringify(customTestnets));
    loadCustomTestnets();
    closeTestnetForm();
}

// Recovery Tab
function removeTestnet(name) {
    removedTestnets.push(name);
    loadRecoveryList();
}

function loadRecoveryList() {
    let container = document.getElementById("recoveryList");
    container.innerHTML = "";
    removedTestnets.forEach(name => {
        container.innerHTML += `
            <div class="testnet">
                <span>${name}</span>
                <button onclick="recoverTestnet('${name}')">🔄 Recover</button>
            </div>
        `;
    });
}

function recoverTestnet(name) {
    removedTestnets = removedTestnets.filter(t => t !== name);
    loadRecoveryList();
}
