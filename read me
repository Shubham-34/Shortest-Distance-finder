college-route-finder/
├── index.html            Main page structure (dropdowns, map, results, explanation)
├── 404.html              Custom "Page Not Found" page
├── favicon.svg           Browser tab icon
├── netlify.toml          Netlify configuration (headers, publish folder)
├── vercel.json           Vercel configuration (headers, clean URLs)
├── .nojekyll              Prevents Jekyll processing on GitHub Pages
├── .gitignore
├── .github/
│   └── workflows/
│       └── pages.yml     Automatic GitHub Pages deployment
├── css/
│   └── style.css         Styling, light/dark themes, and mobile layout
└── js/
    ├── data.js           Building nodes and footpath edges
    ├── dijkstra.js       Dijkstra's algorithm (independent of the DOM)
    ├── map.js            Draws the SVG map and highlights the route in green
    └── app.js            Handles dropdowns, buttons, results, and explanation table

Important: The script loading order in index.html must be:

data.js → dijkstra.js → map.js → app.js
Running the Project Locally in VS Code
1. Open VS Code.
2. Select File → Open Folder and open the college-route-finder folder.
3. Install the Live Server extension.
4. Right-click index.html and select Open with Live Server.
5. The website will open in your browser.


Adding Your College's Data
1. Open the js/data.js file.
2. Update the nodes, edges, and DEFAULT_ROUTE values.
3. Save the file and refresh the website.
The dropdown menus, map, and algorithm will automatically work with the updated data.


Deploying the Project for Free
All three hosting options support this project without requiring a build command or output directory.

Option 1: Netlify (Easiest, No Git Required)
1. Open Netlify Drop.
2. Drag and drop the entire college-route-finder folder.
3. Netlify will deploy your website and provide a live URL.
4. You can change the website name in the site settings.

Option 2: Vercel
1. Push your project code to a GitHub repository.
2. Open Vercel.
3. Import your GitHub repository.
4. Set the framework preset to Other.
5. Leave the build command and output directory empty.
6. Click Deploy.

Option 3: GitHub Pages
1. Push your project code to the main branch of your GitHub repository.
2. Open your repository and navigate to Settings → Pages.
3. Under Build and deployment → Source, select GitHub Actions.
4. The workflow in .github/workflows/pages.yml will automatically deploy the website whenever you push changes to the repository.
Your website URL will look like this:

https://<username>.github.io/<repo-name>/
Pushing Your Project to GitHub Using the Terminal
Run the following commands from inside your project folder:
git init
git add .
git commit -m "College route finder"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main


Replace <username> with your GitHub username and <repo-name> with your repository name.

Note: In 404.html, file paths such as /css/... use root-relative URLs. These work on Netlify and Vercel, but may not work correctly on GitHub Pages when the website is hosted under a repository path such as username.github.io/repo-name/. The main website can still work normally while the custom 404 page's styling fails to load.


Algorithm: Dijkstra's Algorithm
Dijkstra's algorithm finds the shortest path from a starting building to a destination building.

It works as follows:
1. Select the starting building and assign it a distance of zero.
2. Assign infinity as the initial distance to all other buildings.
3. Select the unvisited building with the smallest known distance.
4. Check its neighboring buildings and update their distances if a shorter path is found.
5. Mark the current building as visited and repeat the process.
6. Stop when the destination building is reached and reconstruct the shortest route by following the previous-building references.
