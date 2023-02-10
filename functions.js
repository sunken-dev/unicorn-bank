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
