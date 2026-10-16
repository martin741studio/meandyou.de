# me&you Communication — Michael Ehlers

Offizielle Website für **me&you Communication** (Michael Ehlers).  
Partner-Projekt mit **Pauspapier (Pagency)** / Kontakt: Tajan.  
Technische Umsetzung & Hosting: **741 Studio** (Martin Drendel).

## 1. Seitenstruktur (10 Seiten)
- `index.html` — Startseite (Einstieg, Vertrauen, Problem, Methode, Michael, Stimmen, FAQ, Kontakt)
- `seminare.html` — Seminare & Masterclasses (Termine Mallorca, Barcelona, Zypern, Frankfurt, Berlin)
- `michael.html` — Über Michael Ehlers (Werdegang, Methode, Top-100-Auszeichnung, Medien)
- `rhetorik.html` — Was ist Rhetorik (Ratgeber, Einstieg)
- `stimmen.html` — Video- und Kundenstimmen
- `faq.html` — Häufig gestellte Fragen (13 Fragen)
- `gespraech-buchen.html` — Terminbuchung
- `lp-replayers.html` — Persona-Landingpage „The Replayers“ (Skool Community „Talk to ME!“)
- `lp-overlooked.html` — Persona-Landingpage „The Overlooked“
- `lp-undersold.html` — Persona-Landingpage „The Undersold“

## 2. Lokale Vorschau
```bash
npm run dev    # startet den Server auf http://localhost:4322/
```

## 3. Deployment
### Option A: Push to GitHub (Automatischer Workflow)
Ein Push auf den `main`-Branch triggert die GitHub Action (sobald FTP-Secrets im Repo hinterlegt sind).
```bash
git add -A && git commit -m "update" && git push origin main
```

### Option B: Direktes Deployment per FTP
Kopiere `.env.example` nach `.env`, trage die FTP-Zugangsdaten ein und führe aus:
```bash
npm run deploy
```

## 4. DNS-Konfiguration (meandyou.de)
Beim DNS-Provider von `meandyou.de`:
* **A-Record `@` (meandyou.de):** `185.2.31.101`
* **A-Record / CNAME `www` (www.meandyou.de):** `185.2.31.101` bzw. `meandyou.de`
* **ACHTUNG:** Bestehende `MX`-, `TXT`- (SPF/DKIM/DMARC) und `CNAME`-Einträge für Maildienste (Google Workspace, ActiveCampaign etc.) NICHT verändern!
