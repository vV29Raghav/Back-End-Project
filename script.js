document.getElementById('expense-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseDate = document.getElementById('expense-date').value;
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseDescription = document.getElementById('expense-description').value;

    if (expenseName && expenseAmount && expenseDate && expenseCategory && expenseDescription) {
        const expense = {
            id: Date.now(),
            name: expenseName,
            amount: expenseAmount,
            date: expenseDate,
            category: expenseCategory,
            description: expenseDescription
        };
        
        addExpense(expense);
        updateTotal(expense.amount);
        document.getElementById('expense-form').reset();
    }
});

function addExpense(expense) {
    const expenseList = document.getElementById('expense-list');
    const row = document.createElement('tr');
    row.setAttribute('data-id', expense.id);

    row.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td><button onclick="deleteExpense(${expense.id}, ${expense.amount})">Delete</button></td>
    `;

    expenseList.appendChild(row);
}

function deleteExpense(id, amount) {
    document.querySelector(`tr[data-id='${id}']`).remove();
    updateTotal(-amount);
}

function updateTotal(amount) {
    const totalAmountElement = document.getElementById('total-amount');
    let currentTotal = parseFloat(totalAmountElement.textContent);
    currentTotal += amount;
    totalAmountElement.textContent = currentTotal.toFixed(2);
}
