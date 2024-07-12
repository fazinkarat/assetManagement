document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/licenses');
    const licenses = await response.json();

    const licensesTable = document.getElementById('licensesTable').getElementsByTagName('tbody')[0];
    licenses.forEach(license => {
        const row = licensesTable.insertRow();
        row.insertCell(0).textContent = license.name;
        row.insertCell(1).textContent = license.model;
        row.insertCell(2).textContent = license.location;
        row.insertCell(3).textContent = license.purchaseDate;
        row.insertCell(4).textContent = license.licenseExpiryDate;
        row.insertCell(5).textContent = license.serialNumber;
    });
});
