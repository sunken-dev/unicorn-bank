/// obsf. below here
function readUrlParameters(parameterName) {
    const requestUri = window.location.search.substring(1);
    const getParameters = requestUri.split('&');
    for (let i = 0; i < getParameters.length; i++) {
        const paramName = getParameters[i].split('=');
        if (paramName[0] === parameterName) {
            return paramName[1];
        }
    }
}

let admin = isAdmin();
const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
let cur_amount = -1000.00;

const today = Date.now();
const days = (dayCount) => 1000 * 60 * 60 * 24 * dayCount;

function addTransaction(name, tags, value, timestamp) {
    const trx = document.createElement("li");
    let valueFg = (value < 0) ? "account-transaction-negative" : "account-transaction-positive";
    cur_amount += value;
    trx.innerHTML = `
        <div class="account-transaction-1">
            <div class="account-transaction-2">
                <p class="account-transaction-3">${name}</p>
                <p class="account-transaction-4 ${valueFg}">${formatter.format(value)}</p>
            </div>
            <div class="account-transaction-5">
                <div class="account-transaction-6">
                    <p class="account-transaction-7">${tags}</p>
                </div>
                <div class="account-transaction-8">
                    <img class="account-transaction-9" src="./img/calendar.svg" alt="Calendar Icon" />
                    <p><time datetime="2023-02-05">${new Date(timestamp).toDateString()}</time></p>
                </div>
            </div>
        </div>
    `;
    let trxs = document.querySelector("#transactions li");
    if (trxs) {
        trxs.prepend(trx);
    } else {
        document.querySelector("#transactions").append(trx);
    }
    let currentBalance = document.getElementById('current-balance');
    let balanceClass = (cur_amount < 0) ? "account-total-negative" : "account-total-positive";
    currentBalance.innerHTML = formatter.format(cur_amount);
    currentBalance.className = balanceClass;

}

function transferMoney() {
    let formData = document.forms["transaction"];
    let receiver = formData["receiver"].value;
    let amount = parseInt(formData["amount"].value);
    if (receiver === "test") {
        addTransaction("Transfer Money", "Other", amount * -1, today);
        addTransaction("Receive Money", "Other", amount, today);
        return toggleModal('transaction-success');
    } else if(amount > cur_amount) {
        if (admin === true) {
            addTransaction("Transfer Money", "Other", amount, today);
            return toggleModal('transaction-success');
        } else {
            return toggleModal('transaction-error-overdraft');
        }
    }
    return false;
}
