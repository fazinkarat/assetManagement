document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/assets/total');
    const assetsTotal = await response.json();

    const response2 = await fetch('/api/licenses/total');
    const licensesTotal = await response2.json();

    const response3 = await fetch('/api/stocks/total');
    const stocksTotal = await response3.json();

    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Assets', 'Licenses', 'Stocks'],
            datasets: [{
                label: 'Total Quantity',
                data: [assetsTotal, licensesTotal, stocksTotal],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
