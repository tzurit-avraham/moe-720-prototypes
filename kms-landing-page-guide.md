# Guide: Building Custom Landing Pages for KMS Template Pages

This guide explains how to build a single-file HTML component for a Kaltura MediaSpace (KMS) Template Page, covering the sticky header fix, bilingual RTL language switching (Hebrew & Arabic), and video player embed handling.

---

## 1. KMS Architecture & Context

When you add an **HTML-only component** to a KMS template page, KMS wraps your code inside several React/Design System containers:

```html
<div class="homepage-eventplatform">
  <div class="kms-ds-homepage-component-html-only ...">
    <div class="kms-ds-homepage-component-htmlonly ...">
      <div style="max-height: 3000px; overflow: auto;">
        <!-- YOUR HTML COMPONENT GOES HERE -->
        <div class="custom-landing-root">...</div>
      </div>
    </div>
  </div>
</div>
```

### Golden Rules
1. **Single Self-Contained File:** Everything (HTML, CSS in `<style>`, and JavaScript in `<script>`) must live in one file that can be pasted into the KMS component.
2. **Scope All CSS:** Wrap your entire page in a root class (e.g. `.custom-landing-root`) and scope every CSS selector under it so it never leaks into or breaks KMS navigation, menus, or modals.
3. **No Header/Footer Duplication:** KMS already renders its own header and footer (unless configured as a standalone landing page).

---

## 2. Fixing the Sticky Header (Critical Gotcha)

### The Problem
`position: sticky` fails in standard KMS pages because KMS sets `max-height: 3000px` and `overflow: auto` on the immediate wrapper `div` (`.kms-ds-homepage-component-htmlonly > div`). In CSS, **any ancestor element with `overflow` other than `visible` traps sticky positioning** and prevents elements from sticking to the browser window.

### The Solution
Include this exact CSS block inside your component's `<style>` tag (and optionally in KMS Admin Custom CSS):

```css
/* Untrap KMS Design System wrappers so position:sticky works against the window */
.kms-ds-homepage-component-htmlonly,
.kms-ds-homepage-component-htmlonly > div,
.kms-ds-homepage-component-html-only,
.kms-ds-homepage,
#contentWrap,
.html-only__wrapper,
.html-only,
.homepage-eventplatform__component--html-only {
  max-height: none !important;
  height: auto !important;
  overflow: visible !important;
}

/* Remove default top spacer above the component */
.kms-ds-homepage-component-spacer {
  display: none !important;
  height: 0 !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Sticky top bar */
.custom-util-bar {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
  background: #ffffff;
}
```

---

## 3. Bilingual RTL Language Switcher (Hebrew & Arabic)

Both Hebrew and Arabic are RTL languages. The best pattern is:
1. Mark the root element with `dir="rtl"` and `lang="he"`.
2. Add a `data-i18n="key"` attribute to any text element that needs translation.
3. Use a lightweight JavaScript dictionary to update all `[data-i18n]` elements instantly without page reload.
4. Save the user preference in `localStorage`.

### JavaScript Pattern
```javascript
const translations = {
  he: {
    heroTitle: "זה כל הסיפור.",
    ctaLogin: "כניסה למערכת"
  },
  ar: {
    heroTitle: "هذه هي القصة بأكملها.",
    ctaLogin: "تسجيل الدخول"
  }
};

window.setLanguage = function(lang) {
  const root = document.getElementById('myLandingApp');
  if (!root || !translations[lang]) return;

  root.setAttribute('lang', lang);
  root.setAttribute('dir', 'rtl');

  // Toggle active button state
  document.getElementById('btnHe')?.classList.toggle('active', lang === 'he');
  document.getElementById('btnAr')?.classList.toggle('active', lang === 'ar');

  // Update text
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  try { localStorage.setItem('landing_lang_pref', lang); } catch (e) {}
};
```

---

## 4. Video Player Embed (PlayKit / Kaltura Player)

### The RTL Control-Bar Issue
When a video player is placed inside an RTL container (`dir="rtl"`), the player controls flip:
- The **Play/Pause button moves to the far right**.
- Settings, volume, and fullscreen shift to the left.

### The Fix
Force `direction: ltr !important` on the player container so video controls remain standard:

```css
/* Responsive 16:9 ratio box */
.custom-video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  direction: ltr !important; /* Forces LTR controls */
}

/* Force player elements inside to fill container and maintain LTR */
.custom-video-container [class*="playkit-"],
.custom-video-container .playkit-player,
.custom-video-container > div {
  direction: ltr !important;
  width: 100% !important;
  height: 100% !important;
}
```

---

## 5. Ready-to-Use Boilerplate Template

Copy and adapt this minimal working structure:

