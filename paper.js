let coins = [];
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || {};
let balance = parseFloat(localStorage.getItem('balance')) || 1000;

function switchTab(tab) {
  document.getElementById('wallet-tab').style.display = tab === 'wallet' ? 'block' : 'none';
  document.getElementById('explore-tab').style.display = tab === 'explore' ? 'block' : 'none';
  render();
}

function render() {
  document.getElementById('wallet-balance').innerText = `Wallet Balance: $${balance.toFixed(2)}`;
  const walletTab = document.getElementById('wallet-tab');
  walletTab.innerHTML = '';
  for (let id in portfolio) {
    const coin = portfolio[id];
    walletTab.innerHTML += `
      <div class="coin">
        <img src="${coin.image}" />
        <div>
          <div>${coin.name}</div>
          <div>${coin.amount} @ $${coin.price}</div>
        </div>
        <div>$${(coin.amount * coin.price).toFixed(2)}</div>
      </div>`;
  }

  const exploreTab = document.getElementById('explore-tab');
  exploreTab.innerHTML = '';
  coins.slice(0, 30).forEach(coin => {
    exploreTab.innerHTML += `
      <div class="coin" onclick="openModal('${coin.id}')">
        <img src="${coin.image}" />
        <div>${coin.name}</div>
        <div>$${coin.current_price}</div>
      </div>`;
  });
}

function openModal(id) {
  const coin = coins.find(c => c.id === id);
  const modal = document.getElementById('coin-modal');
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <h2>${coin.name} ($${coin.current_price})</h2>
    <canvas id="chart"></canvas>
    <button class="buy" onclick="buyCoin('${coin.id}')">Buy</button>
    <button class="sell" onclick="sellCoin('${coin.id}')">Sell</button>
  `;
  modal.classList.remove('hidden');

  new Chart(document.getElementById('chart').getContext('2d'), {
    type: 'line',
    data: {
      labels: [...Array(10).keys()],
      datasets: [{
        label: coin.name,
        data: Array.from({ length: 10 }, () => coin.current_price * (0.95 + Math.random() * 0.1)),
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function closeModal() {
  document.getElementById('coin-modal').classList.add('hidden');
}

function buyCoin(id) {
  const coin = coins.find(c => c.id === id);
  if (balance >= coin.current_price) {
    balance -= coin.current_price;
    if (!portfolio[id]) portfolio[id] = { ...coin, amount: 0 };
    portfolio[id].amount += 1;
    portfolio[id].price = coin.current_price;
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    localStorage.setItem('balance', balance);
    closeModal();
    render();
  } else {
    alert('Insufficient balance');
  }
}

function sellCoin(id) {
  if (portfolio[id] && portfolio[id].amount >= 1) {
    balance += coins.find(c => c.id === id).current_price;
    portfolio[id].amount -= 1;
    if (portfolio[id].amount === 0) delete portfolio[id];
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    localStorage.setItem('balance', balance);
    closeModal();
    render();
  } else {
    alert('You do not own this coin');
  }
}

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
  .then(res => res.json())
  .then(data => {
    coins = data;
    switchTab('wallet');
  });
