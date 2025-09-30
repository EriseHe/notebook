# Styling Guide for Quarto Site

This guide shows you where to modify different parts of your site's appearance.

## 📁 File Locations

### Main Styling Files
- **`styles.css`** - Main stylesheet for all visual customizations
- **`scripts/site-behavior.html`** - JavaScript for interactive behaviors (included in pages)
- **`scripts/site-behavior.js`** - Standalone JS file (same functionality)

## 🎨 Where to Customize Different Elements

### 1. **Top Navigation Bar (Navbar)**
**File:** `styles.css`  
**Section:** Lines 69-100 (marked with comment `NAVBAR STYLING`)

```css
.navbar { 
  background: rgba(255, 255, 255, 0.95); /* Change navbar background */
  backdrop-filter: blur(10px);            /* Blur effect */
  transition: opacity 0.3s ease;          /* Fade speed */
}
```

**Customize:**
- Background color/transparency
- Border styling
- Fade animation speed (change `0.3s` to your preference)
- Scroll behavior threshold in `site-behavior.html` (line 91: `currentScroll <= 50`)

---

### 2. **Table of Contents (TOC)** - Right Sidebar
**File:** `styles.css`  
**Section:** Lines 170-200 (marked with comment `TABLE OF CONTENTS (TOC) STYLING`)

```css
.quarto-margin-sidebar { 
  top: 5rem;                    /* Distance from top */
  margin-right: 1rem;           /* Distance from edge */
  padding-left: 1rem;           /* Internal padding */
}
```

**Customize:**
- Position and spacing
- Link colors (`.toc-actions a`, `nav a`)
- Active link styling (`nav a.active`)
- Font size and weight

---

### 3. **Left Sidebar (Menu/Navigation)**
**File:** `styles.css`  
**Section:** Lines 29-54 and 202-213 (marked with comment `LEFT SIDEBAR (MENU) STYLING`)

```css
.sidebar { 
  padding-left: 0.75rem;        /* Left padding */
  background: transparent;       /* Background color */
}

.sidebar .nav-link {
  border-radius: 8px;           /* Rounded corners */
  padding: 0.5rem 0.75rem;      /* Link padding */
}
```

**Customize:**
- Link styling and hover effects
- Background colors
- Spacing and padding
- Active state styling

---

### 4. **Main Content Area**
**File:** `styles.css`  
**Section:** Lines 58 and 147-151

```css
main.content { 
  padding: 2rem 2rem;           /* Content padding */
}

.page-columns { 
  max-width: var(--page-max-width);  /* Maximum width */
}
```

---

### 5. **Colors and Fonts**
**File:** `styles.css`  
**Section:** Lines 2-10 (CSS Variables)

```css
:root {
  --page-max-width: 1280px;
  --heading-font: "IBM Plex Serif", "Times New Roman", "PingFang SC", serif;
  --body-font: "SF Pro", "PingFang SC", "Noto Serif", serif;
  --code-font: "JetBrains Mono", "Roboto Mono", monospace;
}
```

**Customize all colors and fonts site-wide here!**

---

### 6. **Code Blocks**
**File:** `styles.css`  
**Section:** Lines 93-103

```css
pre {
  background: #f1f3f5;          /* Background color */
  border-radius: 10px;          /* Rounded corners */
  padding: 1rem;                /* Internal padding */
}
```

---

### 7. **Links**
**File:** `styles.css`  
**Section:** Lines 113-119

```css
a {
  color: #276fb4;               /* Default link color */
}

a:hover {
  color: #1b4f82;               /* Hover color */
}
```

---

## 🔧 Navbar Transparency Behavior

The navbar (including ALL text, icons, and background) becomes **completely invisible** when scrolling down and **fully visible** when scrolling up or at the top.

**Key Features:**
- Navbar stays fixed in position (no layout shifts)
- Menu and TOC stay in place regardless of navbar state
- Everything fades: background, text, icons, search bar

**To adjust the behavior:**

**File:** `scripts/site-behavior.html` or `scripts/site-behavior.js`  
**Function:** `setupNavbarTransparency()` (lines 62-82)

```javascript
// Change when navbar becomes transparent
if (currentScroll <= 50 || currentScroll < lastScroll) {
  // 50 = pixels from top before transparency can activate
}
```

**To change fade speed:**  
Edit `styles.css` line 81:
```css
transition: opacity 0.3s ease;  /* Change 0.3s for faster/slower fade */
```

**To change opacity level (partial transparency):**  
Edit `styles.css` line 86:
```css
opacity: 0;  /* 0 = invisible, 0.5 = half visible, 1 = fully visible */
```

---

## 📝 Quick Tips

1. **After editing `styles.css`:** The Quarto preview server will auto-reload
2. **After editing JS files:** You may need to hard refresh (Cmd+Shift+R on Mac)
3. **Color scheme:** All main colors are in the `:root` section for easy theming
4. **Responsive design:** Check `@media` queries at the bottom of `styles.css`

---

## 🎯 Common Customizations

### Make navbar always opaque (disable transparency):
In `scripts/site-behavior.html`, comment out line 91:
```javascript
// setupNavbarTransparency();  // Comment this out
```

### Change TOC position:
In `styles.css`, adjust:
```css
.quarto-margin-sidebar { 
  top: 3rem;  /* Closer to top */
}
```

### Make sidebar wider:
In `_quarto.yml`, you can adjust the page layout settings.

---

**Happy customizing! 🎨**
