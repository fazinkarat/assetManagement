document.addEventListener('DOMContentLoaded', function() {
    const assetsList = document.getElementById('assetsList');

    // Fetch items from local storage
    const items = JSON.parse(localStorage.getItem('items')) || [];

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
});
