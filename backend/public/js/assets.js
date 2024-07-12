document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/assets')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('assetTableBody');
            data.forEach(asset => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${asset.name}</td>
                    <td>${asset.model}</td>
                    <td>${new Date(asset.purchaseDate).toLocaleDateString()}</td>
                    <td>${new Date(asset.expiryDate).toLocaleDateString()}</td>
                    <td>${asset.purchaseAmount}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching assets:', error));
});
