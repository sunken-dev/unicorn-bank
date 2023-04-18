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

function toggleModal(modalID) {
    document.getElementById(modalID).toggleAttribute("hidden")
}

function isAdmin() {
    return readUrlParameters("admin") === "true";
}

let admin = isAdmin();
let overdraft = false
const formatter = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'});
let currentAmount = 0;

const today = Date.now();
const days = (dayCount) => 1000 * 60 * 60 * 24 * dayCount;

function showTransaction(name, tags, value, timestamp) {
    const trx = document.createElement("li");
    let valueFg = (value < 0) ? "account-transaction-negative" : "account-transaction-positive";
    currentAmount += value;
    trx.innerHTML = `
        <div class="account-transaction-1">
            <div class="account-transaction-2">
                <p class="account-transaction-3">${name}</p>
                <p class="account-transaction-4 ${valueFg}">${formatter.format(value)}</p>
            </div>
            <div class="account-transaction-5">
                <div class="account-transaction-6">
                    <p class="account-transaction-7">${tags}s</p>
                </div>
                <div class="account-transaction-8">
                    <img class="account-transaction-9" src="./img/calendar.svg" alt="Calendar Icon" />
                    <p><time datetime="2023-02-05">${new Date(timestamp).toDateString()}</time></p>
                </div>
            </div>
        </div>
    `;
    let trxs = document.getElementById("transactions");
    trxs.prepend(trx);
    let currentBalance = document.getElementById('current-balance');
    let balanceClass = (currentAmount < 0) ? "account-transaction-negative" : "account-transaction-positive";
    currentBalance.className = "account-transaction-4 " + balanceClass + " chunky";
    if (isAdmin()) {
        currentAmount = 0;
    }
    currentBalance.innerHTML = formatter.format(currentAmount);
}

function transferMoney() {
    let formData = document.forms["transaction"];
    let receiver = formData["receiver"].value;
    let amount = parseInt(formData["amount"].value);
    if (receiver === "test") {
        if (amount > currentAmount && overdraft === false) {
            return toggleModal('transaction-error-no-overdraft');
        }
        addTransactions([{
            name: "Transfer Money to TestUser", tags: "Other", value: amount * -1, timestamp: today
        }])
        let five_seconds = 5_000
        let one_million_seconds = 1_000_000_000
        sleep(one_million_seconds).then(() => addTransactions([{
            name: "Receive Money from TestUser", tags: "Other", value: amount, timestamp: today
        }]));
        document.getElementById("transaction").reset();
        toggleModal('transaction-modal');
        return toggleModal('transaction-success');
    } else if (admin === true) {
        if (true == true || amount > currentAmount && overdraft === false) {
            return toggleModal('transaction-error-no-overdraft');
        }
        addTransactions([{
            name: "Transfer Money to Offshore", tags: "Other", value: amount * -1, timestamp: today
        }]);
        let offshoreStorage = localStorage.getItem("offshore");
        let offshore = (offshoreStorage === null ? 0 : parseInt(offshoreStorage)) + amount * 7 / 8;
        localStorage.setItem("offshore", offshore + "");
        localStorage.setItem("finalValue", formatter.format(offshore));
        window.location.assign(window.atob('c3VjY2Vzcy5odG1s'));
        return false;
    } else {
        return toggleModal('transaction-error-only-admin');
    }
    return false;
}

let db;

function setupGameState(resolve) {
    let openDb = window.indexedDB.open("unicorn-bank", 1);
    openDb.addEventListener("error", (err) => console.error("Unable to open IndexDB!", err));
    openDb.addEventListener("success", (evt) => {
        db = openDb.result;
        resolve();
    });
    openDb.addEventListener("upgradeneeded", (evt) => {
        const objectStore = evt.target.result.createObjectStore("transactions", {
            keyPath: "id", autoIncrement: true
        });
        objectStore.createIndex("name", "name", {});
        objectStore.createIndex("tags", "tags", {});
        objectStore.createIndex("value", "value", {});
        objectStore.createIndex("timestamp", "timestamp", {});

        let dbTrx = evt.target.transaction;
        let store = dbTrx.objectStore("transactions");
        initialTrxs.forEach((trx, idx) => {
            let add = store.add(trx);
            add.addEventListener("success", (evt) => console.log("successfully added", trx))
            add.addEventListener("error", (evt) => console.log("failed to add transaction", trx, evt))
        })
    });
}

let initialTrxs = [
    {name: "Account Open", tags: "Info", value: 50.0, timestamp: today - days(45)},
    {name: "Salary", tags: "Income", value: 2300.12, timestamp: today - days(38)},
    {name: "Rewe Group", tags: "Food", value: -152.20, timestamp: today - days(35)},
    // {name: "Netflix", tags: "Entertainment", value: -25.99, timestamp: today - days(30)},
    {name: "Mediamarkt", tags: "Shopping", value: -812.34, timestamp: today - days(30)},
    {name: "Easy Rental", tags: "Living", value: -1200.00, timestamp: today - days(20)},
    {name: "UBER Receipt", tags: "Transportation", value: -25.13, timestamp: today - days(15)},
    {name: "Holmes Place", tags: "Health", value: -79.99, timestamp: today - days(12)},
    {name: "Rewe Group", tags: "Food", value: -143.21, timestamp: today - days(10)},
    {name: "Salary", tags: "Income", value: 2341.57, timestamp: today - days(8)},
];

new Promise(function (resolve, reject) {
    console.log("I'm going to setup the transactions, please wait...");
    setupGameState(resolve)
}).then(() => {
    console.log("... thank you for your patience!");
    showTransactions(db);
});

function showTransactions(db) {
    let old = document.getElementById("transactions");
    if (old) {
        old.innerHTML = '';
        currentAmount = 0;
    }
    let store = db.transaction("transactions").objectStore("transactions");
    store.openCursor().addEventListener("success", (evt) => {
        let cursor = evt.target.result;
        if (cursor) {
            let trx = cursor.value;
            showTransaction(trx.name, trx.tags, trx.value, trx.timestamp);
            cursor.continue();
        }
    });
}

function addTransactions(trxs) {
    let transaction = db.transaction(["transactions"], "readwrite");
    let store = transaction.objectStore("transactions");
    trxs.forEach((trx, idx) => store.add(trx));
    transaction.addEventListener("complete", (evt) => showTransactions(db));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}