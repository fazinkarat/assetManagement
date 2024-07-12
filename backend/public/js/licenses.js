document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/licenses')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('licenseTableBody');
            data.forEach(license => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${license.name}</td>
                    <td>${license.id}</td>
                    <td>${new Date(license.purchaseDate).toLocaleDateString()}</td>
                    <td>${new Date(license.expiryDate).toLocaleDateString()}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching licenses:', error));
});
