# Styleguide: D.E.A.R. Projekt

Dieses Dokument dokumentiert das vollständige Design-System des D.E.A.R.-Webauftritts ("Drop Everything And Read"). Es dient als Referenz für die M293-Dokumentation und basiert auf der tatsächlichen Implementierung in [docs/Code/style.css](Code/style.css) sowie [docs/Code/login/signup/style.css](Code/login/signup/style.css).

Die gesamte Gestaltung folgt einem modernen, ruhigen Stil mit Indigo-Akzenten, weichen Schatten, abgerundeten Ecken und einem dezenten **Glassmorphism**-Effekt für schwebende Elemente (Header, Auth-Karten, Float-Cards).

---

## 1. Farbpalette

Alle Farben sind in der Datei [style.css](Code/style.css#L4-L20) als globale CSS-Variablen im `:root` definiert. So lassen sie sich konsistent über alle Seiten hinweg verwenden und bei Bedarf zentral anpassen.

### 1.1 Markenfarben (Primary / Secondary)

| Variable | Hex | RGB | Verwendung |
|---|---|---|---|
| `--primary` | `#4f46e5` | `rgb(79, 70, 229)` | Hauptfarbe (Indigo). Buttons (`.btn-primary`), aktive Navigation (`.nav-active`), Akzent-Icons, Fokus-Ringe in Formularen, Audio-Player-Border, Filter-Badges. |
| `--secondary` | `#f43f5e` | `rgb(244, 63, 94)` | Sekundärfarbe (Koralle). Wird für Highlight-Badges (`.badge`), die Gradient-Text-Überschrift, animierte Hero-Blobs (`.blob-2`) und Bookmark-Remove-Hover eingesetzt. |

Die beiden Farben werden zudem als **Gradient** kombiniert (`linear-gradient(135deg, var(--primary), var(--secondary))`) – z. B. für `.gradient-text`, die `.cta-box` und Toast-Notifications vom Typ `info`.

### 1.2 Neutrale Hintergrund- und Textfarben

| Variable | Hex | RGB | Verwendung |
|---|---|---|---|
| `--bg-light` | `#f8fafc` | `rgb(248, 250, 252)` | Standard-Seitenhintergrund (`body`), Tags, Filter, Input-Backgrounds. |
| `--bg-white` | `#ffffff` | `rgb(255, 255, 255)` | Kartenflächen (Bento-, Episode-, Book-Cards, Dashboard-Sektionen, Footer). |
| `--text-dark` | `#0f172a` | `rgb(15, 23, 42)` | Haupttext, Überschriften, Hintergrund von dunklen Sektionen wie `.bento-wide` und `.about-facts`. |
| `--text-muted` | `#64748b` | `rgb(100, 116, 139)` | Sekundärtext, Subtitles, Beschreibungstexte, inaktive Nav-Links, Form-Hints. |
| `--border-light` | `rgba(15, 23, 42, 0.08)` | `rgba(15, 23, 42, 0.08)` | Dezente Trennlinien und Card-Borders. Bewusst halbtransparent, um sich harmonisch in beliebige Hintergründe einzufügen. |

### 1.3 Status- und Akzentfarben (außerhalb der Variablen)

Diese Farben werden punktuell direkt im CSS verwendet, ohne `:root`-Variable, da sie semantischen Zustandsfarben entsprechen.

| Zweck | Farbe(n) | Verwendung |
|---|---|---|
| Erfolg | `#059669` → `#10b981` | Toast `success`, Status-Badge `published`. |
| Fehler / Logout | `#dc2626` → `#ef4444` | Toast `error`, Logout-Button. |
| Warnung / Draft | `#d97706` auf `rgba(245, 158, 11, 0.1)` | Status-Badge `draft`. |
| Sterne (Reviews) | `#fbbf24` | Bewertungssterne in Testimonials, Featured-Badge. |
| Featured-Badge-Text | `#78350f` | Dunkles Braun für Lesbarkeit auf gelbem Badge. |
| Hero-Blob 3 | `#c084fc` (Lila) | Dritter, lila Animations-Blob im Hero. |
| Button-Primary Hover | `#4338ca` | Dunklere Indigo-Variante als Hover-Zustand. |
| Placeholder | `#94a3b8` | Input-Placeholder in Auth-Formularen. |

### 1.4 Schatten-System

Schatten sind ebenfalls als CSS-Variablen vordefiniert und sollen ein einheitliches "Tiefen-System" erzwingen:

| Variable | Wert | Einsatz |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Cards im Ruhezustand, Filter-Bar, Header (scrolled). |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)` | Hover-Zustand von Bento- und Vision-Cards. |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)` | Float-Cards im Hero, Hover von Episode-Cards. |
| `--shadow-glow` | `0 10px 25px rgba(79, 70, 229, 0.25)` | Markanter, farbiger Glow um den Primary-Button – stärkt die Marke. |

