const exploreTab = document.getElementById('exploreTab');
const portfolioTab = document.getElementById('portfolioTab');
const exploreSection = document.getElementById('explore');
const portfolioSection = document.getElementById('portfolio');
const balanceDisplay = document.getElementById('balance');
const coinGrid = document.getElementById('coinGrid');
const portfolioList = document.getElementById('portfolioList');
const depositBtn = document.getElementById('depositBtn');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

let tetherBalance = 0;
let portfolio = {};

exploreTab.addEventListener('click', () => {
  exploreTab.classList.add('active');
  portfolioTab.classList.remove('active');
  exploreSection.classList.remove('hidden');
  portfolioSection.classList.add('hidden');
});

portfolioTab.addEventListener('click', () => {
  portfolioTab.classList.add('active');
  exploreTab.classList.remove('active');
  portfolioSection.classList.remove('hidden');
  exploreSection.classList.add('hidden');
});

depositBtn.addEventListener('click', () => {
  modalContent.innerHTML = `
    <h3>Secret Key</h3>
    <input type="password" id="secretKey" placeholder="Enter secret">
    <h3>Enter amount</h3>
    <input type="number" id="amountInput" placeholder="Amount in Tether">
    <button onclick="addTether()">Add</button>
    <button onclick="closeModal()">Cancel</button>
  `;
  modal.style.display = 'flex';
});

function closeModal() {
  modal.style.display = 'none';
}

function addTether() {
  const secret = document.getElementById('secretKey').value;
  const amount = parseFloat(document.getElementById('amountInput').value);
  if (secret !== 'telewallet') {
    alert('Invalid secret');
    return;
  }
  if (!isNaN(amount) && amount > 0) {
    tetherBalance += amount;
    updateBalance();
    closeModal();
  }
}

function updateBalance() {
  balanceDisplay.textContent = `₹${tetherBalance.toFixed(2)}`;
}

function updatePortfolioUI() {
  portfolioList.innerHTML = '';
  for (const symbol in portfolio) {
    const coin = portfolio[symbol];
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.innerHTML = `
      <div class="portfolio-info">
        <img src="${coin.image}" />
        <div class="portfolio-text">
          <span class="name">${coin.name}</span>
          <span class="amount">${coin.amount.toFixed(4)} ${symbol}</span>
          <span class="value">₹${(coin.amount * coin.price).toFixed(2)}</span>
        </div>
      </div>
    `;
    portfolioList.appendChild(card);
  }
}

function showCoinDetails(coin) {
  const amount = parseFloat(prompt(`Enter amount of ${coin.symbol.toUpperCase()} to buy:`));
  if (!isNaN(amount) && amount > 0) {
    const cost = amount * coin.current_price;
    if (cost > tetherBalance) {
      alert("Insufficient Tether balance");
      return;
    }
    tetherBalance -= cost;
    updateBalance();
    if (!portfolio[coin.symbol]) {
      portfolio[coin.symbol] = {
        amount: 0,
        price: coin.current_price,
        name: coin.name,
        image: coin.image
      };
    }
    portfolio[coin.symbol].amount += amount;
    updatePortfolioUI();
  }
}

function fetchTrendingCoins() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(res => res.json())
    .then(data => {
      coinGrid.innerHTML = '';
      data.slice(0, 4).forEach(coin => {
        const div = document.createElement('div');
        div.className = 'coin-card';
        div.innerHTML = `
          <img src="${coin.image}" />
          <div class="coin-name">${coin.symbol.toUpperCase()}</div>
          <div class="coin-price">₹${coin.current_price}</div>
          <div class="coin-change ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
            ${coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        `;
        div.onclick = () => showCoinDetails(coin);
        coinGrid.appendChild(div);
      });
    });
}

fetchTrendingCoins();
updateBalance();
