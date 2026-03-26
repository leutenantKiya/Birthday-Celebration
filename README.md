# 🎂 Birthday Website

Hey! So you want to make someone's birthday a little more special — and you ended up here. Good choice.

This is a birthday website you can personalize and share with anyone, anywhere in the world. It's got animations, a live countdown since the day they were born, a spinning prize wheel (traktir makan atau beliin barang — let fate decide 😄), a gift box interaction, and a heartfelt letter section. It looks fancy, but honestly it's not that hard to run. Follow along and you'll be fine.

---

## Before You Start — You'll Need These

- **Node.js** (v16 or higher) — if you don't have it yet, grab it from [https://nodejs.org](https://nodejs.org). Just download and install, it's straightforward.
- A **text editor** — VS Code is great if you don't have one: [https://code.visualstudio.com](https://code.visualstudio.com)
- A **terminal** — Command Prompt or PowerShell on Windows, Terminal on Mac/Linux. Don't worry, we're only using a few simple commands.

---

## Step 1 — Get the Files in Order

Make sure your project folder looks like this:

```
habede/
├── public/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

The important thing here is that `index.html` must be inside the `public` folder, not sitting loose next to `server.js`. If it's in the wrong place, the server won't find it and you'll get an error.

**If you're on Windows and the folder doesn't exist yet:**
```
mkdir public
move index.html public\index.html
```

**If you're on Linux or Mac:**
```bash
mkdir public
mv index.html public/index.html
```

---

## Step 2 — Make It Personal

Open `public/index.html` in your text editor and scroll almost to the bottom. You'll find a block that looks like this:

```js
const CONFIG = {
  name: "Your Name",            // 👈 Put their name here
  birthdate: "2000-01-01",      // 👈 Their birthday in YYYY-MM-DD format
  message: null,                // 👈 Write a personal message, or leave as null to use the default
  signature: "— With love 💛",  // 👈 How you want to sign it
};
```

Change those four things and save the file. That's genuinely all you need to do to personalize it. The whole website updates from just that one block.

If you want to change the spinning wheel prizes (by default it's stuff like "Traktir Makan Mewah" or "Beliin Sepatu"), search for `const SEGMENTS` in the same file and edit the entries there.

---

## Step 3 — Install and Run

Open your terminal, navigate to the project folder, and run these two commands:

```bash
npm install
```

This downloads the one dependency the server needs (Express). You only have to do this once.

```bash
npm start
```

If everything went well, you'll see:

```
🎂  Birthday website running!
👉  Open: http://localhost:3000
```

Open your browser and go to `http://localhost:3000`. That's your birthday website, running live on your own computer.

> ⚠️ **Keep this terminal open.** The moment you close it, the server stops. That's normal — just come back and run `npm start` again when you need it.

---

## Step 4 — Share It With the World (Tunneling)

Right now the website only works on your own computer. To share it with the birthday person (or anyone else), you need tunneling — it's basically a bridge that gives your localhost a real public URL.

You need **two terminals open at the same time**: one running your server (`npm start`), and one running the tunnel. Don't close either one.

---

### Option A — localtunnel (Simplest, no account needed)

This is the easiest one. Since you already have Node.js, just run:

```bash
npm install -g localtunnel
```

Then in a second terminal:

```bash
lt --port 3000 --subdomain my-birthday-site
```

You'll get a URL like `https://my-birthday-site.loca.lt`. Share that link and done!

> 📝 If someone opens the link and sees a warning page asking them to confirm they're human, they just need to click "Click to Continue". That's normal for localtunnel.

> 📝 You can change `my-birthday-site` to anything you want — just keep it lowercase with no spaces.

---

### Option B — Cloudflare Tunnel (Very reliable, no account needed, but URL is random)

