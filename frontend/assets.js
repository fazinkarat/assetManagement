document.addEventListener('DOMContentLoaded', function() {
    const assetsList = document.getElementById('assetsList');

    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(items => {
        if (items.length === 0) {
            assetsList.innerHTML = '<tr><td colspan="4">No assets available. Add new items <a href="item.html">here</a>.</td></tr>';
        } else {
            let serialNumber = 1;
            items.forEach(item => {
                if (item.type === 'assets') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${serialNumber++}</td>
                        <td>${item.name}</td>
                        <td>${item.model}</td>
                        <td>${item.date}</td>
                    `;
                    assetsList.appendChild(row);
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
