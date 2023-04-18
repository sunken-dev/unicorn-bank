# (a) Anfänger
   1. Login Schaltfläche ist klickbar  
      ![img.png](img.png)
   2. TestUser kann sich anmelden  
      Username: TestUser  
      Passwort: correct horse battery staple  
   3. Falsche Login Daten zeigt Fehler mit Text an  
      ![img_1.png](img_1.png)  
   4. TestUser kann die Transaktion "Netflix" mit "-25,99" Euro sehen  
      ![img_2.png](img_2.png)  
   5. TestUser kann Geld überweisen und erhält eine Erfolgsmeldung  
      ![img_3.png](img_3.png)  
   6. TestUser kann 100 Euro auf ein Testkonto überweisen und erhält 100 Euro zurück  
      ![img_4.png](img_4.png)

# (b) Fortgeschritten
   1. Admin kann sich anmelden  
      Username: admin  
      Passwort: adm1n  
   2. Admin kann eine rote experimentelle Schaltfläche sehen  
      ![img_5.png](img_5.png)  
   3. TestUser sollte die rote experimentelle Schaltfläche nicht sehen  
      Jene rote Schaltfläche die der Admin ganz oben auf der Übersichtseite aller Transaktionen hat, sollte beim TestUser nicht sichtbar sein  
   4. Admin kann 100 Euro auf ein Offshore-Konto überweisen  
      ![img_6.png](img_6.png)  
   5. Admin sieht den korrekten Betrag auf dem Erfolgsbildschirm, nachdem er Geld auf das Offshore-Konto überwiesen hat  
      ![img_7.png](img_7.png)  
   6. Admin kann mit der Überbeziehungsfunktion mehr Geld senden als er hat  
      Dazu muss er den experimentellen Modus aktivieren und danach mehr Geld senden als er hat  
      ![img_8.png](img_8.png)  
      ![img_9.png](img_9.png)  

# (c) Professional
   1. Admin sieht die korrekte Summe aller Transaktionen auf der Übersicht  
      ![img_10.png](img_10.png)  
   2. Transaktionskategorien sind Singular, nicht Plural  
      ![img_11.png](img_11.png)  
      Income, Food und Health  
   3. Das Unicorn Bank Logo wird links oben als Bild mit einem Pferd angezeigt  
      ![img_12.png](img_12.png)  

# (d) Experte
   1. Admin sollte eine Gebühr von 10 Euro für Offshore-Überweisungen zahlen
   - Ändern Sie die Funktionalität, um den gesendeten Betrag an das Offshore-Konto um 10 Euro zu reduzieren.
   - Passen Sie danach die Tests so an um das neue Verhalten wiederspiegeln, also nach dem senden auf ein Offshore Konto sollte der gesendete Betrag um 10 Euro weniger sein als der vom Admin eingetragene Betrag
   - Beispiel 
      - Admin sendet 1000 Euro an Offshore Konto
      - Es werden am Erfolgsbildschirm lediglich 990 Euro angezeigt, weil ja 10 Euro Gebühr sind die nur für den Admin anfallen
   - Tipp: Test b4
   - ![img_13.png](img_13.png)
   - ![img_14.png](img_14.png)