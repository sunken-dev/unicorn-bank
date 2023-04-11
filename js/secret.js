function experimentalOverdraftFeature(enabled) {
    overdraft = enabled;
    console.log("`experimentalOverdraftFeature(" + overdraft + ")` " +
        "=> Turning `" + (overdraft ? "on" : "off") + "` experimental Overdraft Feature!");
}

// Turned off for now as it is still in testing
experimentalOverdraftFeature(false);

function enableExperimentalMode() {
    let adminPanel = document.getElementById("admin-panel");
    adminPanel.setAttribute("hidden", "true");
    experimentalOverdraftFeature(true);
    toggleModal('experimental-overdraft-dialog');
}
