document.addEventListener('DOMContentLoaded', function() {
    const stocksList = document.getElementById('stocksList');

    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(items => {
        if (items.length === 0) {
            stocksList.innerHTML = '<tr><td colspan="4">No stocks available. Add new items <a href="item.html">here</a>.</td></tr>';
        } else {
            let serialNumber = 1;
            items.forEach(item => {
                if (item.type === 'stocks') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${serialNumber++}</td>
                        <td>${item.name}</td>
                        <td>${item.model}</td>
                        <td>${item.date}</td>
                    `;
                    stocksList.appendChild(row);
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
