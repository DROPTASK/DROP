document.addEventListener("DOMContentLoaded", loadLogs);

function goBack() {
    window.location.href = "index.html";
}

function openForm() {
    document.getElementById("logForm").style.display = "block";
}

function closeForm() {
    document.getElementById("logForm").style.display = "none";
}

function openDeleteForm() {
    document.getElementById("deleteForm").style.display = "block";
    loadDeleteOptions();
}

function closeDeleteForm() {
    document.getElementById("deleteForm").style.display = "none";
}

// Save Log
function saveLog() {
    let type = document.getElementById("logType").value;
    let name = document.getElementById("logName").value;
    let date = document.getElementById("logDate").value.split("-").slice(1).join("/");
    let amount = parseFloat(document.getElementById("logAmount").value);
    let desc = document.getElementById("logDesc").value;

    if (!name || !date || isNaN(amount)) {
        alert("Fill all fields correctly.");
        return;
    }

    let logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push({ type, name, date, amount, desc });
    localStorage.setItem("logs", JSON.stringify(logs));

    closeForm();
    loadLogs();
}

// Load Logs
function loadLogs() {
    let logs = JSON.parse(localStorage.getItem("logs")) || [];
    let logList = document.getElementById("logList");
    let totalInvestment = 0;
    let totalEarnings = 0;

    logList.innerHTML = "";

    logs.forEach((log, index) => {
        let logItem = document.createElement("div");
        logItem.classList.add("log-item");
        logItem.innerHTML = `<div class="log-header">
            <span class="log-type">${log.type === "investment" ? "[Invest..]" : "[Earn..]"}</span>
            <span class="log-name">${log.name}</span>
            <span class="log-date">${log.date}</span>
            <span class="log-amount ${log.type === "investment" ? "red" : "green"}">$${log.amount}</span>
        </div>
        <div class="log-desc">${log.desc}</div>`;

        logItem.onclick = () => {
            let desc = logItem.querySelector(".log-desc");
            desc.style.display = desc.style.display === "block" ? "none" : "block";
        };

        logList.appendChild(logItem);

        if (log.type === "investment") totalInvestment += log.amount;
        else totalEarnings += log.amount;
    });

    document.getElementById("totalInvestment").textContent = totalInvestment;
    document.getElementById("totalEarnings").textContent = totalEarnings;
}

// Load Delete Options
function loadDeleteOptions() {
    let logs = JSON.parse(localStorage.getItem("logs")) || [];
    let deleteSelect = document.getElementById("deleteSelect");
    
    deleteSelect.innerHTML = ""; // Clear previous options

    logs.forEach((log, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${log.name} - $${log.amount}`;
        deleteSelect.appendChild(option);
    });
}

// Delete Log
function deleteLog() {
    let logs = JSON.parse(localStorage.getItem("logs")) || [];
    let deleteSelect = document.getElementById("deleteSelect");

    if (logs.length === 0) {
        alert("No logs to delete!");
        return;
    }

    let selectedIndex = deleteSelect.value;

    if (selectedIndex !== "") {
        logs.splice(selectedIndex, 1); // Remove selected log
        localStorage.setItem("logs", JSON.stringify(logs)); // Save updated list
        closeDeleteForm();
        loadLogs(); // Refresh UI
    } else {
        alert("Select an item to delete.");
    }
}
