document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/stocks')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('stockTableBody');
            data.forEach(stock => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${stock.name}</td>
                    <td>${new Date(stock.purchaseDate).toLocaleDateString()}</td>
                    <td>${stock.purchaseAmount}</td>
                    <td>${stock.quantity}</td>
                    <td>${stock.totalAmount}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching stocks:', error));
});
