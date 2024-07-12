document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/assets');
    const assets = await response.json();

    const assetsTable = document.getElementById('assetsTable').getElementsByTagName('tbody')[0];
    assets.forEach(asset => {
        const row = assetsTable.insertRow();
        row.insertCell(0).textContent = asset.name;
        row.insertCell(1).textContent = asset.model;
        row.insertCell(2).textContent = asset.location;
        row.insertCell(3).textContent = asset.purchaseDate;
        row.insertCell(4).textContent = asset.licenseExpiryDate;
        row.insertCell(5).textContent = asset.serialNumber;
    });
});
