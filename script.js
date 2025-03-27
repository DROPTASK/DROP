document.addEventListener("DOMContentLoaded", function () {
    loadTestnets();
});

function loadTestnets() {
    let categories = ["dailyCheckin", "testnet", "simpleTask", "checkConnection", "others"];
    categories.forEach(category => {
        let testnets = JSON.parse(localStorage.getItem(category)) || [];
        let container = document.getElementById(category);
        container.innerHTML = "";
        testnets.forEach(name => {
            container.innerHTML += createTestnetElement(name, category);
        });
    });
}

function createTestnetElement(name, category) {
    return `
        <div class="testnet" id="testnet-${name}">
            <span>${name}</span>
            <div>
                <button onclick="markDone('${name}')">DONE ✅</button>
                <button onclick="removeTestnet('${name}', '${category}')">🗑 Delete</button>
            </div>
        </div>
    `;
}

function markDone(name) {
    document.getElementById(`testnet-${name}`).classList.add("done");
}

function removeTestnet(name, category) {
    let testnets = JSON.parse(localStorage.getItem(category)) || [];
    testnets = testnets.filter(testnet => testnet !== name);
    localStorage.setItem(category, JSON.stringify(testnets));
    loadTestnets();
}

function openTestnetForm() {
    document.getElementById("testnetForm").style.display = "block";
}

function closeTestnetForm() {
    document.getElementById("testnetForm").style.display = "none";
}

function addTestnet() {
    let name = document.getElementById("testnetName").value.trim();
    let category = document.getElementById("testnetCategory").value;

    if (name === "") {
        alert("Please enter a testnet name.");
        return;
    }

    let testnets = JSON.parse(localStorage.getItem(category)) || [];
    testnets.push(name);
    localStorage.setItem(category, JSON.stringify(testnets));

    loadTestnets();
    closeTestnetForm();
}
