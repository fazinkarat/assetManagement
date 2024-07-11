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

    console.log('New item added:', newItem);

    // You can now send this data to your server or save it locally
    // For example:
    // fetch('/add-item', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(newItem)
    // }).then(response => response.json())
    //   .then(data => {
    //       console.log('Success:', data);
    //   }).catch((error) => {
    //       console.error('Error:', error);
    //   });

    alert('Item added successfully!');
});
