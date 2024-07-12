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

    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
        alert('Item added successfully!');
        window.location.href = 'index.html'; // Redirect to dashboard or desired page
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
