document.addEventListener("DOMContentLoaded", function () {
    loadNativeTestnets();
    loadCustomTestnets();
    updateAnalytics();
});

// Tabs Switching
function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Testnets
const nativeTestnets = [
    "Bless", "Dawn", "Grass", "Graident", "One Football",
    "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3"
];

function loadNativeTestnets() {
    let container = document.getElementById("nativeTestnets");
    container.innerHTML = "";
    nativeTestnets.forEach(name => {
        container.innerHTML += createTestnetElement(name);
    });
}

function loadCustomTestnets() {
    let testnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    let container = document.getElementById("customTestnets");
    container.innerHTML = "";
    testnets.forEach(testnet => {
        container.innerHTML += createTestnetElement(testnet.name, testnet.date);
    });
}

function createTestnetElement(name, date) {
    return `
        <div class="testnet" id="testnet-${name}">
            <span>${name} (${date || 'N/A'})</span>
            <button class="done-btn" onclick="markDone('${name}', this)">DONE ✅</button>
            <button onclick="removeTestnet('${name}')">❌</button>
        </div>
    `;
}

// Mark as Done (Changes Button & Color)
function markDone(name, button) {
    let element = document.getElementById(`testnet-${name}`);
    element.classList.add("done");
    button.classList.add("completed");
    button.innerText = "✔ COMPLETED";
}

// Remove Testnet (Move to Recovery)
function removeTestnet(name) {
    document.getElementById(`testnet-${name}`).remove();
    let removedTestnets = JSON.parse(localStorage.getItem("removedTestnets")) || [];
    removedTestnets.push(name);
    localStorage.setItem("removedTestnets", JSON.stringify(removedTestnets));
    loadRecoveryTab();
}

// Recovery Tab
function loadRecoveryTab() {
    let removedTestnets = JSON.parse(localStorage.getItem("removedTestnets")) || [];
    let container = document.getElementById("recoveryList");
    container.innerHTML = "";
    removedTestnets.forEach(name => {
        container.innerHTML += `<div class="testnet">
            <span>${name}</span>
            <button onclick="restoreTestnet('${name}')">🔄 Restore</button>
        </div>`;
    });
}

// Restore Testnet
function restoreTestnet(name) {
    let removedTestnets = JSON.parse(localStorage.getItem("removedTestnets")) || [];
    removedTestnets = removedTestnets.filter(item => item !== name);
    localStorage.setItem("removedTestnets", JSON.stringify(removedTestnets));

    nativeTestnets.push(name);
    loadNativeTestnets();
    loadRecoveryTab();
}
