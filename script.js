document.addEventListener("DOMContentLoaded", function () {
    loadNativeTestnets();
    loadCustomTestnets();
    updateAnalytics();
});

// Testnets
const nativeTestnets = [
        "Bless", "Dawn", "Grass", "Graident", "One Football",
        "Teneo", "Nexus", "Nodepay", "Blockmesh", "Flow3",
        "Mygate", "Treasury", "Layeredge", "Common", "Beamable",
        "Giza", "Exhabits", "Sogni", "Solflare NFT", "Deshare [Cess]",
        "Wonix", "Arch", "Dvin", "Blockscout", "Malda", "Somnia",
        "Social Incentive", "Billions", "Pod [Dreamers]"
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
            <div>
                <button onclick="markDone('${name}')">DONE ✅</button>
                <button onclick="removeTestnet('${name}')">❌</button>
            </div>
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
    let date = document.getElementById("testnetDate").value || new Date().toISOString().split('T')[0];
    
    if (!name) return alert("Enter a name!");

    let testnets = JSON.parse(localStorage.getItem("customTestnets")) || [];
    testnets.push({ name, date });
    localStorage.setItem("customTestnets", JSON.stringify(testnets));

    loadCustomTestnets();
    closeTestnetForm();
}

function updateAnalytics() {
    let completed = document.querySelectorAll(".done").length;
    let total = nativeTestnets.length + (JSON.parse(localStorage.getItem("customTestnets")) || []).length;
    document.getElementById("analyticsData").innerText = `Completed: ${completed} / ${total}`;
}
