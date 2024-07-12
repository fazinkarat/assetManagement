document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('itemName').value;
    const modelNumber = document.getElementById('modelNumber').value;
    const date = document.getElementById('date').value;

    const newItem = {
        type: itemType,
        name: itemName,
        model: modelNumber,
        date: date
    };

    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
        alert('Item added successfully!');
        window.location.href = 'index.html'; // Redirect to dashboard or desired page
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/api/items');
    const items = await response.json();

    const assetsTotal = items.filter(item => item.type === 'asset').reduce((acc, item) => acc + item.quantity, 0);
    const licensesTotal = items.filter(item => item.type === 'license').reduce((acc, item) => acc + item.quantity, 0);
    const stocksTotal = items.filter(item => item.type === 'stock').reduce((acc, item) => acc + item.quantity, 0);

    const ctx = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Assets', 'Licenses', 'Stocks'],
            datasets: [{
                label: 'Total Quantity',
                data: [assetsTotal, licensesTotal, stocksTotal],
                backgroundColor: ['#30bced', '#ff4c6d', '#ffb142']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
