document.addEventListener('DOMContentLoaded', function() {
    const licensesList = document.getElementById('licensesList');

    function fetchItems() {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(items => {
                licensesList.innerHTML = '';
                if (items.length === 0) {
                    licensesList.innerHTML = '<tr><td colspan="9">No licenses available. Add new items <a href="item.html">here</a>.</td></tr>';
                } else {
                    let serialNumber = 1;
                    items.forEach(item => {
                        if (item.type === 'licenses') {
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
                            licensesList.appendChild(row);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function editItem(itemId) {
        // Redirect to the edit page or open a modal for editing the item
        window.location.href = `edit.html?id=${itemId}`;
    }

    function deleteItem(itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            fetch(`http://localhost:3000/items/${itemId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Item deleted successfully');
                fetchItems();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    fetchItems();
});
