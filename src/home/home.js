import arrowRightIcon from "@primer/octicons/build/svg/arrow-right-16.svg?raw";
import bookIcon from "@primer/octicons/build/svg/book-16.svg?raw";
import clockIcon from "@primer/octicons/build/svg/clock-16.svg?raw";
import markGithubIcon from "@primer/octicons/build/svg/mark-github-24.svg?raw";
import peopleIcon from "@primer/octicons/build/svg/people-16.svg?raw";
import playIcon from "@primer/octicons/build/svg/play-16.svg?raw";
import repoIcon from "@primer/octicons/build/svg/repo-16.svg?raw";
import "./home.css";

const manifestModules = import.meta.glob("../../decks/*/deck.json", {
  eager: true,
  import: "default",
});

const themeLabels = {
  default: "GitHub",
  copilot: "GitHub Copilot",
  security: "GitHub Advanced Security",
};

const iconSources = {
  "arrow-right": arrowRightIcon,
  book: bookIcon,
  clock: clockIcon,
  "mark-github": markGithubIcon,
  people: peopleIcon,
  play: playIcon,
  repo: repoIcon,
};

function getRequiredElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Homepage is missing required element: ${selector}`);
  }
  return element;
}

function getIcon(name) {
  const icon = iconSources[name];
  if (!icon) {
    throw new Error(`Unknown Octicon: ${name}`);
  }
  return icon;
}

function iconMarkup(name, size = 16) {
  return getIcon(name)
    .replace(
      "<svg ",
      `<svg class="octicon octicon-${name}" aria-hidden="true" focusable="false" `,
    )
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`);
}

function renderStaticIcons() {
  document.querySelectorAll("[data-octicon]").forEach((element) => {
    const size = Number.parseInt(element.dataset.octiconSize || "16", 10);
    element.innerHTML = iconMarkup(element.dataset.octicon, size);
  });
}

function createIcon(name, size = 16) {
  const wrapper = document.createElement("span");
  wrapper.className = "icon";
  wrapper.innerHTML = iconMarkup(name, size);
  return wrapper;
}

function getThemeGroup(deck) {
  const [group] = deck.theme.split("-");
  return themeLabels[group] ? group : "default";
}

function createBadge(text, className) {
  const badge = document.createElement("span");
  badge.className = `deck-badge ${className}`;
  badge.textContent = text;
  return badge;
}

function createMetadataItem(iconName, text) {
  const item = document.createElement("span");
  item.className = "deck-card__meta-item";
  item.append(createIcon(iconName), document.createTextNode(text));
  return item;
}

function createDeckCard(deck) {
  const themeGroup = getThemeGroup(deck);
  const titleId = `deck-${deck.id}-title`;
  const descriptionId = `deck-${deck.id}-description`;
  const metadataId = `deck-${deck.id}-metadata`;

  const card = document.createElement("a");
  card.className = `deck-card deck-card--${themeGroup}`;
  card.href = `./decks/${deck.id}/`;
  card.dataset.deckId = deck.id;
  card.dataset.default = String(Boolean(deck.default));
  card.setAttribute("aria-labelledby", titleId);
  card.setAttribute("aria-describedby", `${descriptionId} ${metadataId}`);

  const article = document.createElement("article");
  article.className = "deck-card__content";

  const badges = document.createElement("div");
  badges.className = "deck-card__badges";
  badges.append(createBadge(themeLabels[themeGroup], "deck-badge--topic"));
  if (deck.default) {
    badges.append(createBadge("Featured", "deck-badge--featured"));
  }

  const title = document.createElement("h3");
  title.className = "deck-card__title";
  title.id = titleId;
  title.textContent = deck.title;

  const description = document.createElement("p");
  description.className = "deck-card__description";
  description.id = descriptionId;
  description.textContent =
    deck.description || `A technical presentation for ${deck.audience}.`;

  const metadata = document.createElement("div");
  metadata.className = "deck-card__metadata";
  metadata.id = metadataId;
  metadata.append(
    createMetadataItem("clock", `${deck.durationMinutes} min`),
    createMetadataItem("people", deck.audience),
  );

  const action = document.createElement("span");
  action.className = "deck-card__action";
  action.append(
    createIcon("play"),
    document.createTextNode("Open presentation"),
    createIcon("arrow-right"),
  );

  article.append(badges, title, description, metadata, action);
  card.append(article);
  return card;
}

function getActiveDecks() {
  return Object.values(manifestModules)
    .filter((deck) => deck.status === "active")
    .sort(
      (left, right) =>
        Number(Boolean(right.default)) - Number(Boolean(left.default)) ||
        left.title.localeCompare(right.title),
    );
}

function renderCatalog() {
  const grid = getRequiredElement("#deck-grid");
  const count = getRequiredElement("#deck-count");
  const total = getRequiredElement("[data-deck-total]");
  const decks = getActiveDecks();

  if (decks.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "catalog__empty";
    emptyState.textContent = "No active presentations are available.";
    grid.replaceChildren(emptyState);
    grid.setAttribute("aria-busy", "false");
    count.textContent = "No active presentations";
    total.textContent = "0";
    return;
  }

  grid.replaceChildren(...decks.map(createDeckCard));
  grid.setAttribute("aria-busy", "false");
  count.textContent = `${decks.length} active presentation${decks.length === 1 ? "" : "s"}`;
  total.textContent = String(decks.length);
}

renderStaticIcons();
renderCatalog();
