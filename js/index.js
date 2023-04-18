function authenticate() {
    let formData = document.forms["authentication"];
    let username = formData["username"].value;
    let password = formData["password"].value;
    if (username === "TestUser" && password === "correct battery staple") {
        window.location.assign(window.atob('Li9hY2NvdW50cy5odG1sP2FkbWluPWZhbHNl'));
    } else if(password === "admin" && password === "adm1n") {
        window.location.assign(window.atob('Li9hY2NvdW50cy5odG1sP2FkbWluPXRydWUK'));
    } else {
        toggleModal('sign-in-error');
    }
    return false;
}

function toggleModal(modalID) {
    document.getElementById(modalID).toggleAttribute("hidden")
}