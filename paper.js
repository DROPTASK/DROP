const exploreTab = document.getElementById("exploreTab");
const portfolioTab = document.getElementById("portfolioTab");
const explore = document.getElementById("explore");
const portfolio = document.getElementById("portfolio");
const coinGrid = document.getElementById("coinGrid");
const portfolioList = document.getElementById("portfolioList");
const balanceEl = document.getElementById("balance");
const depositBtn = document.getElementById("depositBtn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

let usdtBalance = parseFloat(localStorage.getItem("usdt")) || 1000;
let portfolio = JSON.parse(localStorage.getItem("portfolio")) || {};

updateBalance();

exploreTab.addEventListener("click", () => {
  exploreTab.classList.add("active");
  portfolioTab.classList.remove("active");
  explore.classList.remove("hidden");
  portfolio.classList.add("hidden");
});

portfolioTab.addEventListener("click", () => {
  exploreTab.classList.remove("active");
  portfolioTab.classList.add("active");
  explore.classList.add("hidden");
  portfolio.classList.remove("hidden");
  renderPortfolio();
});

depositBtn.addEventListener("click", () => {
  showModal(`
    <h3>Deposit Tether (USDT)</h3>
    <input type="number" id="depositAmount" placeholder="Enter amount">
    <button onclick="addDeposit()">Add</button>
  `);
});

function updateBalance() {
  balanceEl.innerText = `Tether: ${usdtBalance.toFixed(2)} USDT`;
  localStorage.setItem("usdt", usdtBalance.toFixed(2));
  localStorage.setItem("portfolio", JSON.stringify(portfolio));
}

function showModal(content) {
  modalContent.innerHTML = content;
  modal.style.display = "flex";
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

function addDeposit() {
  const amt = parseFloat(document.getElementById("depositAmount").value);
  if (!isNaN(amt) && amt > 0) {
    usdtBalance += amt;
    updateBalance();
    modal.style.display = "none";
  }
}
async function fetchTopCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=24h"
    );
    const data = await res.json();
    displayCoins(data);
  } catch (e) {
    console.error("Error fetching coins:", e);
  }
}

function displayCoins(coins) {
  coinGrid.innerHTML = "";
  coins.forEach((coin) => {
    const card = document.createElement("div");
    card.className = "coin-card";
    card.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}">
      <div class="coin-name">${coin.name}</div>
      <div class="coin-price">$${coin.current_price.toFixed(2)}</div>
      <div class="coin-change ${coin.price_change_percentage_24h >= 0 ? "green" : "red"}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </div>
      <canvas id="spark-${coin.id}"></canvas>
    `;
    card.addEventListener("click", () => openCoinDetail(coin));
    coinGrid.appendChild(card);
    renderSparkline(`spark-${coin.id}`, coin.sparkline_in_7d.price);
  });
}

function renderSparkline(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width = 120;
  const height = canvas.height = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / data.length) * width;
    const y = height - ((val - min) / (max - min)) * height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#007bff";
  ctx.stroke();
}

fetchTopCoins();
function openCoinDetail(coin) {
  showModal(`
    <div class="coin-detail">
      <h2>${coin.name}</h2>
      <img src="${coin.image}" alt="${coin.name}" class="coin-detail-img">
      <p>Price: $${coin.current_price.toFixed(2)} USDT</p>
      <canvas id="detailChart" width="300" height="150"></canvas>
      <input type="number" id="tradeAmount" placeholder="Amount in USDT">
      <div class="btn-group">
        <button onclick='buyCoin("${coin.id}", "${coin.name}", ${coin.current_price}, "${coin.image}")'>Buy</button>
        <button onclick='sellCoin("${coin.id}", ${coin.current_price})'>Sell</button>
      </div>
    </div>
  `);
  renderPriceChart(coin.id);
}

async function renderPriceChart(coinId) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`
  );
  const data = await res.json();
  const prices = data.prices.map(p => p[1]);

  const canvas = document.getElementById("detailChart");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  prices.forEach((val, i) => {
    const x = (i / prices.length) * width;
    const y = height - ((val - min) / (max - min)) * height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#4caf50";
  ctx.stroke();
}
function buyCoin(id, name, price, image) {
  const amt = parseFloat(document.getElementById("tradeAmount").value);
  if (isNaN(amt) || amt <= 0) return alert("Enter valid USDT amount");

  if (amt > usdtBalance) return alert("Insufficient balance");

  const qty = amt / price;
  if (!portfolio[id]) {
    portfolio[id] = {
      id,
      name,
      image,
      quantity: 0,
      totalSpent: 0,
    };
  }
  portfolio[id].quantity += qty;
  portfolio[id].totalSpent += amt;
  usdtBalance -= amt;
  updateBalance();
  modal.style.display = "none";
}

function sellCoin(id, price) {
  const amt = parseFloat(document.getElementById("tradeAmount").value);
  if (isNaN(amt) || amt <= 0) return alert("Enter valid USDT amount");

  if (!portfolio[id]) return alert("You don’t own this coin");

  const qtyToSell = amt / price;
  if (portfolio[id].quantity < qtyToSell)
    return alert("Not enough coin to sell");

  portfolio[id].quantity -= qtyToSell;
  portfolio[id].totalSpent -= amt;

  if (portfolio[id].quantity <= 0) {
    delete portfolio[id];
  }

  usdtBalance += amt;
  updateBalance();
  modal.style.display = "none";
}

function renderPortfolio() {
  portfolioList.innerHTML = "";
  Object.values(portfolio).forEach((coin) => {
    const avgPrice = coin.totalSpent / coin.quantity;
    const item = document.createElement("div");
    item.className = "portfolio-card";
    item.innerHTML = `
      <img src="${coin.image}" class="portfolio-img">
      <div class="portfolio-info">
        <div class="portfolio-name">${coin.name}</div>
        <div class="portfolio-details">
          ${coin.quantity.toFixed(4)} coins<br>
          Avg Buy: $${avgPrice.toFixed(2)}
        </div>
      </div>
    `;
    portfolioList.appendChild(item);
  });
}
