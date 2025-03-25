document.addEventListener("DOMContentLoaded", loadTestnets);

function openModal() {
    document.getElementById("testnetModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("testnetModal").style.display = "none";
}

function saveTarget() {
    let target = document.getElementById("targetEarnings").value;
    localStorage.setItem("targetEarnings", target);
    alert("Target Updated!");
}

function addTestnet() {
    let name = document.getElementById("testnetName").value;
    let date = document.getElementById("testnetDate").value;
    let expectation = document.getElementById("testnetExpectation").value;

    if (!name || !date || !expectation) {
        alert("Please fill all fields");
        return;
    }

    let testnets = JSON.parse(localStorage.getItem("testnets")) || [];
    testnets.push({ name, date, expectation, toDoList: [] });
    localStorage.setItem("testnets", JSON.stringify(testnets));

    closeModal();
    loadTestnets();
}

function loadTestnets() {
    let testnets = JSON.parse(localStorage.getItem("testnets")) || [];
    let container = document.getElementById("testnetList");
    container.innerHTML = "";

    testnets.forEach((testnet, index) => {
        let div = document.createElement("div");
        div.className = "testnet-item";
        div.innerHTML = `
            <h3>${testnet.name}</h3>
            <p><strong>Date Joined:</strong> ${testnet.date}</p>
            <p><strong>Expectation:</strong> ${testnet.expectation} USDT</p>
            <button onclick="openToDo(${index})">To-Do List</button>
        `;
        container.appendChild(div);
    });
}

function openToDo(index) {
    let testnets = JSON.parse(localStorage.getItem("testnets")) || [];
    let testnet = testnets[index];

    let task = prompt("Add a To-Do for " + testnet.name);
    if (task) {
        testnet.toDoList.push(task);
        localStorage.setItem("testnets", JSON.stringify(testnets));
        alert("To-Do Added!");
    }
}
