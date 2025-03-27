const nativeTestnets = [
    "Bless", "Dawn", "Grass", "Graident", "One Football",
    "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
    "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
    "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
    "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
    "Social Incentive", "Billions", "Pod [Dreamers]"
];

document.addEventListener("DOMContentLoaded", function () {
    loadNativeTestnets();
    loadCustomTestnets();
});

function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Load Native Testnets
function loadNativeTestnets() {
    let container = document.getElementById("nativeTestnets");
    container.innerHTML = "";
    nativeTestnets.forEach(name => {
        container.innerHTML += createTestnetElement(name);
    });
}

// Load Custom Testnets
function loadCustomTestnets() {
    let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    let container = document.getElementById("customTestnets");
    container.innerHTML = "";
    customTestnets.forEach(name => {
        container.innerHTML += createTestnetElement(name);
    });
}

function createTestnetElement(name) {
    return `
        <div class="testnet" id="testnet-${name}">
            <span>${name}</span>
            <div>
                <button onclick="markDone('${name}')">✅</button>
                <button onclick="removeTestnet('${name}')">❌</button>
            </div>
        </div>
    `;
}

function markDone(name) {
    document.getElementById(`testnet-${name}`).classList.add("done");
}

function removeTestnet(name) {
    document.getElementById(`testnet-${name}`).remove();
}

function openTestnetForm() {
    document.getElementById("testnetForm").style.display = "block";
}

function openAddTransaction() {
    window.location.href = "add.html";
}
