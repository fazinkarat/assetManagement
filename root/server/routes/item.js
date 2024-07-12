document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');
    const quantityInput = document.getElementById('quantity');
    const purchaseAmountInput = document.getElementById('purchaseAmount');
    const totalAmountInput = document.getElementById('totalAmount');

    function calculateTotalAmount() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const purchaseAmount = parseFloat(purchaseAmountInput.value) || 0;
        totalAmountInput.value = (quantity * purchaseAmount).toFixed(2);
    }

    quantityInput.addEventListener('input', calculateTotalAmount);
    purchaseAmountInput.addEventListener('input', calculateTotalAmount);

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newItem = {
            name: addItemForm.name.value,
            model: addItemForm.model.value,
            quantity: parseFloat(addItemForm.quantity.value),
            purchaseDate: addItemForm.purchaseDate.value,
            expiryDate: addItemForm.expiryDate.value,
            purchaseAmount: parseFloat(addItemForm.purchaseAmount.value),
            totalAmount: parseFloat(totalAmountInput.value),
            type: addItemForm.type.value
        };

        fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
        .then(response => response.json())
        .then(data => {
            alert('Item added successfully');
            addItemForm.reset();
            calculateTotalAmount();  // Reset total amount calculation
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
