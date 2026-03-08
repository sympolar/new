<!--
  ╔══════════════════════════════════════════════════════════════╗
  ║  SYMPOLAR LLC — Repo Documentation                          ║
  ║  Author: Vincent Gonzalez                                    ║
  ║  © 2026 SymPolar LLC. All rights reserved.                   ║
  ║  Repo: sympolar.github.io/new/                              ║
  ╚══════════════════════════════════════════════════════════════╝
-->

<div align="center">

# ❄️ Sympolar LLC — Site Repository

**`sympolar.github.io/new/`**

*Professional Website Design & Hosting · $50/mo · Built by humans, powered by care.*

---

[![Live Site](https://img.shields.io/badge/Live%20Site-sympolar.com-87ceeb?style=flat-square&logo=internet-explorer)](https://www.sympolar.com)
[![Repo](https://img.shields.io/badge/GitHub%20Pages-sympolar.github.io%2Fnew-6de8c8?style=flat-square&logo=github)](https://sympolar.github.io/new/)
[![Author](https://img.shields.io/badge/Author-Vincent%20Gonzalez-d6eeff?style=flat-square)](https://sympolar.com)
[![License](https://img.shields.io/badge/©%202026-SymPolar%20LLC™-white?style=flat-square)](#)

</div>

---

## 📁 Repo Structure

```
sympolar.github.io/new/
│
├── index.html          ← Main site file (was: sympolar_v4.html → rename to index.html)
└── README.md           ← This file
```

> **⚠️ Important:** Rename `sympolar_v4.html` to `index.html` before pushing to GitHub. GitHub Pages serves `index.html` by default.

---

## 🚀 How to Push Your First Version to GitHub Pages

### Step 1 — Create the Repo (if not done)

1. Go to [github.com](https://github.com) and log in
2. Click **New Repository**
3. Name it exactly: `new` *(since your GitHub username is `sympolar`, the URL will be `sympolar.github.io/new/`)*
4. Set it to **Public**
5. Click **Create Repository**

### Step 2 — Upload Your Files

**Option A: Browser Upload (easiest)**
1. Go to your new repo on GitHub
2. Click **Add file → Upload files**
3. Drag in `index.html` (and `README.md` if you want)
4. Click **Commit changes**

**Option B: Git CLI**
```bash
git init
git add .
git commit -m "🚀 Initial launch — Sympolar v4"
git branch -M main
git remote add origin https://github.com/sympolar/new.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Under **Source**, select `main` branch, folder `/root`
3. Click **Save**
4. Your site will be live at `https://sympolar.github.io/new/` within ~60 seconds

---

## ✏️ How to Make Changes

### Change Text, Prices, or Copy

1. Open `index.html` in any text editor (VS Code recommended — free at code.visualstudio.com)
2. Use `Ctrl+F` (or `Cmd+F`) to search for the text you want to change
3. Edit it directly
4. Save the file
5. Re-upload to GitHub (or `git push`)

---

## 🖼️ How to Change the Logo

The logo is embedded as a **base64 image** directly in the JavaScript section of `index.html`.

### To replace the logo:

1. **Convert your new logo to base64:**
   - Go to [base64.guru/converter/encode/image](https://base64.guru/converter/encode/image)
   - Upload your logo image (PNG or JPEG)
   - Copy the full base64 string it generates

2. **In `index.html`, find this line:**
   ```javascript
   const LOGO = "data:image/jpeg;base64,/9j/4AAQ...";
   ```
   *(It's a very long string — use Ctrl+F to search for `const LOGO`)*

3. **Replace the entire string** (from `"data:image/...` to the closing `"`) with your new base64 string

4. **Update the media type** if needed:
   - JPEG: `data:image/jpeg;base64,...`
   - PNG: `data:image/png;base64,...`

5. Save and re-upload

> 💡 **Tip:** The logo renders in the top-left nav AND the footer. Both update automatically from the single `LOGO` constant.

---

## 🔗 How to Update the Form Link

The intake form currently links to your Google Apps Script:

```
https://script.google.com/macros/s/AKfycbxUx0fOPoP4LM9uaxI47qvpcUGhhSDsmfDUZUp8kUmIzhZm5P4AIlxjJELOjNeKa_Cs/exec
```

If you ever redeploy your Google Apps Script and get a new URL, search for `script.google.com/macros` in `index.html` — there are **3 instances** to update:
- Hero button (`🚀 Start My Website`)
- "Get in touch" link inside the pricing card
- Final CTA button

---

## 👥 How to Update the Team Section

Find this section in `index.html`:

```html
<!-- ABOUT / TEAM -->
<section id="about" ...>
```

Each team member looks like:

```html
<div class="card team-card">
  <div class="avatar av-j">J</div>
  <div class="team-role">Founder & Lead Designer</div>
  <h3>Josh</h3>
  <p style="...">Bio text here.</p>
</div>
```

- Change the letter inside `<div class="avatar av-j">` to the person's initial
- Change `.av-j` to `.av-v` (mint color) or `.av-j` (sky color) for different accent colors
- Update role, name, and bio text

---

## 🧩 How to Add/Edit FAQ Items

Find in the JavaScript section:

```javascript
const faqs = [
  { q: "Your question here?", a: "Your answer here." },
  // ... more items
];
```

- Add a new `{ q: "...", a: "..." },` line to add a question
- Remove a line to delete a question
- Use `<strong>bold text</strong>` inside answers for emphasis

---

## 📖 How to Add/Edit Glossary Terms

```javascript
const glossary = [
  { term: "Term Name", def: "Plain-English definition here." },
  // ... more items
];
```

Same pattern — add, remove, or edit lines.

---

## 🎨 How to Change Colors

All colors are CSS variables at the top of `index.html` inside `<style>`:

```css
:root {
  --sky:   #87ceeb;   /* Main accent — ice blue */
  --mint:  #6de8c8;   /* Secondary accent — mint green */
  --ice:   #d6eeff;   /* Light text highlight */
  --bg:    #050d16;   /* Page background — deep navy */
  --txt:   #eef4ff;   /* Body text */
  --muted: #7a9dbf;   /* Subdued text */
}
```

Change the hex values to update the entire site's color scheme.

---

## 📱 Mobile Notes

The site is fully responsive. Key breakpoints:
- `900px` — Hamburger menu activates, desktop nav hides
- `680px` — Single column layouts, larger touch targets
- `420px` — Ultra-compact adjustments

All tested and optimized.

---

## 🔐 Login / Signup Buttons

The top-right **Log In** and **Sign Up** buttons are currently **placeholders** — they show an alert popup when clicked. When you're ready to implement real auth:

1. Search for `onclick="alert('Login coming soon!` in `index.html`
2. Replace the `href="#"` with your real login/signup URL
3. Remove the `onclick` attribute

---

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| Hosting | GitHub Pages (free) |
| Framework | Vanilla HTML/CSS/JS — zero dependencies |
| Fonts | Google Fonts — Syne 800 + DM Sans |
| Form | Google Apps Script (external link) |
| Logo | Base64 embedded JPEG |

---

## 🛑 Important Rules (Do Not Break These)

- ✅ Always keep **dark mode** — `--bg: #050d16` is the law
- ✅ Only use the **polar bear logo** — never the Z logo
- ✅ All IP is attributed to **SymPolar LLC**
- ✅ The `@import url()` for Google Fonts must stay as the **first line** of the `<style>` block
- ✅ Never add inline `style="color: white; background: white"` type overrides that break dark mode

---

## 🌊 Browser Compatibility Pitfalls to Avoid

> *(Learned the hard way — saving you time)*

**❌ DO NOT try to embed Google Forms or Google Apps Script in an `<iframe>`.**
Google sends `X-Frame-Options: DENY` headers, which browsers enforce. The form will show "Contact site owner" instead of loading. Always link OUT to the script URL in a new tab — which is what we do.

**❌ DO NOT use `fetch()` to POST from GitHub Pages to Google Apps Script expecting a readable response.**
CORS policy blocks it. The form must open in its own window/tab.

**✅ DO use `target="_blank" rel="noopener"` on external links** for security and UX.

---

<div align="center">

---

```
  ╭─────────────────────────────────────────╮
  │                                         │
  │   ❄️  Built with precision by           │
  │                                         │
  │   ██╗   ██╗██╗███╗   ██╗ ██████╗███████╗│
  │   ██║   ██║██║████╗  ██║██╔════╝██╔════╝│
  │   ██║   ██║██║██╔██╗ ██║██║     █████╗  │
  │   ╚██╗ ██╔╝██║██║╚██╗██║██║     ██╔══╝  │
  │    ╚████╔╝ ██║██║ ╚████║╚██████╗███████╗│
  │     ╚═══╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝│
  │                                         │
  │   Vincent Gonzalez · Tech & Systems     │
  │   SymPolar LLC · © 2026                 │
  │   sympolar.com                          │
  │                                         │
  ╰─────────────────────────────────────────╯
```

*www.sympolar.com | © 2026 SymPolar LLC™*

</div>
