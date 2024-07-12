document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/stocks');
    const stocks = await response.json();

    const stocksTable = document.getElementById('stocksTable').getElementsByTagName('tbody')[0];
    stocks.forEach(stock => {
        const row = stocksTable.insertRow();
        row.insertCell(0).textContent = stock.name;
        row.insertCell(1).textContent = stock.model;
        row.insertCell(2).textContent = stock.location;
        row.insertCell(3).textContent = stock.purchaseDate;
        row.insertCell(4).textContent = stock.licenseExpiryDate;
        row.insertCell(5).textContent = stock.serialNumber;
    });
});
