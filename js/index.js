function authenticate() {
    let formData = document.forms["authentication"];
    let username = formData["username"].value;
    let password = formData["password"].value;
    // TODO a2 missing `horse` in password `correct horse battery staple`
    if (username === "TestUser" && password === "correct horse battery staple") {
        window.location.assign(window.atob('Li9hY2NvdW50cy5odG1sP2FkbWluPWZhbHNl'));
    } else if(username === "admin" && password === "adm1n") { // TODO b1 change to username comparison
        window.location.assign(window.atob('Li9hY2NvdW50cy5odG1sP2FkbWluPXRydWUK'));
    } else {
        toggleModal('sign-in-error');
    }
    return false;
}

function toggleModal(modalID) {
    document.getElementById(modalID).toggleAttribute("hidden")
}