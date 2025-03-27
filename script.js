const nativeTestnets = [
    "Bless", "Dawn", "Grass", "Graident", "One Football",
    "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
    "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
    "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
    "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
    "Social Incentive", "Billions", "Pod [Dreamers]"
];

let removedTestnets = JSON.parse(localStorage.getItem("removedTestnets")) || [];
let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
let earningsLog = JSON.parse(localStorage.getItem("earningsLog")) || [];

document.addEventListener("DOMContentLoaded", function () {
    loadTestnets();
    loadRecoveryList();
    loadEarningsLog();
});

function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

function openProfile() {
    window.open("https://t.me/milkyway_king", "_blank");
}

// Custom Testnet Functions
function showTestnetForm() {
    document.getElementById("testnetForm").style.display = "block";
}

function closeTestnetForm() {
    document.getElementById("testnetForm").style.display = "none";
}

function addCustomTestnet() {
    let name = document.getElementById("testnetName").value;
    if (!name) return;
    customTestnets.push(name);
    localStorage.setItem("customTestnets", JSON.stringify(customTestnets));
    loadTestnets();
    closeTestnetForm();
}

function loadTestnets() {
    let container = document.getElementById("testnetContainer");
    container.innerHTML = "";

    [...nativeTestnets, ...customTestnets].forEach(name => {
        container.innerHTML += `<div class="testnet">${name}</div>`;
    });
}
