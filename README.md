# Coding Day

School coding day repo

## TODO:
* [ ] make modal (mode) for transaction
* [ ] make hidden field for sender of tx if isAdmin == true (shows ceo, self, other account)
* [ ] make success message if tx from ceo to self was submitted
* [ ] make log output of tx + hint that it must not be deleted
* [ ] make js function to clearTraces + 2nd success ms

<!-- enable login page (enable button) -->
<!-- login as user (find password in javascript/source code) -->
<!-- change to admin (query param or javascript state) -->
<!-- transfer funds - find the javascript code, which returns the TAN -->
<!-- delete traces/logs - do this via the console, there is a function for delete logs -->

## Running website locally

```shell
docker run -it --rm -v $PWD:/usr/share/nginx/html:ro -p 80:80 nginx
```