function authenticate() {
    let formData = document.forms["authentication"];
    let username = formData["username"].value;
    let password = formData["password"].value;
    // TODO: we will patch this in a later release, this should not be an issue for now as nobody checks the source
    if (username == "user0172" && password == "my-secure-password1") {
        console.log("authenticated as user");
        return true;
    }
    return false;
}


/// obsf. below here
function readUrlParameters(parameterName)
{
    var requestUri = window.location.search.substring(1);
    var getParameters = requestUri.split('&');
    for (var i = 0; i < getParameters.length; i++)
    {
        var paramName = getParameters[i].split('=');
        if (paramName[0] == parameterName)
        {
            return paramName[1];
        }
    }
}

function addTransaction(name, tags, value, date) {
    var transactions = document.getElementById("transactions");
    var trx = document.createElement("li");
    var valueFg, valueBg;
    if (value.startsWith("-")) {
        valueFg = "text-red-800";
        valueBg = "bg-red-100"
    } else {
        valueFg = "text-green-800";
        valueBg = "bg-green-100";
    }
    trx.innerHTML = '<div class="px-4 py-2 sm:px-6">' +
        '<div class="flex items-center justify-between">' +
        `<p class="text-sm font-medium text-indigo-600 px">${name}</p>` +
        `<p class="inline-flex rounded-full ${valueBg} px-2 text-xs font-semibold leading-5 ${valueFg}">${value}</p>` +
        '</div>' +
        '<div class="mt-2 sm:flex sm:justify-between">' +
        '<div class="sm:flex">' +
        '<p class="flex items-center text-sm text-gray-500 bg-gray-100 border-gray-900 border border-dotted rounded-md px-2">' +
        `${tags}` +
        '</p>' +
        '</div>' +
        '<div class="mt-2 flex text-sm text-gray-500 sm:mt-0">' +
        '<!-- Heroicon name: mini/calendar -->' +
        '<svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"' +
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
}

function enableAdminMode() {

}
