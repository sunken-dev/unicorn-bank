function authenticate() {
    let formData = document.forms["authentication"];
    let username = formData["username"].value;
    let password = formData["password"].value;
    // TODO: we will patch this later
    if (username === "TestUser" && password === "!a@s#d$f") {
        window.location.assign(window.atob('Li9hY2NvdW50cy5odG1sP2FkbWluPWZhbHNl'));
    }
    return false;
}
