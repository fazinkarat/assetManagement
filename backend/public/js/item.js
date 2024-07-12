document.addEventListener('DOMContentLoaded', () => {
    const itemTypeSelect = document.getElementById('itemType');
    const assetFields = document.getElementById('assetFields');
    const licenseFields = document.getElementById('licenseFields');
    const stockFields = document.getElementById('stockFields');
    const itemForm = document.getElementById('itemForm');

    // Hide all fields initially
    assetFields.style.display = 'none';
    licenseFields.style.display = 'none';
    stockFields.style.display = 'none';

    // Show relevant fields based on the selected item type
    itemTypeSelect.addEventListener('change', (event) => {
        const selectedType = event.target.value;
        
        // Hide all fields initially
        assetFields.style.display = 'none';
        licenseFields.style.display = 'none';
        stockFields.style.display = 'none';

        if (selectedType === 'asset') {
            assetFields.style.display = 'block';
        } else if (selectedType === 'license') {
            licenseFields.style.display = 'block';
        } else if (selectedType === 'stock') {
            stockFields.style.display = 'block';
        }
    });

    // Form submission
    itemForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(itemForm);
        const itemType = formData.get('itemType');
        let itemData = {};

        // Extract relevant data based on item type
        if (itemType === 'asset') {
            itemData = {
                type: 'asset',
                name: formData.get('name'),
                model: formData.get('model'),
                purchaseDate: formData.get('purchaseDate'),
                expiryDate: formData.get('expiryDate'),
                purchaseAmount: formData.get('purchaseAmount')
            };
        } else if (itemType === 'license') {
            itemData = {
                type: 'license',
                name: formData.get('name'),
                id: formData.get('id'),
                purchaseDate: formData.get('purchaseDate'),
                expiryDate: formData.get('expiryDate')
            };
        } else if (itemType === 'stock') {
            itemData = {
                type: 'stock',
                name: formData.get('name'),
                purchaseDate: formData.get('purchaseDate'),
                purchaseAmount: formData.get('purchaseAmount'),
                quantity: formData.get('quantity'),
                totalAmount: formData.get('totalAmount')
            };
        }

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });

            if (response.ok) {
                alert('Item added successfully!');
                itemForm.reset();
                assetFields.style.display = 'none';
                licenseFields.style.display = 'none';
                stockFields.style.display = 'none';
                itemTypeSelect.value = '';
            } else {
                alert('Failed to add item.');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
