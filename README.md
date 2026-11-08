# Kollegium jetzt

Verfügbare Lehrkräfte nach Wochentag und aktueller Uhrzeit anzeigen – mit Gruppen, Räumen, Regelstunden und Kurzstunden. Enthält den Verschickplan vom 08.11.2026 mit 78 Einträgen und den Sonderhinweisen zur 7. Stunde.

## Auf GitHub hochladen

1. ZIP-Datei entpacken.
2. Auf GitHub ein neues Repository anlegen, beispielsweise `kollegium-jetzt`. Für die reine Ablage des Schulplans ein **privates Repository** verwenden.
3. Den **Inhalt** des entpackten Ordners `kollegium-jetzt` in die oberste Ebene des Repositorys hochladen. Nicht die ZIP-Datei und nicht den übergeordneten Ordner hochladen. Dazu `Add file → Upload files` verwenden; alternativ den gesamten Ordner mit GitHub Desktop hinzufügen und veröffentlichen.
4. Auch den Ordner `.github/workflows` übernehmen. Falls der Dateimanager versteckte Ordner ausblendet, diese einblenden. In GitHub muss anschließend `.github/workflows/pages.yml` vorhanden sein. Bei Bedarf über `Add file → Create new file` genau diesen Pfad anlegen und den Inhalt der mitgelieferten Datei einfügen.
5. Änderungen speichern (`Commit changes`). Damit liegt der vollständige Quellcode auf GitHub. Es ist keine Installation von npm-Paketen und kein Build nötig.

## Optional: Als Website mit GitHub Pages betreiben

**Zugriff:** Diese Exportversion hat keine ChatGPT-Anmeldung und keinen eigenen Zugriffsschutz. GitHub Pages ist normalerweise öffentlich erreichbar, auch wenn das Repository privat ist. Bei einer Veröffentlichung sind `dist/plan.pdf` und `dist/initial.json` ebenfalls abrufbar. Die private Zugriffsbeschränkung der bisherigen ChatGPT-Site wird nicht übertragen. Für eine interne Schulwebsite geschütztes Hosting nutzen oder zuvor sicherstellen, dass der Plan öffentlich sein darf. Die private Ablage eines Repositorys und der Zugriff auf eine Pages-Website sind zwei getrennte Einstellungen.

1. Im Repository `Settings → Pages` öffnen.
2. Unter `Build and deployment → Source` die Option **GitHub Actions** wählen.
3. Unter `Actions` den Workflow **GitHub Pages veröffentlichen** öffnen.
4. `Run workflow` wählen und den Hauptbranch auswählen. Der Workflow wird bewusst nur manuell gestartet; der reine Upload veröffentlicht noch keine Website.
5. Nach erfolgreichem Abschluss steht der Website-Link im Workflow und unter `Settings → Pages`.

Je nach GitHub-Tarif ist Pages für private Repositorys möglicherweise nicht verfügbar. Die Anwendung funktioniert auch auf anderen statischen Webservern: dort einfach den Inhalt von `dist` bereitstellen. Alle Dateipfade sind relativ und funktionieren auch unter einem Repository-Unterpfad.

Nach Codeänderungen den Workflow erneut starten, um die Website zu aktualisieren.

## Auf dem eigenen Computer starten

Mit installiertem Python im entpackten Projektordner ausführen:

```sh
python -m http.server 8000 --directory dist
```

Unter manchen Systemen heißt der Befehl `python3`. Anschließend im Browser `http://localhost:8000` öffnen. Den Server mit `Strg+C` beenden. `index.html` nicht einfach doppelt anklicken: Die Anwendung lädt Module und Daten über HTTP.

## Bedienung

- Die Live-Anzeige verwendet **Europe/Berlin**, unabhängig von der Zeitzone des Geräts, und aktualisiert sich automatisch.
- **Kurzstunden** schaltet alle sieben Stunden um. Die Auswahl bleibt in diesem Browser gespeichert.
- **Zeitpunkt auswählen** erlaubt eine Vorschau für jeden Wochentag und jede Uhrzeit. Zum Live-Betrieb den Haken entfernen.
- Pausen, Wochenenden und Zeiten vor/nach dem Unterricht zeigen keine laufende Stunde.
- Eine Stunde gilt einschließlich ihrer Startzeit und bis unmittelbar vor ihrer Endzeit.
- **PDF-Plan aktualisieren** liest eine neue Text-PDF mit demselben Tabellenaufbau ein. Alle 35 Zeitfelder und Hinweise können vor der Übernahme geprüft und korrigiert werden.
- Importformat: Montag bis Freitag, Stunden 1–7, pro Tag Kürzel / Gruppe / Raum. Maximal 20 MB und 20 Seiten. Keine OCR für gescannte PDFs.
- PDF und importierter Plan werden gemeinsam lokal in IndexedDB gespeichert. Es gibt keine Übertragung an GitHub und keine Synchronisation mit anderen Geräten oder Browsern. Das Löschen der Websitedaten setzt auf den mitgelieferten Plan zurück.
- Der PDF-Import verändert nicht die Dateien im Repository. Ein für alle Besucher neuer Ausgangsplan erfordert die gemeinsame Aktualisierung von `dist/plan.pdf` und den zugehörigen Daten in `dist/initial.json`.
- Vertretungen, Feiertage, Ferien und tatsächliche Abwesenheiten werden nicht automatisch abgefragt.

## Dateien

| Pfad | Inhalt |
| --- | --- |
| `dist/index.html` | Oberfläche |
| `dist/style.css` | Gestaltung und mobile Ansicht |
| `dist/app.mjs` | Anzeige, PDF-Import und lokale Speicherung |
| `dist/core.mjs` | Stundenzeiten und PDF-Tabellenauswertung |
| `dist/initial.json` | Eingebauter Plan |
| `dist/plan.pdf` | Ursprüngliche Referenzdatei |
| `dist/vendor/` | Mitgelieferte PDF.js-Bibliothek und deren Lizenz |
| `tests/time.test.mjs` | Tests der vorgegebenen Zeiten und Grenzen |
| `.github/workflows/pages.yml` | Manuell startbare Pages-Veröffentlichung |

## Prüfung und Abhängigkeiten

Mit installiertem Node.js (Version 22 oder neuer empfohlen):

```sh
node tests/time.test.mjs
```

Die vorgegebenen 14 Zeitintervalle, Stundenwechsel, Pausen und Wochenenden wurden geprüft. Die PDF-Auswertung wurde lokal mit einer unabhängigen Extraktion verglichen: 78 Einträge und alle 35 Hinweisfelder stimmen überein. Anzeige, Vorschau, Kurzstundenpause und Sonderhinweise wurden im Browser geprüft. Der vollständige Datei-Upload samt Speicherung konnte im automatisierten Browser wegen einer fehlenden Upload-Freigabe nicht durchgängig getestet werden. Die GitHub-Actions-Veröffentlichung ist vorbereitet, wurde aber noch nicht in Ihrem GitHub-Konto ausgeführt.

Mozilla PDF.js 6.5.438 (Legacy-Build) liegt unter `dist/vendor`; Lizenz: Apache 2.0, siehe `dist/vendor/LICENSE`. Zur Laufzeit werden keine externen CDN-Bibliotheken benötigt. GitHub-Zugangsdaten, die ursprüngliche Git-Historie und die Konfiguration der bisherigen Hosting-Plattform sind nicht im Paket enthalten.

## GitHub-Dokumentation

- [Veröffentlichungsquelle konfigurieren](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Automatische Veröffentlichung mit GitHub Actions](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically)
- [Pages erstellen und Zugänglichkeit beachten](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
