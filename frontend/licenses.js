document.addEventListener('DOMContentLoaded', function() {
    const licensesList = document.getElementById('licensesList');

    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(items => {
        if (items.length === 0) {
            licensesList.innerHTML = '<tr><td colspan="4">No licenses available. Add new items <a href="item.html">here</a>.</td></tr>';
        } else {
            let serialNumber = 1;
            items.forEach(item => {
                if (item.type === 'licenses') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${serialNumber++}</td>
                        <td>${item.name}</td>
                        <td>${item.model}</td>
                        <td>${item.date}</td>
                    `;
                    licensesList.appendChild(row);
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
