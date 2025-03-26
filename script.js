document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    updateCompletedCount();

    document.querySelectorAll("nav button").forEach(button => {
        button.addEventListener("click", function () {
            switchTab(this.getAttribute("data-tab"));
        });
    });

    generateUserDescription();
});

// Open Add Page
function openAddPage() {
    window.location.href = "add.html";
}

// Save Investment or Earning
function saveEntry() {
    const type = document.getElementById("type").value;
    const project = document.getElementById("project").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!amount) return;

    let totalId = type === "Earning" ? "total-earnings" : "total-investments";
    let total = parseFloat(localStorage.getItem(totalId) || 0);
    total += amount;
    localStorage.setItem(totalId, total);
    
    window.location.href = "index.html";
}

// Generate user description
function generateUserDescription() {
    document.getElementById("user-description").textContent = `You have ${projects.length} projects in progress.`;
}
