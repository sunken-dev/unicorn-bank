/// obsf. below here
function readUrlParameters(parameterName) {
    var requestUri = window.location.search.substring(1);
    var getParameters = requestUri.split('&');
    for (var i = 0; i < getParameters.length; i++) {
        var paramName = getParameters[i].split('=');
        if (paramName[0] == parameterName) {
            return paramName[1];
        }
    }
}

const formatter = Intl.NumberFormat('de-DE', {
    maximumSignificantDigits: 2,
    style: 'currency',
    currency: 'EUR'
});
let cur_amount = -1000.00;

function addTransaction(name, tags, value, date) {
    var transactions = document.getElementById("transactions");
    var trx = document.createElement("li");
    var valueFg;
    cur_amount += value;
    if (value < 0) {
        valueFg = "account-transaction-negative";
    } else {
        valueFg = "account-transaction-positive";
    }
    trx.innerHTML = '<div class="account-transaction-1">' +
        '<div class="account-transaction-2">' +
        `<p class="account-transaction-3">${name}</p>` +
        `<p class="account-transaction-4 ${valueFg}">${value}</p>` +
        '</div>' +
        '<div class="account-transaction-5">' +
        '<div class="account-transaction-6">' +
        '<p class="account-transaction-7">' +
        `${tags}` +
        '</p>' +
        '</div>' +
        '<div class="account-transaction-8">' +
        '<!-- Heroicon name: mini/calendar -->' +
        '<svg class="account-transaction-9"' +
        '     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"' +
        '     aria-hidden="true">' +
        '     <path fill-rule="evenodd"' +
        '           d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"' +
        '           clip-rule="evenodd"/>' +
        '</svg>' +
        '<p>' +
        `<time datetime="2023-02-05">${date}</time>` +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    transactions.appendChild(trx);
    document.getElementById('current-balance').innerHTML = formatter.format(cur_amount);
}

function enableAdminMode() {

}
