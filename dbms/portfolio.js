// Get the portfolio from localStorage
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get the stock symbol, shares, and price from the form
    let stockSymbol = document.getElementById('stockSymbol');
    let shares = document.getElementById('shares');
    let price = document.getElementById('price');

    if (stockSymbol && shares && price) {
        // Add the stock to the portfolio
        portfolio.push({
            symbol: stockSymbol.value,
            shares: shares.value,
            price: price.value
        });

        // Save the portfolio to localStorage
        localStorage.setItem('portfolio', JSON.stringify(portfolio));

        // Clear the form
        stockSymbol.value = '';
        shares.value = '';
        price.value = '';
    }

    // Update the stock table
    updateStockTable();
}

// Function to handle delete button click
function handleDeleteButtonClick(event) {
    // Get the index of the stock to delete
    let index = event.target.dataset.index;

    // Delete the stock from the portfolio
    portfolio.splice(index, 1);

    // Save the portfolio to localStorage
    localStorage.setItem('portfolio', JSON.stringify(portfolio));

    // Update the stock table
    updateStockTable();
}

// Function to update the stock table
function updateStockTable() {
    // Get the stock table body
    let stockTable = document.getElementById('stock-table');

    if (stockTable) {
        // Clear the stock table
        stockTable.innerHTML = '';

        // Add each stock in the portfolio to the table
        for (let i = 0; i < portfolio.length; i++) {
            // Create a new row
            let row = document.createElement('tr');

            // Create new cells for the stock symbol, shares, price, total value, and delete button
            let symbolCell = document.createElement('td');
            symbolCell.textContent = portfolio[i].symbol;
            row.appendChild(symbolCell);

            let sharesCell = document.createElement('td');
            sharesCell.textContent = portfolio[i].shares;
            row.appendChild(sharesCell);

            let priceCell = document.createElement('td');
            priceCell.textContent = portfolio[i].price;
            row.appendChild(priceCell);

            let totalCell = document.createElement('td');
            totalCell.textContent = portfolio[i].shares * portfolio[i].price;
            row.appendChild(totalCell);

            let deleteCell = document.createElement('td');
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Sold';
            deleteButton.dataset.index = i;
            deleteButton.addEventListener('click', handleDeleteButtonClick);
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            // Add the row to the table
            stockTable.appendChild(row);
        }
    }
}

// Add the form submit event listener
let form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleFormSubmit);
}

// Update the stock table when the page loads
updateStockTable();
