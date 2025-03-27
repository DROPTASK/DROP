document.addEventListener("DOMContentLoaded", function () {
    loadData();
    updateChart();
});

// **Local Storage Keys**
const EARNINGS_KEY = "earningsData";
const INVESTMENTS_KEY = "investmentsData";

// **Add Earnings**
function addEarning() {
    let project = document.getElementById("earningProject").value.trim();
    let amount = parseFloat(document.getElementById("earningAmount").value);
    let date = document.getElementById("earningDate").value;

    if (project === "" || isNaN(amount) || date === "") return;

    let earnings = JSON.parse(localStorage.getItem(EARNINGS_KEY)) || [];
    earnings.push({ project, amount, date });

    localStorage.setItem(EARNINGS_KEY, JSON.stringify(earnings));
    loadData();
    updateChart();
}

// **Add Investment**
function addInvestment() {
    let project = document.getElementById("investmentProject").value.trim();
    let amount = parseFloat(document.getElementById("investmentAmount").value);
    let date = document.getElementById("investmentDate").value;

    if (project === "" || isNaN(amount) || date === "") return;

    let investments = JSON.parse(localStorage.getItem(INVESTMENTS_KEY)) || [];
    investments.push({ project, amount, date });

    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
    loadData();
    updateChart();
}

// **Load Data & Update UI**
function loadData() {
    let earnings = JSON.parse(localStorage.getItem(EARNINGS_KEY)) || [];
    let investments = JSON.parse(localStorage.getItem(INVESTMENTS_KEY)) || [];

    let totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
    let totalInvestments = investments.reduce((sum, i) => sum + i.amount, 0);

    document.getElementById("totalEarnings").innerText = totalEarnings;
    document.getElementById("totalInvestments").innerText = totalInvestments;

    updateList("earningsList", earnings);
    updateList("investmentList", investments);
    updateRemoveOptions(earnings, investments);
}

// **Update Earnings/Investment List**
function updateList(elementId, data) {
    let list = document.getElementById(elementId);
    list.innerHTML = "";
    data.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.project}: ₹${item.amount} (${item.date})`;
        list.appendChild(li);
    });
}

// **Update Remove Dropdown**
function updateRemoveOptions(earnings, investments) {
    let removeSelect = document.getElementById("removeEntrySelect");
    removeSelect.innerHTML = "";

    [...earnings, ...investments].forEach((entry, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${entry.project} - ₹${entry.amount}`;
        removeSelect.appendChild(option);
    });
}

// **Remove Entry**
function removeEntry() {
    let index = document.getElementById("removeEntrySelect").value;
    if (index === "") return;

    let earnings = JSON.parse(localStorage.getItem(EARNINGS_KEY)) || [];
    let investments = JSON.parse(localStorage.getItem(INVESTMENTS_KEY)) || [];

    if (index < earnings.length) {
        earnings.splice(index, 1);
        localStorage.setItem(EARNINGS_KEY, JSON.stringify(earnings));
    } else {
        investments.splice(index - earnings.length, 1);
        localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
    }

    loadData();
    updateChart();
}

// **Chart.js for Graph**
function updateChart() {
    let earnings = JSON.parse(localStorage.getItem(EARNINGS_KEY)) || [];
    let investments = JSON.parse(localStorage.getItem(INVESTMENTS_KEY)) || [];

    let labels = [...earnings.map(e => e.project), ...investments.map(i => i.project)];
    let earningsData = earnings.map(e => e.amount);
    let investmentsData = investments.map(i => i.amount);

    let ctx = document.getElementById("earningsChart").getContext("2d");
    if (window.myChart) window.myChart.destroy(); // Prevent multiple charts

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Earnings",
                    data: earningsData,
                    backgroundColor: "green",
                },
                {
                    label: "Investments",
                    data: investmentsData,
                    backgroundColor: "red",
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}
