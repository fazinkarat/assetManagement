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

    // Event listener for modal close button
    const closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Event listener for modal form submission
    const modalForm = document.getElementById('modalForm');
    if (modalForm) {
        modalForm.addEventListener('submit', handleModalFormSubmit);
    }

    // Event delegation for edit and delete buttons
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-button')) {
            editItem(event.target.dataset.endpoint, event.target.dataset.itemId);
        } else if (event.target.classList.contains('delete-button')) {
            deleteItem(event.target.dataset.endpoint, event.target.dataset.itemId);
        }
    });

    // Event listeners for search inputs
    document.getElementById('assetsSearch').addEventListener('input', () => searchTable('assetsTableBody', 'assetsSearch'));
    document.getElementById('licensesSearch').addEventListener('input', () => searchTable('licensesTableBody', 'licensesSearch'));
    document.getElementById('stocksSearch').addEventListener('input', () => searchTable('stocksTableBody', 'stocksSearch'));
});

function generateFieldsHtml(itemType) {
    const fields = {
        asset: `
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
        `,
        license: `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" required>
            <label for="purchaseDate">Purchase Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required>
            <label for="expiryDate">Expiry Date:</label>
            <input type="date" id="expiryDate" name="expiryDate" required>
        `,
        stock: `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="purchaseDate">Purchase Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required>
            <label for="purchaseAmount">Purchase Amount:</label>
            <input type="number" id="purchaseAmount" name="purchaseAmount" required>
            <label for="totalAmount">Total Amount:</label>
            <input type="number" id="totalAmount" name="totalAmount" required readonly>
        `
    };
    return fields[itemType] || '';
}

function handleItemTypeChange() {
    const itemType = document.getElementById('itemType').value;
    const fieldsContainer = document.getElementById('fieldsContainer');
    fieldsContainer.innerHTML = generateFieldsHtml(itemType);

    // Add event listeners to quantity and purchase amount fields for stocks
    if (itemType === 'stock') {
        const quantityInput = document.getElementById('quantity');
        const purchaseAmountInput = document.getElementById('purchaseAmount');
        if (quantityInput && purchaseAmountInput) {
            quantityInput.addEventListener('input', updateTotalAmount);
            purchaseAmountInput.addEventListener('input', updateTotalAmount);
        }
    }
}

function updateTotalAmount() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const purchaseAmount = parseFloat(document.getElementById('purchaseAmount').value) || 0;
    const totalAmount = quantity * purchaseAmount;
    document.getElementById('totalAmount').value = totalAmount.toFixed(2);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const itemType = document.getElementById('itemType').value;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const endpoints = {
        asset: '/api/assets',
        license: '/api/licenses',
        stock: '/api/stocks'
    };

    const endpoint = endpoints[itemType];

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
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add item');
    });
}

function fetchAndDisplayData(endpoint, tableBodyId) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById(tableBodyId);
            if (tableBody) {
                tableBody.innerHTML = data.map((item, index) => `
                    <tr class="${isExpiringSoon(item.expiryDate) ? 'highlight-expiring' : ''}">
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.model || item.id || formatDate(item.purchaseDate)}</td>
                        <td>${item.quantity || formatDate(item.purchaseDate)}</td>
                        <td>${item.purchaseAmount || formatDate(item.expiryDate)}</td>
                        <td>${item.totalAmount || item.purchaseAmount}</td>
                        <td>
                            <button class="edit-button" data-endpoint="${endpoint}" data-item-id="${item._id}">Edit</button>
                            <button class="delete-button" data-endpoint="${endpoint}" data-item-id="${item._id}">Delete</button>
                        </td>
                    </tr>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch data');
        });
}

function deleteItem(endpoint, itemId) {
    fetch(`${endpoint}/${itemId}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Item deleted successfully');
        fetchAndDisplayData(endpoint, `${endpoint.split('/').pop()}TableBody`); // Refresh table
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete item');
    });
}

function editItem(endpoint, itemId) {
    fetch(`${endpoint}/${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch item details');
            }
            return response.json();
        })
        .then(item => {
            // Open modal
            const modal = document.getElementById('editModal');
            modal.style.display = 'block';

            // Pre-fill modal form with item data
            const modalForm = document.getElementById('modalForm');
            modalForm.dataset.endpoint = endpoint;
            modalForm.dataset.itemId = itemId;

            Object.keys(item).forEach(key => {
                const input = modalForm.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = item[key];
                }
            });

            // Add event listeners to quantity and purchase amount fields for updating total amount
            if (modalForm.querySelector('[name="quantity"]') && modalForm.querySelector('[name="purchaseAmount"]')) {
                const quantityInput = modalForm.querySelector('[name="quantity"]');
                const purchaseAmountInput = modalForm.querySelector('[name="purchaseAmount"]');
                quantityInput.addEventListener('input', updateModalTotalAmount);
                purchaseAmountInput.addEventListener('input', updateModalTotalAmount);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

function handleModalFormSubmit(event) {
    event.preventDefault();

    const modalForm = event.target;
    const endpoint = modalForm.dataset.endpoint;
    const itemId = modalForm.dataset.itemId;
    const formData = new FormData(modalForm);
    const data = Object.fromEntries(formData.entries());

    fetch(`${endpoint}/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Item updated successfully');
        closeModal();
        fetchAndDisplayData(endpoint, `${endpoint.split('/').pop()}TableBody`); // Refresh table
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update item');
    });
}

function updateModalTotalAmount() {
    const quantity = parseFloat(document.getElementById('modalForm').querySelector('[name="quantity"]').value) || 0;
    const purchaseAmount = parseFloat(document.getElementById('modalForm').querySelector('[name="purchaseAmount"]').value) || 0;
    const totalAmount = quantity * purchaseAmount;
    document.getElementById('modalForm').querySelector('[name="totalAmount"]').value = totalAmount.toFixed(2);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function isExpiringSoon(expiryDate) {
    if (!expiryDate) return false;
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - currentDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 14;
}

function searchTable(tableBodyId, searchInputId) {
    const input = document.getElementById(searchInputId);
    const filter = input.value.toLowerCase();
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}
