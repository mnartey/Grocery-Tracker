let entries = JSON.parse(localStorage.getItem('groceryEntries')) || [
    { item: "Organic Chicken Breast", price: 12.99, category: "Proteins", date: "2026-06-02" },
    { item: "Baby Spinach & Lettuce Mix", price: 4.49, category: "Produce", date: "2026-06-02" },
    { item: "Greek Yogurt (Plain)", price: 5.99, category: "Dairy", date: "2026-06-02" },
    { item: "Eggs (Dozen, Cage-Free)", price: 4.29, category: "Dairy", date: "2026-06-02" },
    { item: "Salmon Fillet", price: 14.99, category: "Proteins", date: "2026-06-02" },
    { item: "Avocados (4)", price: 3.99, category: "Produce", date: "2026-06-02" },
    { item: "Almond Butter", price: 6.49, category: "Pantry", date: "2026-06-02" },
    { item: "Oat Milk", price: 3.79, category: "Beverages", date: "2026-06-02" },
    { item: "Blueberries", price: 4.49, category: "Produce", date: "2026-06-02" },
    { item: "Walnuts", price: 5.99, category: "Pantry", date: "2026-06-02" },
    { item: "Paper Towels", price: 5.49, category: "Household", date: "2026-06-01" },
    { item: "Dish Soap", price: 2.99, category: "Household", date: "2026-06-01" }
];

function renderEntries() {
    const list = document.getElementById('entry-list');
    list.innerHTML = '';
    let total = 0;

    entries.forEach(entry => {
        total += entry.price;
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${entry.item}</strong><br>
                <small>${entry.date} • ${entry.category}</small>
            </div>
            <strong>$${entry.price.toFixed(2)}</strong>
        `;
        list.appendChild(li);
    });

    document.getElementById('summary').textContent = `Total This Month: $${total.toFixed(2)} | Budget: $400`;
    drawPieChart();
}

function addEntry() {
    const item = document.getElementById('item').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;

    if (item && price > 0) {
        entries.unshift({ item, price, category, date: new Date().toISOString().slice(0,10) });
        localStorage.setItem('groceryEntries', JSON.stringify(entries));
        renderEntries();
        document.getElementById('item').value = '';
        document.getElementById('price').value = '';
    }
}

let pieChart;
function drawPieChart() {
    const ctx = document.getElementById('pieChart');
    const categoryTotals = {};

    entries.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.price;
    });

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#4a7043', '#6b8e5f', '#a8c4a0', '#d4e4cc', '#f4a261', '#e76f51', '#2a9d8f', '#f1c453']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { padding: 20, font: { size: 14 } } } }
        }
    });
}

function clearData() {
    if (confirm('Clear all data?')) {
        entries = [];
        localStorage.clear();
        renderEntries();
    }
}

renderEntries();
