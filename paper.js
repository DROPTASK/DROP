const exploreTab = document.getElementById('exploreTab');
const portfolioTab = document.getElementById('portfolioTab');
const explore = document.getElementById('explore');
const portfolio = document.getElementById('portfolio');
const coinGrid = document.getElementById('coinGrid');
const portfolioList = document.getElementById('portfolioList');
const balanceEl = document.getElementById('balance');
const depositBtn = document.getElementById('depositBtn');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

let balance = 0;
let portfolio = {};
let coins = [];

exploreTab.addEventListener('click', () => {
  exploreTab.classList.add('active');
  portfolioTab.classList.remove('active');
  explore.classList.remove('hidden');
  portfolio.classList.add('hidden');
});

portfolioTab.addEventListener('click', () => {
  portfolioTab.classList.add('active');
  exploreTab.classList.remove('active');
  explore.classList.add('hidden');
  portfolio.classList.remove('hidden');
  renderPortfolio();
});

depositBtn.addEventListener('click', () => {
  modalContent.innerHTML = `
    <h3>Enter Secret to Deposit</h3>
    <input type="text" id="secret" placeholder="Secret code" />
    <input type="number" id="amount" placeholder="Amount in Tether" />
    <button onclick="addTether()">Add</button>
  `;
  modal.classList.remove('hidden');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

function addTether() {
  const secret = document.getElementById('secret').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (secret === 'telewallet' && amount > 0) {
    balance += amount;
    updateBalance();
    modal.classList.add('hidden');
  } else {
    alert('Wrong secret or amount');
  }
}

function updateBalance() {
  balanceEl.textContent = `₹${balance.toFixed(2)}`;
}

function renderPortfolio() {
  portfolioList.innerHTML = '';
  Object.keys(portfolio).forEach(id => {
    const coin = coins.find(c => c.id === id);
    const holding = portfolio[id];
    const value = holding.amount * coin.current_price;

    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.innerHTML = `
      <div class="portfolio-info">
        <img src="${coin.image}" />
        <div class="portfolio-text">
          <span class="name">${coin.name}</span>
          <span class="amount">${holding.amount.toFixed(4)} ${coin.symbol.toUpperCase()}</span>
          <span class="value">₹${value.toFixed(2)}</span>
        </div>
      </div>
    `;
    portfolioList.appendChild(card);
  });
}

function loadCoins() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usdt&order=market_cap_desc&per_page=30&page=1&sparkline=false')
    .then(res => res.json())
    .then(data => {
      coins = data;
      coinGrid.innerHTML = '';
      data.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'coin-card';
        card.innerHTML = `
          <img src="${coin.image}" />
          <div class="coin-name">${coin.name}</div>
          <div class="coin-price">₹${coin.current_price}</div>
          <div class="coin-change ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
            ${coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        `;
        card.addEventListener('click', () => {
          openBuyModal(coin);
        });
        coinGrid.appendChild(card);
      });
    });
}

function openBuyModal(coin) {
  modalContent.innerHTML = `
    <h3>Buy ${coin.name}</h3>
    <p>Price: ₹${coin.current_price}</p>
    <input type="number" id="buyAmount" placeholder="Amount in ₹" />
    <button onclick="buyCoin('${coin.id}')">Buy</button>
  `;
  modal.classList.remove('hidden');
}

function buyCoin(id) {
  const amountInTether = parseFloat(document.getElementById('buyAmount').value);
  const coin = coins.find(c => c.id === id);
  if (amountInTether > 0 && amountInTether <= balance) {
    const coinAmount = amountInTether / coin.current_price;
    balance -= amountInTether;
    if (!portfolio[id]) {
      portfolio[id] = { amount: 0 };
    }
    portfolio[id].amount += coinAmount;
    updateBalance();
    modal.classList.add('hidden');
  } else {
    alert('Not enough Tether');
  }
}

loadCoins();
updateBalance();
