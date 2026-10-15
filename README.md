# College Shortest Route Finder

Campus ki do buildings ke beech sabse chhota route Dijkstra algorithm se nikalne wali website.
Plain HTML, CSS aur JavaScript hai. Koi install ya build step nahi chahiye, to kisi bhi static hosting par seedha deploy hoti hai.

## Folder structure

```
college-route-finder/
├── index.html            Page ka structure (dropdowns, map, result, explanation)
├── 404.html              Custom "page not found" page
├── favicon.svg           Browser tab icon
├── netlify.toml          Netlify settings (headers, publish folder)
├── vercel.json           Vercel settings (headers, clean URLs)
├── .nojekyll             GitHub Pages ko Jekyll build se rokta hai
├── .gitignore
├── .github/workflows/
│   └── pages.yml         GitHub Pages par auto-deploy (main branch push par)
├── css/
│   └── style.css         Saari styling, light/dark theme aur mobile layout
└── js/
    ├── data.js           Buildings (nodes) aur footpaths (edges): yahan data badlo
    ├── dijkstra.js       Dijkstra algorithm (DOM se independent)
    ├── map.js            SVG map draw karna aur green route highlight
    └── app.js            Dropdowns, button, result aur explanation table
```

Script order `index.html` mein important hai: `data.js` -> `dijkstra.js` -> `map.js` -> `app.js`.

## Local par chalana (VS Code)

1. `File > Open Folder` se folder kholo.
2. Live Server extension install karo.
3. `index.html` par right-click karke `Open with Live Server` chuno.

## Apne college ka data lagana

`js/data.js` kholo aur `nodes`, `edges`, `DEFAULT_ROUTE` badlo. Save karke refresh karo.
Dropdowns, map aur algorithm apne aap naye data se chalenge.

## Deploy karna (free)

Teeno options mein folder jaisa hai waisa hi upload hota hai. Build command ya output folder ki zarurat nahi.

### Option 1: Netlify (sabse aasan, bina Git ke)

1. https://app.netlify.com/drop kholo.
2. Poora `college-route-finder` folder drag and drop karo.
3. Site ka link turant mil jata hai. Site settings mein naam badal sakte ho.

### Option 2: Vercel

1. Code ko GitHub repo mein push karo.
2. https://vercel.com/new par repo import karo.
3. Framework preset "Other" rakho, build command aur output directory khali chhodo, Deploy dabao.

### Option 3: GitHub Pages

1. Code ko GitHub repo ki `main` branch par push karo.
2. Repo mein `Settings > Pages > Source` mein `GitHub Actions` chuno.
3. Ab har push par `.github/workflows/pages.yml` site ko apne aap deploy karega.
   Link `https://<username>.github.io/<repo-name>/` jaisa hoga.

Terminal se Git push ke liye:

```bash
git init
git add .
git commit -m "College route finder"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

Note: `404.html` mein files `/css/...` jaise root paths se load hoti hain. Netlify aur Vercel par ye sahi chalta hai.
GitHub Pages ke `username.github.io/repo-name/` link par sirf 404 page ki styling nahi dikhegi, baaki site normal chalegi.

## Algorithm

Dijkstra ek starting building se baaki sabka sabse kam distance nikalta hai. Har step par
sabse paas ki unsettled building settle hoti hai aur uske padosiyon ka distance update hota hai.
Destination settle hote hi search ruk jata hai aur "came from" follow karke route banta hai.