---

## 2. Typografie

Beide Fonts werden über **Google Fonts** eingebunden (siehe `<head>` in jeder HTML-Datei, z. B. [index.html:9](Code/index.html#L9)):

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

Die Zuweisung erfolgt über zwei CSS-Variablen, sodass alle Komponenten konsistent dieselbe Schriftrolle ansprechen:

```css
--font-heading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;
```

### 2.1 Poppins – Überschriften

`Poppins` ist eine geometrische Sans-Serif mit kräftigem Charakter und wird für **alle Headlines** verwendet (`h1`–`h4`), zusätzlich für Footer-Spaltentitel, Bento-Quotes und große Zahlen (`.fact-num`).

| Einsatz | Größe | Weight | Letter-Spacing |
|---|---|---|---|
| Hero-Headline (`.hero-headline`) | `4.5rem` (Mobile: `2.5rem` / `2rem`) | `800` (über `h1`-Default in `.section-title`) | `-2px` |
| Page-Hero-Titel (`.page-hero-content h1`) | `3.5rem` (Mobile: `2.2rem` / `1.8rem`) | `800` | `-1.5px` |
| Section-Titel (`.section-title`) | `2.5rem` (Mobile: `2rem` / `1.6rem`) | `800` | `-0.5px` |
| CTA-Headline (`.cta-content h2`) | `2.5rem` (Mobile: `2rem`) | `800` | – |
| Card-Titel (Bento, Vision, Book) | `1.3` – `1.5rem` | Default `h3` (Poppins) | – |
| Auth-Headline (`.auth-form-box h3`) | `1.6rem` | `800` | – |
| Bento-Quote / Author | `1.5rem`, kursiv | – | – |

`line-height` für Headlines ist global auf `1.2` gesetzt – kompakt für eine kraftvolle Wirkung.

### 2.2 Inter – Fließtext und UI

`Inter` ist die Standard-Schrift für **Body, Buttons, Inputs, Navigation, Tags und sämtliche UI-Texte**. Sie wird als `var(--font-body)` direkt am `body` gesetzt und damit überall vererbt.

| Einsatz | Größe | Weight |
|---|---|---|
| Standard-Body | `1rem` (16 px), `line-height: 1.6` | `400` (Regular) |
| Hero-Sub / Lead-Text | `1.15` – `1.25rem` | `400` – `500` |
| Sektions-Sub (`.section-sub`) | `1.15rem` | `400` |
| Button-Text (`.btn`) | `0.9` – `1.05rem` | `600` |
| Section-Label (Eyebrow) | `0.85rem`, `text-transform: uppercase`, `letter-spacing: 1.5px` | `700` |
| Hero-Badge | `0.85rem` | `600` |
| Stat-Zahlen (`.stat-num`) | `1.5rem` | `800` |
| Meta-Labels (`.meta-label`) | `0.75rem`, uppercase, `letter-spacing: 1px` | `600` |
| Footer-Bottom / Hints | `0.8` – `0.85rem` | `400` – `500` |

### 2.3 Spezial-Typografie

* **Gradient-Text** (`.gradient-text`): Headline-Wörter werden mittels `background: linear-gradient(135deg, var(--primary), var(--secondary))` und `-webkit-background-clip: text` mit Farbverlauf gefüllt. Ein zentrales Branding-Element auf der Hero-Section.
* **Section-Label / Meta-Label**: Kleine Eyebrow-Texte in `uppercase` mit weiter Sperrung (`letter-spacing: 1` – `1.5px`) – modernes Editorial-Feeling.
* **Bento-Quote**: Italic Poppins, ungewöhnlich für Body-Text, signalisiert Zitatcharakter.

---

## 3. UI-Elemente

### 3.1 Buttons

Die Basis-Button-Klasse `.btn` definiert ein konsistentes Layout mit Flexbox, abgerundeten Ecken und einer **smooth Cubic-Bezier-Transition**:

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: 12px; font-weight: 600; text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer; border: none; font-family: inherit;
}
```

**Größenvarianten:**

| Klasse | Padding | Font-Size |
|---|---|---|
| `.btn-sm` | `8px 16px` | `0.9rem` |
| `.btn-lg` | `14px 28px` | `1.05rem` |

**Style-Varianten und Hover:**

| Klasse | Default | Hover-Effekt |
|---|---|---|
| `.btn-primary` | Indigo (`--primary`) BG, weißer Text, `--shadow-glow` | `translateY(-2px)` + verstärkter Glow `0 15px 35px rgba(79, 70, 229, 0.35)` |
| `.btn-ghost` | Transparent, dunkler Text | Text wird Indigo, `translateX(4px)` (subtile Pfeil-Geste) |
| `.btn-white` | Weiß, Indigo Text | `translateY(-2px)` + neutraler Schatten |
| `.btn-ghost-white` | `rgba(255,255,255,0.1)` BG, weißer Text, weiße semi-transparente Border | BG wird zu `rgba(255,255,255,0.2)` |
| `.btn-text` | Indigo, ohne Hintergrund | `text-decoration: underline` |
| `.btn-bookmark` | `--bg-light`, dunkler Text, Border `--border-light` | Border + Text werden Indigo. Aktiv (`.bookmarked`): voll Indigo. |
| `.filter-btn` | Transparent, gerundete Pille (`border-radius: 50px`) | Indigo Border + Text. Aktiv: Indigo BG + weißer Text. |
| `.btn-logout` | Roter Gradient `#dc2626 → #ef4444` | `translateY(-2px)` + roter Schatten |

**Zentrale Hover-Mechanik:** Fast alle Buttons nutzen ein dezentes `translateY(-2px)` plus einen **stärker werdenden farbigen Schatten** als Lift-Effekt. Dieser Mechanismus zieht sich auch durch Cards (Bento, Episode, Vision, Book), wodurch die UI haptisch und konsistent wirkt.

### 3.2 Formular-Inputs

**Standard-Inputs auf Unterseiten** (z. B. Kontakt-Formular in [about.html](Code/about.html)):

```css
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--border-light);
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s;
  background: var(--bg-light);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
}
```

* **Default**: hellgrauer BG (`--bg-light`), kaum sichtbarer Border.
* **Focus**: Hintergrund wechselt auf reines Weiß, Border wird Indigo. Kein systemeigener Outline-Ring.
* **Select-Felder**: bekommen über `appearance: none` und ein inline-SVG einen eigenen, dezenten Pfeil in `--text-muted`.
* **Labels** sind `font-weight: 600`, `0.95rem`, mit `8px` Abstand.

**Premium-Inputs auf Auth-Seiten** (Login / Signup, [login/signup/style.css](Code/login/signup/style.css#L78-L99)):

```css
.auth-form-box input {
  width: 100%;
  padding: 14px 14px 14px 48px;       /* extra Platz links für Icon */
  border: 1px solid var(--border-light);
  border-radius: 14px;
  background: rgba(248, 250, 252, 0.8); /* halbtransparent → Glassmorphism */
  transition: all 0.3s ease;
}

.auth-form-box input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);  /* weicher Indigo-Ring */
}
```

Hier wird zusätzlich ein **diffuser Indigo-Glow** als Focus-Ring genutzt – ein wichtiges Accessibility-Feature, das den Fokus klar sichtbar macht, ohne hart zu wirken. Inputs mit Icons (`.input-group` + `.input-icon`) reservieren `48px` linkes Padding.

### 3.3 Cards (Bento, Episode, Book, Vision, Dashboard)

Alle Card-Typen folgen demselben Grundprinzip:

```css
background: var(--bg-white);
border-radius: 16px – 24px;
padding: 24px – 40px;
box-shadow: var(--shadow-sm);
border: 1px solid var(--border-light);
transition: all 0.3s;
```

Beim Hover werden sie um **`translateY(-5px)` bis `-8px`** angehoben und der Schatten wird auf `--shadow-md` bzw. `--shadow-lg` aufgewertet. Book-Cards bekommen zusätzlich einen leicht eingefärbten Border (`rgba(79, 70, 229, 0.3)`).

### 3.4 Tags / Badges / Pills

* **`.section-label`** und **`.meta-label`**: Uppercase-Eyebrows, klein und gesperrt.
* **`.bento-tag`** / **`.podcast-status`**: Pill-förmig (`border-radius: 8 – 50px`), kleiner Font (`0.75 – 0.8rem`), `font-weight: 600 – 700`.
* **`.hero-badge`**: Pill mit transparentem Indigo-Tint (`rgba(79, 70, 229, 0.1)`) + animiertem `.badge-dot`.
* **`.episode-genre-tag`** / **`.card-badge`**: Auf Bildbereichen liegende Glas-Pills mit `rgba(255,255,255,0.2)` + `backdrop-filter: blur(4px)`.

### 3.5 Animationen

* **Fade-Up** (`.fade-up` → `.visible`): Inhalte gleiten beim Scrollen um `30px` nach oben ein. Cubic-Bezier `(0.16, 1, 0.3, 1)` (sanfter Ease-Out). Verzögerungen `delay-1` … `delay-4` (jeweils +0.1 s).
* **Blob-Animation** (`@keyframes blobFloat`): Hero-Blobs schweben in 10 s langsam, alternierend.
* **Toast-Animationen** (`toastIn`, `toastOut`, `toastProgress`): Slide+Scale-In, sanftes Out, animierte Progress-Bar (3.5 s linear).

---

## 4. Glassmorphism-Design

Glassmorphism ist das visuelle Leitmotiv für **alle schwebenden Elemente** der Site – Header, Auth-Karten, Hero-Float-Cards und glasartige Pills. Das Rezept besteht immer aus denselben vier Zutaten:

1. **Halbtransparenter weißer Hintergrund** (variierend zwischen 60 % – 90 % Deckkraft).
2. **`backdrop-filter: blur(...)`** in unterschiedlichen Stärken (4 – 24 px).
3. **Semi-transparenter heller Border** (`rgba(255, 255, 255, 0.3 – 0.6)`), der die Glaskante andeutet.
4. **Sehr weiche, große Box-Shadow**, oft mehrfach gestapelt.

### 4.1 Sticky Header (`.site-header.scrolled` & `.glass`)

Datei: [style.css:87-92](Code/style.css#L87-L92) und [login/signup/style.css:9-14](Code/login/signup/style.css#L9-L14).

```css
.site-header.scrolled {
  padding: 12px 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-sm);
}
```

Auf Auth-Seiten wird dies leicht abgewandelt (`rgba(255,255,255,0.6)`, gleicher Blur), da dort die animierten Hintergrund-Blobs durchscheinen sollen.

### 4.2 Auth-Karte (Login / Signup)

Das wohl klarste Glassmorphism-Beispiel der Site:

```css
.auth-card {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 48px 40px;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08),
              0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.6);
}
```

* **Transparenz:** 82 % Weiß – stark genug für Lesbarkeit, transparent genug für den Tiefeneffekt vor den animierten Blobs.
* **Blur:** `24px` – maximaler Wert in der Site, signalisiert das Hauptelement der Seite.
* **Border-Radius:** `28px` – sehr großzügig, betont den softness.
* **Doppelter Schatten:** großer, weicher Abdruck (`0 20px 60px`) plus dezenter Kontaktschatten (`0 1px 3px`) – simuliert ein schwebendes Glasplättchen.

### 4.3 Hero Float-Cards (`.float-card`)

```css
.float-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transform: rotate(2deg);   /* leichte Rotation für Verspieltheit */
}
```

Die zweite Karte erhält `transform: rotate(-3deg) translateX(-40px)` – die schräge Anordnung verleiht dem Hero einen dynamischen, magazinartigen Look.

### 4.4 Glas-Pills auf Medien (`.episode-genre-tag`, `.card-badge`)

```css
background: rgba(255, 255, 255, 0.2);
backdrop-filter: blur(4px);
color: white;
padding: 4px 12px;
border-radius: 50px;
```

Diese Mini-Variante des Effekts wird über farbigen Cover-Hintergründen (`var(--cover-color)`) eingesetzt und bleibt auch auf bunten Bildern lesbar.

### 4.5 Border-Radien im Überblick

Eine konsistente Radius-Skala unterstützt den weichen Glas-Look:

| Wert | Verwendung |
|---|---|
| `8 – 10px` | Kleine Tags, Audio-Player, Standard-Inputs. |
| `12 – 14px` | Buttons, Settings-Items, Auth-Inputs. |
| `16px` | Float-Cards, Filter-Bar, Toasts, Vision-Icons-Wrapper. |
| `20 – 24px` | Episode-Cards, Bento-Cards, Dashboard-Sektionen. |
| `28 – 32px` | Auth-Card, große CTA-Boxen – Premium-Surfaces. |
| `50px` / `50%` | Pills (Badges, Filter-Buttons) und runde Avatare. |

### 4.6 Hintergrund-Blobs (Tiefe für Glassmorphism)

Damit der Blur-Effekt wirken kann, braucht die Seite **farbige, weiche Flächen** im Hintergrund. Diese werden durch animierte Blobs erzeugt:

```css
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: blobFloat 10s infinite alternate ease-in-out;
}
.blob-1 { background: var(--primary);   /* Indigo */ }
.blob-2 { background: var(--secondary); /* Koralle */ }
.blob-3 { background: #c084fc;          /* Lila    */ }
```

Drei Blobs in den Markenfarben + einem Lila-Akzent erzeugen einen subtilen, lebendigen Farbverlauf hinter Header und Auth-Karte – das ist die Tiefenebene, die den Glaseffekt erst sichtbar macht.

---

## 5. Layout-System

Zur Orientierung im Layout-System (nicht primär im Auftrag, aber für Vollständigkeit der M293-Doku nützlich):

* **Container:** `max-width: 1200px`, `padding: 0 24px` (Mobile: `0 16px`).
* **Section-Padding:** `100px 0` (Mobile: `60px 0`).
* **Grids:** Bento, Episode, Testimonials je `repeat(3, 1fr)`. Tablet → `1fr 1fr`. Mobile → `1fr`.
* **Breakpoints:** `1024px` (Tablet), `768px` (Mobile), `480px` (Small Mobile).

---

*Stand: Mai 2026 – synchron mit der aktuellen Implementierung im Ordner [docs/Code/](Code/).*
