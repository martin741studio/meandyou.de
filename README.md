# me&you Communication — Michael Ehlers

Offizielle Website für **me&you Communication** (Michael Ehlers).  
Partner-Projekt mit **Pauspapier (Pagency)** / Kontakt: Tajan.  
Hosting & Bereitstellung: **GitHub Pages (Global CDN, Auto-SSL)**  
Repository: [martin741studio/meandyou.de](https://github.com/martin741studio/meandyou.de)  
Live Preview: [https://martin741studio.github.io/meandyou.de/](https://martin741studio.github.io/meandyou.de/)

---

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

---

## 2. Lokale Vorschau & Entwicklung
```bash
npm run dev    # startet den Server auf http://localhost:4322/
```

---

## 3. Deployment (GitHub Pages)
Die Seite läuft vollautomatisch über GitHub Pages (wie auch `praxis-huewel.de`).  
Jeder Push auf den `main`-Branch wird von GitHub sofort global auf das CDN deployed:
```bash
git add -A && git commit -m "update" && git push origin main
```
Kein eigener Webserver, kein cPanel, keine FTP-Zugangsdaten erforderlich.

---

## 4. DNS-Konfiguration für Pauspapier (`meandyou.de`)

Beim Domain-Provider von `meandyou.de` müssen nur die Web-Records auf GitHub Pages umgestellt werden:

### A-Records für die Hauptdomain (`meandyou.de` / `@`):
Trage folgende 4 IP-Adressen als `A`-Records ein (GitHub Pages Anycast CDN):
```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### CNAME-Record für die Subdomain (`www.meandyou.de`):
```text
martin741studio.github.io.
```

### ⚠️ WICHTIGER HINWEIS ZU E-MAILS:
* **Bestehende `MX`-, `TXT`- (SPF/DKIM/DMARC) und Mail-Records auf KEINEN Fall anfassen oder löschen!**
* Die Mail-Infrastruktur von Michael Ehlers läuft komplett unberührt über die bestehenden Server weiter.
