document.addEventListener("DOMContentLoaded", function () {
    loadTestnets();
    loadEarnings();
    loadRecovery();
});

function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Load testnets from LocalStorage
function loadTestnets() {
    let nativeTestnets = ["Bless", "Dawn", "Grass"];
    let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];

    let nativeContainer = document.getElementById("nativeTestnets");
    nativeContainer.innerHTML = "";
    nativeTestnets.forEach((testnet) => nativeContainer.innerHTML += createTestnetElement(testnet));

    let customContainer = document.getElementById("customTestnets");
    customContainer.innerHTML = "";
    customTestnets.forEach((testnet) => customContainer.innerHTML += createTestnetElement(testnet, true));
}

function createTestnetElement(name, isCustom = false) {
    return `
        <div class="testnet">
            <span>${name}</span>
            <button onclick="markDone('${name}')">✅</button>
            <button onclick="openTestnet('${name}')">🔗</button>
            <button onclick="removeTestnet('${name}', ${isCustom})">❌</button>
        </div>
    `;
}

function addCustomTestnet() {
    let name = prompt("Enter Custom Testnet Name:");
    if (name) {
        let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
        customTestnets.push(name);
        localStorage.setItem("customTestnets", JSON.stringify(customTestnets));
        loadTestnets();
    }
}

function markDone(name) {
    alert(name + " marked as done!");
}

function openTestnet(name) {
    window.open("https://testnet.example.com/" + name, "_blank");
}

function removeTestnet(name, isCustom) {
    let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    if (isCustom) {
        customTestnets = customTestnets.filter(testnet => testnet !== name);
        localStorage.setItem("customTestnets", JSON.stringify(customTestnets));
    }
    let recovery = JSON.parse(localStorage.getItem("recovery")) || [];
    recovery.push(name);
    localStorage.setItem("recovery", JSON.stringify(recovery));
    loadTestnets();
    loadRecovery();
}

// Load earnings
function loadEarnings() {
    document.getElementById("totalInvestment").innerText = "₹" + (localStorage.getItem("investment") || 0);
    document.getElementById("totalEarnings").innerText = "₹" + (localStorage.getItem("earnings") || 0);
}

// Add earnings
function addEarning() {
    let amount = prompt("Enter amount:");
    if (amount) {
        let earnings = parseInt(localStorage.getItem("earnings") || 0) + parseInt(amount);
        localStorage.setItem("earnings", earnings);
        loadEarnings();
    }
}

// Load recovery list
function loadRecovery() {
    let recovery = JSON.parse(localStorage.getItem("recovery")) || [];
    let recoveryContainer = document.getElementById("recoveryList");
    recoveryContainer.innerHTML = "";
    recovery.forEach(testnet => {
        recoveryContainer.innerHTML += `
            <div>
                <span>${testnet}</span>
                <button onclick="restoreTestnet('${testnet}')">♻️ Restore</button>
            </div>
        `;
    });
}

function restoreTestnet(name) {
    let recovery = JSON.parse(localStorage.getItem("recovery")) || [];
    recovery = recovery.filter(testnet => testnet !== name);
    localStorage.setItem("recovery", JSON.stringify(recovery));

    let customTestnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    customTestnets.push(name);
    localStorage.setItem("customTestnets", JSON.stringify(customTestnets));

    loadTestnets();
    loadRecovery();
}
