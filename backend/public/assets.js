document.addEventListener('DOMContentLoaded', function() {
    const assetsList = document.getElementById('assetsList');

    function fetchItems() {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(items => {
                assetsList.innerHTML = '';
                if (items.length === 0) {
                    assetsList.innerHTML = '<tr><td colspan="9">No assets available. Add new items <a href="item.html">here</a>.</td></tr>';
                } else {
                    let serialNumber = 1;
                    items.forEach(item => {
                        if (item.type === 'assets') {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${serialNumber++}</td>
                                <td>${item.name}</td>
                                <td>${item.model}</td>
                                <td>${item.quantity}</td>
                                <td>${item.purchaseDate}</td>
                                <td>${item.expiryDate}</td>
                                <td>${item.purchaseAmount}</td>
                                <td>${item.totalAmount}</td>
                                <td>
                                    <button onclick="editItem(${item.id})">Edit</button>
                                    <button onclick="deleteItem(${item.id})">Delete</button>
                                </td>
                            `;
                            assetsList.appendChild(row);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    window.editItem = function(itemId) {
        window.location.href = `edit.html?id=${itemId}`;
    }

    window.deleteItem = function(itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            fetch(`http://localhost:3000/items/${itemId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status === 204) {
                    alert('Item deleted successfully');
                    fetchItems();
                } else {
                    alert('Error deleting item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    fetchItems();
});
