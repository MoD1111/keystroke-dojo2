# Keystroke Dojo

A typing trainer that runs in the browser and installs as an app. No build step, no dependencies, works offline.

- **index.html**: main version
- **kids.html**: version for ages 10+, with kid-friendly words, gentler targets, sounds and confetti

## Features

- **Lessons**: 19 lessons from the home row to umlauts, capitals, punctuation and numbers. Stars per lesson and belt ranks from white to black.
- **Sprint**: 30-second, 60-second or 2-minute speed tests. Personal bests count only at the target accuracy.
- **Word Rain**: falling-word game with combos, levels and three lives.
- **Progress**: speed and accuracy charts, practice minutes against a daily goal, an error heatmap of your keyboard, a ranked list of weak keys with a generated drill, and a daily streak.
- **German (QWERTZ) and English (QWERTY) keyboards**, detected automatically. Word lists in English or German.
- **Light and dark theme**, following the system setting unless you choose one.

## Publish on GitHub Pages

1. Create a repository, for example `keystroke-dojo`, and upload all files in this folder, including `.nojekyll` and the `icons` folder.
2. In the repository, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. After a minute or two the site is live at `https://<your-username>.github.io/keystroke-dojo/`. The kids version is at `…/keystroke-dojo/kids.html`.

## Install as an app

- **Chrome or Edge (desktop and Android)**: open the page and choose **Install app** in the browser menu, or click the install icon in the address bar.
- **iPhone and iPad**: open the page in Safari, tap **Share**, then **Add to Home Screen**.

Each version can be installed separately.

## Updating

After changing any file, open `service-worker.js` and raise `VERSION` (for example from `'v2'` to `'v3'`). Installed copies then fetch the new files on the next visit.

## Where progress is stored

Progress is saved in the browser on each device. The main and kids versions use separate storage, so they never overwrite each other. Progress does not sync between devices. **Progress → Erase all progress** clears it.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main app: markup, word lists and logic |
| `kids.html` | Kids app: same engine with kids' words, targets, sounds and confetti |
| `style.css` | Shared styles, light and dark theme |
| `manifest.json`, `manifest-kids.json` | App names and icons for installation |
| `service-worker.js` | Offline support |
| `icons/` | App icons (standard and maskable) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