**Windows:**
1. Go to [https://github.com/cloudflare/cloudflared/releases/latest](https://github.com/cloudflare/cloudflared/releases/latest)
2. Download `cloudflared-windows-amd64.exe`
3. Rename it to `cloudflared.exe` and put it in your project folder
4. Open a second terminal in that same folder and run:
```bash
cloudflared.exe tunnel --url http://localhost:3000
```

**Linux:**
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
cloudflared tunnel --url http://localhost:3000
```

**Mac:**
```bash
brew install cloudflare/cloudflare/cloudflared
cloudflared tunnel --url http://localhost:3000
```

After a few seconds you'll see a line like:
```
https://random-words-something.trycloudflare.com
```

That's your public URL. The downside is the URL changes every time you restart cloudflared, and you can't pick your own name. But it's free, needs no account, and is very stable connection-wise.

> ⚠️ Common mistake on Windows: people run cloudflared BEFORE starting the server. Always do `npm start` first, then run cloudflared in a separate terminal. If cloudflared is running but the server isn't, you'll get a "Bad Gateway" error when visiting the URL.

---

### Option C — ngrok (Free with account, cleaner URL)

1. Sign up for a free account at [https://ngrok.com](https://ngrok.com)
2. Download ngrok for your OS from the dashboard
3. Copy your auth token from the ngrok dashboard and run:

```bash
# Windows
ngrok.exe config add-authtoken YOUR_TOKEN_HERE

# Linux / Mac
ngrok config add-authtoken YOUR_TOKEN_HERE
```

4. Then with your server running, open a second terminal:

```bash
# Windows
ngrok.exe http 3000

# Linux / Mac
ngrok http 3000
```

You'll get something like `https://abc123.ngrok-free.app`. With a free account you can also request a fixed subdomain so the URL doesn't change every time.

---

## Common Problems & Fixes

**"Cannot find module 'express'"**
You forgot to run `npm install`. Do that first.

**"ENOENT: no such file or directory, stat '...\public\index.html'"**
Your `index.html` is not inside the `public` folder. Move it there (see Step 1).

**"Port 3000 is already in use"**
Something else is using port 3000. Either close whatever that is, or change the port by running:
```bash
# Windows
set PORT=3001 && npm start

# Linux / Mac
PORT=3001 npm start
```
Then update your tunnel command to use `3001` instead of `3000`.

**Cloudflare tunnel says "Bad Gateway"**
Your server isn't running. Open a new terminal, go to the project folder, and run `npm start`. Keep both terminals open.

**The website looks broken / fonts not loading**
You need an internet connection for the Google Fonts to load. The website itself runs locally but fonts are fetched from the web.

---

## What's Actually in This Project

| File | What it does |
|---|---|
| `public/index.html` | The entire website — HTML, CSS, and JavaScript all in one file |
| `server.js` | A tiny Express server that serves the HTML file |
| `package.json` | Tells Node.js what packages to install |

That's it. There's no database, no complex build process, no framework to learn. It's intentionally kept simple so anyone can pick it up and run with it.

---

## Features

- ✨ Floating gold particles in the background
- ⏱️ Live counter showing exactly how long the person has been alive (down to the second)
- 🎂 Clickable cake that blows out candles and launches confetti
- 🎁 Gift box that shakes, cracks open, and launches a spinning prize wheel
- 🎡 Spinning wheel with customizable prizes (food treats vs buying stuff)
- 💌 Personal letter section with longevity, prosperity & health wishes
- 📜 Scroll-triggered animations throughout
- 📱 Works on mobile and desktop

---

## Want to Go Further?

If you want the website to stay up permanently without needing your computer on, you can deploy it for free to:

- **Vercel** → [https://vercel.com](https://vercel.com) — drag and drop your folder, done in 2 minutes
- **Netlify** → [https://netlify.com](https://netlify.com) — same deal, very beginner friendly

With those platforms you get a real permanent URL (like `habede.vercel.app`) that stays up 24/7 without you having to do anything. Great if the birthday is still a few days away and you want to send the link in advance.

---

Made with a lot of care. Hope the birthday person loves it 🎉
