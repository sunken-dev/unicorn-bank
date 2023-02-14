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
const formatter = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'});
let cur_amount = -1000.00;

const today = Date.now();
const days = (dayCount) => 1000 * 60 * 60 * 24 * dayCount;

function showTransaction(name, tags, value, timestamp) {
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
    let trxs = document.getElementById("transactions");
    trxs.prepend(trx);
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
        addTransaction("Transfer Money to TestUser", "Other", amount * -1, today);
        addTransaction("Receive Money from TestUser", "Other", amount, today);
        return toggleModal('transaction-success');
    } else if (amount > cur_amount) {
        if (admin === true) {
            addTransaction("Transfer Money to Offshore", "Other", amount * -1, today);
            return toggleModal('transaction-success');
        } else {
            return toggleModal('transaction-error-overdraft');
        }
    }
    return false;
}

let db;

function setupGameState(resolve) {
    console.log("setup game state. In order to reset the gamestate execute `resetGameState()` in the console!");
    let openDb = window.indexedDB.open("unicorn-bank", 1);
    openDb.addEventListener("error", (err) => console.error("Unable to open IndexDB!", err));
    openDb.addEventListener("success", (evt) => {
        db = openDb.result;
        resolve();
    });
    openDb.addEventListener("upgradeneeded", (evt) => {
        const objectStore = evt.target.result.createObjectStore("transactions", {
            keyPath: "id",
            autoIncrement: true
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
            add.addEventListener("error", (evt) => console.log("failed to add trasaction", trx, evt))
        })
    });
}

function resetGameState() {
    indexedDB.deleteDatabase("unicorn-bank");
    location.reload();
}

let initialTrxs = [
    {
        name: "Account Open",
        tags: "Info",
        value: 500.0,
        timestamp: today - days(45)
    },
    {
        name: "Netflix",
        tags: "Entertainment",
        value: -25.99,
        timestamp: today - days(40)
    },
    {
        name: "Rewe Group",
        tags: "Groceries",
        value: -12.20,
        timestamp: today - days(35)
    },
    {
        name: "Mediamarkt",
        tags: "Shopping",
        value: -512.34,
        timestamp: today - days(30)
    },
    {
        name: "Moneyback",
        tags: "Cashback",
        value: 23.00,
        timestamp: today - days(29)
    },
    {
        name: "Easy Rental",
        tags: "Living",
        value: -978.00,
        timestamp: today - days(20)
    },
    {
        name: "UBER Receipt",
        tags: "Transportation",
        value: -29.13,
        timestamp: today - days(15)
    },
    {
        name: "Holmes Place",
        tags: "Health",
        value: -79.99,
        timestamp: today - days(10)
    },
    {
        name: "Rewe Group",
        tags: "Groceries",
        value: -43.21,
        timestamp: today - days(5)
    },
    {
        name: "Salary",
        tags: "Income",
        value: 2141.57,
        timestamp: today - days(0)
    },
];

new Promise(function (resolve, reject) {
    setupGameState(resolve)
}).then(() => {
    showTransactions(db);
});

function showTransactions(db) {
    let old = document.getElementById("transactions");
    if (old) {
        old.innerHTML = '';
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

function addTransaction(name, tags, value, timestamp) {
    let store = db.transaction(["transactions"], "readwrite").objectStore("transactions");
    store.add({
        name: name,
        tags: tags,
        value: value,
        timestamp: timestamp
    }).addEventListener("success", (evt) => showTransactions(db));
}
