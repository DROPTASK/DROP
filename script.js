@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Lobster&family=Orbitron:wght@600&display=swap');

body {
    font-family: 'Playfair Display', serif;
    background: linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B);
    color: #fff;
    text-align: center;
    margin: 0;
    padding: 0;
}

header {
    background: #000;
    color: #fff;
    padding: 15px;
    font-size: 20px;
    font-weight: bold;
}

nav {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background: #111;
    position: fixed;
    bottom: 0;
    width: 100%;
}

.tab-btn {
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px;
}

.tab-content {
    display: none;
    padding: 20px;
}

.project-box {
    background: #222;
    padding: 15px;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.project-box.done {
    background: lightgreen;
}

.summary-container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
}

.summary-box {
    background: #333;
    padding: 20px;
    border-radius: 10px;
    width: 45%;
    text-align: center;
    font-size: 20px;
}

.summary-box h3 {
    font-size: 80px;
}

.add-btn {
    background: purple;
    color: white;
    padding: 15px;
    border-radius: 50%;
    position: fixed;
    bottom: 70px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
}

.popup {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
}

button {
    margin-left: 5px;
}
