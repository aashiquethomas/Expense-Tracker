
let form = document.getElementById("expenseForm");
let nameInput = document.getElementById("expenseName");
let amountInput = document.getElementById("amount");
let categoryInput = document.getElementById("category");
let dateInput = document.getElementById("date");
let tableBody = document.getElementById("tableBody");
let total = document.getElementById("total");
let filterCategory = document.getElementById("filterCategory");
let editIndex = document.getElementById("editIndex");
let submitBtn = document.getElementById("submitBtn");

// Get expenses from LocalStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses
function displayExpenses(expensesToDisplay = expenses) {

    tableBody.innerHTML = "";
    let sum = 0;

    expensesToDisplay.forEach(function(expense) {

        let index = expenses.indexOf(expense);

        sum += Number(expense.amount);

        tableBody.innerHTML += `
            <tr>
                <td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editExpense(${index})">Edit</button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteExpense(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    total.innerText = sum.toFixed(2);
}

// Add or Update expense
form.addEventListener("submit", function(e) {

    e.preventDefault();

    let expense = {
        name: nameInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value
    };

    if (editIndex.value === "") {
        expenses.push(expense);
    } else {
        expenses[Number(editIndex.value)] = expense;
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();
    editIndex.value = "";
    submitBtn.innerText = "Add Expense";

    displayExpenses();
});

// Edit expense
function editExpense(index) {

    let expense = expenses[index];

    nameInput.value = expense.name;
    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    dateInput.value = expense.date;

    editIndex.value = index;
    submitBtn.innerText = "Update Expense";
}

// Delete expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

// Filter expenses
filterCategory.addEventListener("change", function() {

    let expensesToDisplay = expenses.filter(function(expense) {

        return filterCategory.value === "All" ||
               expense.category === filterCategory.value;

    });

    displayExpenses(expensesToDisplay);
});

// Initial display
displayExpenses();
