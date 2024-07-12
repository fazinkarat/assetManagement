document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    function loadItem() {
        fetch(`http://localhost:3000/items/${itemId}`)
            .then(response => response.json())
            .then(item => {
                editForm.name.value = item.name;
                editForm.model.value = item.model;
                editForm.quantity.value = item.quantity;
                editForm.purchaseDate.value = item.purchaseDate;
                editForm.expiryDate.value = item.expiryDate;
                editForm.purchaseAmount.value = item.purchaseAmount;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedItem = {
            name: editForm.name.value,
            model: editForm.model.value,
            quantity: editForm.quantity.value,
            purchaseDate: editForm.purchaseDate.value,
            expiryDate: editForm.expiryDate.value,
            purchaseAmount: editForm.purchaseAmount.value,
            totalAmount: editForm.quantity.value * editForm.purchaseAmount.value
        };

        fetch(`http://localhost:3000/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })
        .then(response => response.json())
        .then(data => {
            alert('Item updated successfully');
            window.location.href = 'assets.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    loadItem();
});
