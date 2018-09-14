# Dateien Einlesen
Ich möchte eine vom Benutzer ausgewählte Datei einlesen und auf Ihren Inhalt im Browser mit Javascript zugreifen. Ich möchte sie nicht an den Server senden.

## Lösung: input type="file", FileAPI, FileReader
### HTML
Aus Sicherheitsgründen sind die einzigen Dateien auf die wir im Web Zugriff haben die, die durch den Nutzer in einem Datei-öffnen Dialog eines `<input type="file">`-Tags ausgewählt wurden. Dieses Tag kann auch die Attribute `require="dateityp"` und `multiple` haben. `<input type="file">` existiert seit HTML5.

### Javascript
Wenn der Benutzer eine Datei ausgewählt hat feuert vom input-Element das event change, das wir abhören können um daraufhin eine Funktion zu starten, oder wir legen einen Knopf an, den der User klickt um eine Funktion zu starten.
Sobald eine Datei ausgewählt wurde hängt am input-Element eine FileList, die File-Objekte enthält. Die erste Datei können wir folgendermaßen auslesen:  
`var datei = document.getElementById('unserInput').files[0];`  
Durch die w3c FileAPI können von diesen Objekten Read-Only Eigenschaften gelesen werden, und später mit FileReader auch der Inhalt:  
`console.log(datei.size, datei.name, datei.lastModified, datei.type)`

### FileReader
Mit dem FileReader-Objekt kann der Inhalt eines File-Objektes, wie wir es oben angelegt haben, ausgelesen werden.
```
var inhalt;
var reader = new FileReader();

reader.readAsText(datei);
reader.onload = function(event) {
	inhalt = event.target.result;
	//Weitere Verarbeitung der Daten
}
//Hier kann nicht mit den ausgelesenen Daten gearbeitet werden.
```
Zuerst müssen wir eine Instanz von FileReader erzeugen. Dieser weißen wir an, den Inhalt von datei als Text zu lesen. Ist er fertig feuert das Event load, dass wir in der 5. Zeile abfangen. (Die Syntax ist anders, als alles was ich bisher gesehen habe, ich versteh nicht ganz, was hier passiert).  
Das Ergebnis des Lesevorgangs steht, sobald er beendet ist in reader.result. Die obige Schreibweise mit event.target ist nur etwas mehr fancy und in gewissen Fällen besser.  
Die weitere Verarbeitung des Ergebnisses sollte nur innerhalb der anonymen Funktion erfolgen, da das Lesen der Datei asynchron erfolgt, d.h. der Programmcode nach Linie 5 einfach weiterläuft, bis er irgendwann vom load-Event unterbrochen wird.  
Sicherlich kann man auch auf anderen Weisen das fertige Lesen der Datei abfragen und abwarten. Ich muss mich nochmal damit beschäftigen.

# Quellen
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications (Beschreibt auch, wie man das input-Element auf der Webseite hübscher darstellen kann)
- https://developer.mozilla.org/de/docs/web/api/filereader
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
- https://www.w3.org/TR/FileAPI/
