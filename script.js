document.addEventListener("DOMContentLoaded", function () {
    loadTestnets();
    loadEarnings();
    loadRecovery();
});

function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Load testnets
function loadTestnets() {
    let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    let customContainer = document.getElementById("customTestnets");
    customContainer.innerHTML = "";
    customTestnets.forEach((testnet) => {
        customContainer.innerHTML += createTestnetElement(testnet);
    });
}

function createTestnetElement(name) {
    return `
        <div class="testnet" id="testnet-${name}">
            <span>${name}</span>
            <button onclick="markDone('${name}')">✅</button>
            <button onclick="removeTestnet('${name}')">❌</button>
        </div>
    `;
}

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
    
    closeTestnetForm();
    loadTestnets();
}

function markDone(name) {
    document.getElementById(`testnet-${name}`).classList.add("done");
}

function removeTestnet(name) {
    let recovery = JSON.parse(localStorage.getItem("recovery")) || [];
    recovery.push(name);
    localStorage.setItem("recovery", JSON.stringify(recovery));

    loadRecovery();
    loadTestnets();
}

// Load Earnings
function loadEarnings() {
    document.getElementById("totalInvestment").innerText = "₹" + (localStorage.getItem("investment") || 0);
    document.getElementById("totalEarnings").innerText = "₹" + (localStorage.getItem("earnings") || 0);
}
