// Switch Tab Function
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Modal Controls
const modal = document.getElementById("entryModal");
document.getElementById("addEntryBtn").addEventListener("click", () => modal.style.display = "flex");
document.getElementById("closeModal").addEventListener("click", () => modal.style.display = "none");

// Save Entry
document.getElementById("saveEntry").addEventListener("click", function () {
    const type = document.getElementById("entryType").value;
    const testnet = document.getElementById("testnetName").value;
    const desc = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value) || 0;

    if (type === "earning") {
        let total = parseFloat(localStorage.getItem("totalEarnings") || 0) + amount;
        localStorage.setItem("totalEarnings", total);
        document.getElementById("total-earnings").innerText = `$${total}`;
    } else {
        let total = parseFloat(localStorage.getItem("totalInvestment") || 0) + amount;
        localStorage.setItem("totalInvestment", total);
        document.getElementById("total-investment").innerText = `$${total}`;
    }

    modal.style.display = "none";
});

// Load Earnings
document.getElementById("total-earnings").innerText = `$${localStorage.getItem("totalEarnings") || 0}`;
document.getElementById("total-investment").innerText = `$${localStorage.getItem("totalInvestment") || 0}`;
