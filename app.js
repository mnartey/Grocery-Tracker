let entries = JSON.parse(localStorage.getItem('groceryEntries')) || [];

function renderEntries() {
    const list = document.getElementById('entry-list');
    list.innerHTML = '';
    let total = 0;
    entries.forEach((entry, index) => {
        total += parseFloat(entry.price);
        const li = document.createElement('li');
        li.innerHTML = `${entry.item} - $${entry.price} <span>${entry.category}</span>`;
        list.appendChild(li);
    });
    document.getElementById('summary').textContent = `Monthly Total: $${total.toFixed(2)} | Budget: $400`;
}

function addEntry() {
    const item = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;
    if (item && price) {
        entries.push({ item, price, category, date: new Date().toLocaleDateString() });
        localStorage.setItem('groceryEntries', JSON.stringify(entries));
        renderEntries();
        document.getElementById('item').value = '';
        document.getElementById('price').value = '';
    }
}

function clearData() {
    if (confirm('Clear all data?')) {
        entries = [];
        localStorage.clear();
        renderEntries();
    }
}

// Simple chart (add more later if wanted)
function drawBasicChart() {
    // For now, placeholder — we can enhance with Chart.js later
    console.log('Stats ready');
}

renderEntries();
drawBasicChart();
