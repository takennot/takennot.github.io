const projects = [
  { title: "New Horizons (2026)",               type: "OpenGL / GLSL",         description: "Shaders experiment.",                        image: "images/NewHorizons.jpg",       url: "https://github.com/takennot/NewHorizons"                  },
  { title: "Brew Besties (2024)",               type: "Unity / C#",            description: "Generalist programmer / Steam integration.", image: "images/bb.jpg",                url: "https://store.steampowered.com/app/2772170/Brew_Besties/" },
  { title: "P.R.O.S. (2026, Coming Soon)",      type: "Unreal Engine / C++",   description: "Network programmer.",                        image: "images/Pipori_4.jpg",          url: "https://futuregames.itch.io/pros"                         },
  { title: "Dream Dash (2025)",                 type: "Unity / C#",            description: "Player programmer.",                         image: "images/dd.jpg",                url: "https://futuregames.itch.io/dream-dash"                   },
  { title: "Containment Breach (2026)",         type: "Unity / C#",            description: "Generalist programmer.",                     image: "images/CB.jpg",                url: "https://futuregames.itch.io/containment-breach"           },
  { title: "Synesthesia (2026, Coming Soon)",   type: "Unreal / Blueprints",   description: "Enemy AI programmer",                        image: "images/GP4.png",               url: "https://futuregames.itch.io/synesthesia"                  },
  { title: "Spirit Child (2023)",               type: "Unreal Engine / C++",   description: "Generalist programmer.",                     image: "images/spirit_alpha.png",      url: "https://github.com/SagaLD/Spirit_Child"                   },
  { title: "Candle Mansion (2023)",             type: "Unreal / Blueprints",   description: "Generalist programmer.",                     image: "images/candle_alpha.jpg",      url: "https://github.com/takennot/CandleMansion"                },
  { title: "Luna's Tower (2022)",               type: "Unity / C#",            description: "Generalist programmer.",                     image: "images/LT.png",                url: "https://github.com/SagaLD/Lunas-Tower"                    },
];

const grid = document.getElementById("project-grid");
const count = document.getElementById("project-count");
const palettes = [
  ["#29322f", "#97ada3"], ["#2a333a", "#9aaeba"],
  ["#34302c", "#baa999"], ["#2e3038", "#aaaabb"]
];

function addTextElement(parent, tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  parent.appendChild(el);
  return el;
}

projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "project-card";
  const hasLink = Boolean(project.url && project.url.trim());
  const content = document.createElement(hasLink ? "a" : "div");
  content.className = hasLink ? "project-link" : "project-content";
  if (hasLink) {
    content.href = project.url;
    if (/^https?:\/\//i.test(project.url)) {
      content.target = "_blank";
      content.rel = "noopener noreferrer";
    }
    content.setAttribute("aria-label", `${project.title} — view project`);
  }

  const media = document.createElement("div");
  media.className = "project-media";
  const placeholder = document.createElement("div");
  placeholder.className = "project-placeholder";
  const colors = palettes[index % palettes.length];
  placeholder.style.setProperty("--project-bg", colors[0]);
  placeholder.style.setProperty("--project-ink", colors[1]);
  const top = document.createElement("div");
  top.className = "placeholder-top";
  addTextElement(top, "span", "", "Project Image");
  addTextElement(top, "span", "", String(index + 1).padStart(2, "0"));
  placeholder.appendChild(top);
  addTextElement(placeholder, "span", "placeholder-number", String(index + 1).padStart(2, "0"));
  media.appendChild(placeholder);
  if (project.image && project.image.trim()) {
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = `${project.title} screenshot`;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => img.remove());
    media.appendChild(img);
  }
  content.appendChild(media);

  const titleRow = document.createElement("div");
  titleRow.className = "project-title-row";
  addTextElement(titleRow, "h3", "", project.title);
  if (hasLink) addTextElement(titleRow, "span", "link-arrow", "↗").setAttribute("aria-hidden", "true");
  content.appendChild(titleRow);
  if (project.type) addTextElement(content, "p", "project-type", project.type);
  if (project.description) addTextElement(content, "p", "project-description", project.description);
  card.appendChild(content);
  grid.appendChild(card);
});
count.textContent = `(${projects.length})`;
document.getElementById("year").textContent = new Date().getFullYear();
