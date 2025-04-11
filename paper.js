document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  fetchCoins();
  setInterval(fetchCoins, 60000); // refresh every 60 sec
  switchTab('explore');
}

let portfolio = JSON.parse(localStorage.getItem("portfolio")) || {};
let walletBalance = parseFloat(localStorage.getItem("wallet")) || 0;

async function fetchCoins() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=30&page=1");
    const coins = await res.json();
    renderExplore(coins);
    renderPortfolio(coins);
  } catch (err) {
    console.error("Error fetching coins:", err);
    document.getElementById("explore-list").innerHTML = `<p>Error loading coins. Try again later.</p>`;
  }
}

function renderExplore(coins) {
  const container = document.getElementById("explore-list");
  container.innerHTML = "";
  coins.forEach(coin => {
    const div = document.createElement("div");
    div.className = `coin ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`;
    div.innerHTML = `
      <div class="details">
        <strong>${coin.name}</strong>
        <span>₹${coin.current_price.toLocaleString()}</span>
      </div>
      <div class="change">
        ${coin.price_change_percentage_24h?.toFixed(2) ?? 0}%
      </div>
    `;
    container.appendChild(div);
  });
}

function renderPortfolio(coins) {
  const list = document.getElementById("portfolio-list");
  const balanceDisplay = document.getElementById("wallet-balance");
  list.innerHTML = "";
  let totalValue = walletBalance;

  for (let id in portfolio) {
    const holding = portfolio[id];
    const coin = coins.find(c => c.id === id);
    if (!coin || holding.amount <= 0) continue;
    const value = coin.current_price * holding.amount;
    totalValue += value;

    const div = document.createElement("div");
    div.className = "coin";
    div.innerHTML = `
      <div class="details">
        <strong>${coin.name}</strong>
        <span>${holding.amount} • ₹${value.toFixed(2)}</span>
      </div>
      <div class="change">${coin.price_change_percentage_24h.toFixed(2)}%</div>
    `;
    list.appendChild(div);
  }

  balanceDisplay.textContent = `Wallet Balance: ₹${totalValue.toFixed(2)}`;
}

function switchTab(tab) {
  document.getElementById("explore-tab").style.display = tab === "explore" ? "block" : "none";
  document.getElementById("portfolio-tab").style.display = tab === "portfolio" ? "block" : "none";

  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`nav button[onclick="switchTab('${tab}')"]`).classList.add("active");
}
