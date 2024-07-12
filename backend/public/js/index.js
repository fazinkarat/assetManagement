document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    try {
        const [assetsResponse, licensesResponse, stocksResponse] = await Promise.all([
            fetch('/api/assets/total'),
            fetch('/api/licenses/total'),
            fetch('/api/stocks/total')
        ]);

        const [assetsTotal, licensesTotal, stocksTotal] = await Promise.all([
            assetsResponse.json(),
            licensesResponse.json(),
            stocksResponse.json()
        ]);

        const data = {
            labels: ['Assets', 'Licenses', 'Stocks'],
            datasets: [{
                data: [assetsTotal, licensesTotal, stocksTotal],
                backgroundColor: ['#30bced', '#ff4c6d', '#ffb142']
            }]
        };

        const config = {
            type: 'pie',
            data: data,
        };

        new Chart(ctx, config);

    } catch (error) {
        console.error('Error fetching total amounts:', error);
    }
});
