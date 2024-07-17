document.addEventListener('DOMContentLoaded', () => {
    // Event listener for selecting the item type
    const itemTypeSelect = document.getElementById('itemType');
    if (itemTypeSelect) {
        itemTypeSelect.addEventListener('change', handleItemTypeChange);
    }

    // Event listener for form submission
    const itemForm = document.getElementById('itemForm');
    if (itemForm) {
        itemForm.addEventListener('submit', handleFormSubmit);
    }

    // Fetch and display assets, licenses, and stocks
    fetchAndDisplayData('/api/assets', 'assetsTableBody');
    fetchAndDisplayData('/api/licenses', 'licensesTableBody');
    fetchAndDisplayData('/api/stocks', 'stocksTableBody');
});

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function handleItemTypeChange() {
    const itemType = document.getElementById('itemType').value;
    const fieldsContainer = document.getElementById('fieldsContainer');
    fieldsContainer.innerHTML = '';

    let fieldsHtml = '';
    if (itemType === 'asset') {
        fieldsHtml = `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="model">Model/Serial No:</label>
            <input type="text" id="model" name="model" required>
            <label for="purchaseDate">Purchase Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required>
            <label for="expiryDate">Expiry Date:</label>
            <input type="date" id="expiryDate" name="expiryDate" required>
            <label for="totalAmount">Amount:</label>
            <input type="number" id="totalAmount" name="totalAmount" required>
        `;
    } else if (itemType === 'license') {
        fieldsHtml = `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" required>
            <label for="purchaseDate">Purchase Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required>
            <label for="expiryDate">Expiry Date:</label>
            <input type="date" id="expiryDate" name="expiryDate" required>
        `;
    } else if (itemType === 'stock') {
        fieldsHtml = `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="purchaseDate">Purchase Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required>
            <label for="purchaseAmount">Purchase Amount:</label>
            <input type="number" id="purchaseAmount" name="purchaseAmount" required>
            <label for="totalAmount">Total Amount:</label>
            <input type="number" id="totalAmount" name="totalAmount" required>
        `;
    }

    fieldsContainer.innerHTML = fieldsHtml;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const itemType = document.getElementById('itemType').value;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    let endpoint = '';
    if (itemType === 'asset') {
        endpoint = '/api/assets';
    } else if (itemType === 'license') {
        endpoint = '/api/licenses';
    } else if (itemType === 'stock') {
        endpoint = '/api/stocks';
    }

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Item added successfully');
        event.target.reset();
        handleItemTypeChange(); // Reset fields
        fetchAndDisplayData(endpoint, `${itemType}sTableBody`); // Refresh table
    })
    .catch(error => console.error('Error:', error));
}

function fetchAndDisplayData(endpoint, tableBodyId) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById(tableBodyId);
            if (tableBody) {
                tableBody.innerHTML = data.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.model || item.id || formatDate(item.purchaseDate)}</td>
                        <td>${item.quantity || formatDate(item.purchaseDate)}</td>
                        <td>${item.purchaseAmount || formatDate(item.expiryDate)}</td>
                        <td>${item.totalAmount || item.purchaseAmount}</td>
                        <td>
                            <button onclick="deleteItem('${endpoint}', '${item._id}')">Delete</button>
                        </td>
                    </tr>
                `).join('');
            }
        })
        .catch(error => console.error('Error:', error));
}

function deleteItem(endpoint, itemId) {
    fetch(`${endpoint}/${itemId}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Item deleted successfully');
        fetchAndDisplayData(endpoint, `${endpoint.split('/').pop()}TableBody`); // Refresh table
    })
    .catch(error => console.error('Error:', error));
}
