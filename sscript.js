document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('itemName').value;
    const modelNumber = document.getElementById('modelNumber').value;
    const date = document.getElementById('date').value;

    const newItem = {
        type: itemType,
        name: itemName,
        model: modelNumber,
        date: date
    };

    // Fetch existing items from local storage
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Add the new item to the list
    items.push(newItem);

    // Save the updated list to local storage
    localStorage.setItem('items', JSON.stringify(items));

    alert('Item added successfully!');
    window.location.href = 'index.html'; // Redirect to dashboard or desired page
});
