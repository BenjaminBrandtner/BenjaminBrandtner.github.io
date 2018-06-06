# Problem
Ich will mit Javascript eine Text-Datei erstellen (z.B. irgendwelche dynamischen Informationen, die die Webseite generiert) die der Nutzer runterladen kann. Klassischerweise würde man dazu die Daten zum Server senden und dann wieder von ihm empfangen, aber dass möchte ich nicht tun. Ich will, dass die Seite komplett offline funktioniert.

## Lösung 1: Content URIs
Diese Lösung scheint ein ziemlicher Hack zu sein.  
Wir erstellen im HTML-DOM ein a-Element, und setzen das href-Attribut auf "data:text/plain;charset=utf-8,gewünschterTexthier".  
Wir schreiben auch das Attribut download mit dem gewünschten voreigenstellten Dateinamen. Dies bringt die meisten Browser dazu, das was in href angegeben ist, runterzuladen.  
Wir könnten das erstelle anchor-Element irgendwo im Dokument einfügen, damit der User es jederzeit anklicken kann, oder wir simulieren sofort selbst einen Mausklick auf das anchor-Element.
```
var anchorElement = document.createElement('a');
anchorElement.setAttribute("href", "data:text/plain;charset=utf-8,HalloWelt");
anchorElement.setAttribute("download", "telefonbuch.json");
anchorElement.click();
```
Beim Erstellen der Content URI sollte man nicht einfach wie oben den Text direkt reinschreiben, sondern vorher mit der Funktion encodeURIComponent() zu einem Text aus nur gültigen Zeichen encodieren. So gibt `encodeURIComponent("Was für ein wunderschöner Tag")` folgendes zurück: `"Was%20f%C3%BCr%20ein%20wundersch%C3%B6ner%20Tag"`

```
anchorElement.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent("Hallo Welt"));
```

## Lösung 2: FileSaver.js
Dieses Polyfill implementiert den FileSaver der w3c FileAPI der inzwischen aus dieser API entfernt wurde in allen modernen Browsern.  
Wir erstellen ein Blob-Objekt mit dem gewünschten Inhalt und rufen dann die Funktion SaveAs(blob, dateiname) auf.
```
var blob = new Blob(["Hallo Welt"], {
 type: "text/plain;charset=utf-8"
});

saveAs(blob, "hallo.txt");
```
## Hinweis
Überall wo ich `"Hallo Welt"` o.Ä. angegeben habe kann man natürlich auch Variablen oder `"String "+variable+" weiterer String"` o.Ä. benutzen.

# Quellen
Blog Post der beide Lösungen beschreibt:
- https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server

Lösung 1: 
- https://stackoverflow.com/questions/11336663/how-to-make-a-browser-display-a-save-as-dialog-so-the-user-can-save-the-conten
- https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file

Lösung 2:
- https://eligrey.com/blog/saving-generated-files-on-the-client-side/
- Was ist ein Blob: https://developer.mozilla.org/de/docs/Web/API/Blob

