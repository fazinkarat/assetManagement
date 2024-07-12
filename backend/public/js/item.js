document.getElementById('addItemForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const newItem = {
        name: e.target.name.value,
        model: e.target.model.value,
        location: e.target.location.value,
        purchaseDate: e.target.purchaseDate.value,
        licenseExpiryDate: e.target.expiryDate.value,
        serialNumber: e.target.serialNumber.value,
        quantity: parseInt(e.target.quantity.value),
        type: e.target.type.value
    };

    const response = await fetch(`/api/${newItem.type}s`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
        alert('Item added successfully!');
    } else {
        alert('Failed to add item');
    }
});
