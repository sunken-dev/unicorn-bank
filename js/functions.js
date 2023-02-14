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

const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
let cur_amount = -1000.00;

function addTransaction(name, tags, value, timestamp) {
    const transactions = document.getElementById("transactions");
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
    transactions.prepend(trx);
    document.getElementById('current-balance').innerHTML = formatter.format(cur_amount);
}

function enableAdminMode() {

}
