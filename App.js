let expenseType = document.querySelector('#expenseType');
let money = document.querySelector('#money');
let moneyDisplay = document.querySelector('#moneyDisplay');
let list = document.querySelector('#list');


let account;
let data = localStorage.getItem('account');
data = JSON.parse(data);
console.log(data);

if (data === null) {
    account=[];
}else{
    account = data;
};

function addExpense() {
    let expense = {
        expenseType: expenseType.value,
        amount: money.value
    }
    account.push(expense);
    saveAccount();
    renderList();
};

function deleteExpense(index) {
    account.splice(index, 1)
    saveAccount();
    renderList();
};

function sumAmounts(expenses) {
    return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
};

function Edit(index) {
    let newAmount = prompt("Enter new amount:", account[index].amount);
    if (newAmount) {
        account[index].amount = newAmount;
        saveAccount();
        renderList();
    }
}

function renderList() {
    const totalAmount = sumAmounts(account);
    moneyDisplay.innerHTML = '$'+totalAmount;
    list.innerHTML = '';
    for (let i = 0; i < account.length; i++) {
        list.innerHTML += `
            <li>
                <div class="expenseList">
                    <h3 class="typeDisplay">${account[i].expenseType}</h3>
                    <h3 class="expenseAmount">$${account[i].amount}</h3>
                    <button class="editBtn" onclick="Edit(${i})" >Edit &#9998;</button>
                    <button class="delBtn" onclick="deleteExpense(${i})" >Delete &#10799;</button>
                    </div>
                    </li>
                    `
    };
};
function saveAccount() {
    let balance = JSON.stringify(account);
    console.log(account);
    localStorage.setItem('account', balance);
};
renderList();
