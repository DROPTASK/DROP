document.addEventListener("DOMContentLoaded", function () {
    loadTestnets();
});

// Toggle dropdown
function toggleDropdown(category) {
    let content = document.getElementById(category);
    content.style.display = content.style.display === "block" ? "none" : "block";
}

// Open testnet form
function openTestnetForm(category) {
    document.getElementById("testnetCategory").value = category;
    document.getElementById("testnetForm").style.display = "block";
}

// Close testnet form
function closeTestnetForm() {
    document.getElementById("testnetForm").style.display = "none";
}

// Add testnet
function addTestnet() {
    let name = document.getElementById("testnetName").value;
    let category = document.getElementById("testnetCategory").value;
    if (name.trim() === "") return alert("Enter a valid name");

    let testnets = JSON.parse(localStorage.getItem("testnets")) || {};
    if (!testnets[category]) testnets[category] = [];
    testnets[category].push({ name, done: false });

    localStorage.setItem("testnets", JSON.stringify(testnets));
    loadTestnets();
    closeTestnetForm();
}

// Load testnets
function loadTestnets() {
    let testnets = JSON.parse(localStorage.getItem("testnets")) || {};
    ["dailyCheckin", "testnet", "simpleTask", "checkConnection", "others"].forEach(category => {
        let container = document.getElementById(category);
        container.innerHTML = "";
        if (testnets[category]) {
            testnets[category].forEach((testnet, index) => {
                let div = document.createElement("div");
                div.className = "testnet-item" + (testnet.done ? " done" : "");
                div.innerHTML = `
                    <span>${testnet.name}</span>
                    <button onclick="markDone('${category}', ${index})">✅ DONE</button>
                    <button onclick="deleteTestnet('${category}', ${index})">❌ DELETE</button>
                `;
                container.appendChild(div);
            });
        }
    });
}

// Mark testnet as done
function markDone(category, index) {
    let testnets = JSON.parse(localStorage.getItem("testnets"));
    testnets[category][index].done = true;
    localStorage.setItem("testnets", JSON.stringify(testnets));
    loadTestnets();
}

// Delete testnet
function deleteTestnet(category, index) {
    let testnets = JSON.parse(localStorage.getItem("testnets"));
    testnets[category].splice(index, 1);
    localStorage.setItem("testnets", JSON.stringify(testnets));
    loadTestnets();
}
