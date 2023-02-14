function resetGameState(restart = false) {
    indexedDB.deleteDatabase("unicorn-bank");
    localStorage.clear();
    if(restart === true) {
        window.location.assign("index.html");
    } else {
        window.location.reload();
    }
}