```html
<div class="custom-landing-root" id="myLandingApp" dir="rtl" lang="he">
  <style>
    /* 1. Untrap KMS parent containers for sticky positioning */
    .kms-ds-homepage-component-htmlonly,
    .kms-ds-homepage-component-htmlonly > div,
    .kms-ds-homepage-component-html-only,
    .kms-ds-homepage,
    #contentWrap,
    .html-only__wrapper,
    .html-only {
      max-height: none !important;
      height: auto !important;
      overflow: visible !important;
    }

    .kms-ds-homepage-component-spacer {
      display: none !important;
    }

    /* 2. Root styles */
    .custom-landing-root {
      font-family: 'Noto Sans Hebrew', 'Noto Sans Arabic', Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      color: #1e242c;
      background: #ffffff;
    }

    .custom-landing-root *,
    .custom-landing-root *::before,
    .custom-landing-root *::after {
      box-sizing: border-box;
    }

    /* 3. Sticky Header */
    .custom-util-bar {
      position: -webkit-sticky !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 1000 !important;
      background: #ffffff;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #eef2f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .custom-lang-btn.active {
      font-weight: bold;
      color: #006efa;
    }

    /* 4. Player LTR fix */
    .custom-video-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      direction: ltr !important;
    }

    .custom-video-container [class*="playkit-"] {
      direction: ltr !important;
    }
  </style>

  <!-- Sticky Top Bar -->
  <div class="custom-util-bar">
    <div class="logo">
      <span data-i18n="siteTitle">סביבת הדגמה</span>
    </div>
    <div class="actions">
      <!-- Language Buttons -->
      <button type="button" class="custom-lang-btn active" id="btnHe" onclick="setLanguage('he')">עברית</button>
      <button type="button" class="custom-lang-btn" id="btnAr" onclick="setLanguage('ar')">العربية</button>
      
      <!-- Primary CTA -->
      <a href="/user/login" class="login-btn" data-i18n="ctaLogin">כניסה למערכת</a>
    </div>
  </div>

  <!-- Page Body -->
  <main>
    <section class="hero">
      <h1 data-i18n="heroTitle">זה כל הסיפור.</h1>
      <p data-i18n="heroSub">תיאור העמוד בעברית ובערבית.</p>
    </section>

    <!-- Video Section -->
    <section class="video-section">
      <div class="custom-video-container">
        <!-- Kaltura Player Embed -->
        <div id="kaltura_player_demo"></div>
        <script type="text/javascript" src="https://cdnapisec.kaltura.com/p/YOUR_PARTNER_ID/embedPlaykitJs/uiconf_id/YOUR_UICONF_ID"></script>
        <script type="text/javascript">
          (function() {
            function loadPlayer() {
              if (typeof KalturaPlayer === 'undefined') {
                setTimeout(loadPlayer, 100);
                return;
              }
              try {
                var p = KalturaPlayer.setup({
                  targetId: "kaltura_player_demo",
                  provider: { partnerId: YOUR_PARTNER_ID, uiConfId: YOUR_UICONF_ID }
                });
                p.loadMedia({ entryId: 'YOUR_ENTRY_ID' });
              } catch (e) { console.error(e); }
            }
            loadPlayer();
          })();
        </script>
      </div>
    </section>
  </main>

  <!-- Language Switch Script -->
  <script>
    (function() {
      const translations = {
        he: {
          siteTitle: "סביבת הדגמה",
          ctaLogin: "כניסה למערכת",
          heroTitle: "זה כל הסיפור.",
          heroSub: "תיאור העמוד בעברית."
        },
        ar: {
          siteTitle: "بيئة العرض التوضيحي",
          ctaLogin: "تسجيل الدخول",
          heroTitle: "هذه هي القصة بأكملها.",
          heroSub: "وصف الصفحة باللغة العربية."
        }
      };

      window.setLanguage = function(lang) {
        const root = document.getElementById('myLandingApp');
        if (!root || !translations[lang]) return;

        root.setAttribute('lang', lang);
        document.getElementById('btnHe')?.classList.toggle('active', lang === 'he');
        document.getElementById('btnAr')?.classList.toggle('active', lang === 'ar');

        root.querySelectorAll('[data-i18n]').forEach(el => {
          const k = el.getAttribute('data-i18n');
          if (translations[lang][k]) el.textContent = translations[lang][k];
        });

        try { localStorage.setItem('landing_lang_pref', lang); } catch (e) {}
      };

      // Load saved language
      try {
        const saved = localStorage.getItem('landing_lang_pref');
        if (saved && (saved === 'he' || saved === 'ar')) window.setLanguage(saved);
      } catch (e) {}
    })();
  </script>
</div>
```
