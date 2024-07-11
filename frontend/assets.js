document.addEventListener('DOMContentLoaded', function() {
    const assetsList = document.getElementById('assetsList');

    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(items => {
        if (items.length === 0) {
            assetsList.innerHTML = '<p>No assets available. Add new items <a href="item.html">here</a>.</p>';
        } else {
            items.forEach(item => {
                if (item.type === 'assets') {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('card');
                    itemDiv.innerHTML = `
                        <h2>${item.name}</h2>
                        <p>Model Number: ${item.model}</p>
                        <p>Date: ${item.date}</p>
                    `;
                    assetsList.appendChild(itemDiv);
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
