const searchInput = document.querySelector("#searchInput");
const suggestionList = document.querySelector("#suggestionList");
const selection = document.querySelector("#selection");

const suggestions = [
  "Analytics dashboard",
  "API retry pattern",
  "Autocomplete search",
  "Camera accessories",
  "Customer profile",
  "Dashboard settings",
  "Data visualization",
  "Email validation",
  "Infinite scrolling feed",
  "Keyboard navigation",
  "Laptop deals",
  "Mock API users",
  "Password strength",
  "Product filtering",
  "Responsive homepage",
  "Streaming recommendations",
  "User directory"
];

let filteredSuggestions = [];
let highlightedIndex = -1;

function closeSuggestions() {
  suggestionList.hidden = true;
  searchInput.setAttribute("aria-expanded", "false");
  searchInput.setAttribute("aria-activedescendant", "");
  highlightedIndex = -1;
}

function updateHighlight() {
  const items = suggestionList.querySelectorAll("li");

  items.forEach((item, index) => {
    const isHighlighted = index === highlightedIndex;
    item.classList.toggle("is-highlighted", isHighlighted);
    item.setAttribute("aria-selected", String(isHighlighted));
  });

  const highlightedItem = items[highlightedIndex];
  searchInput.setAttribute("aria-activedescendant", highlightedItem ? highlightedItem.id : "");
}

function renderSuggestions(query) {
  const normalizedQuery = query.trim().toLowerCase();
  suggestionList.textContent = "";

  if (!normalizedQuery) {
    closeSuggestions();
    return;
  }

  filteredSuggestions = suggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(normalizedQuery))
    .slice(0, 8);

  if (filteredSuggestions.length === 0) {
    closeSuggestions();
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredSuggestions.forEach((suggestion, index) => {
    const item = document.createElement("li");
    item.id = `suggestion-${index}`;
    item.role = "option";
    item.textContent = suggestion;
    item.addEventListener("mousedown", () => selectSuggestion(index));
    fragment.appendChild(item);
  });

  suggestionList.appendChild(fragment);
  suggestionList.hidden = false;
  searchInput.setAttribute("aria-expanded", "true");
  highlightedIndex = -1;
}

function selectSuggestion(index) {
  const selected = filteredSuggestions[index];
  if (!selected) return;

  searchInput.value = selected;
  selection.textContent = `Selected: ${selected}`;
  closeSuggestions();
}

searchInput.addEventListener("input", (event) => {
  renderSuggestions(event.target.value);
});

searchInput.addEventListener("keydown", (event) => {
  if (suggestionList.hidden) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    highlightedIndex = (highlightedIndex + 1) % filteredSuggestions.length;
    updateHighlight();
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    highlightedIndex = (highlightedIndex - 1 + filteredSuggestions.length) % filteredSuggestions.length;
    updateHighlight();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    selectSuggestion(highlightedIndex >= 0 ? highlightedIndex : 0);
  }

  if (event.key === "Escape") {
    closeSuggestions();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".combobox")) {
    closeSuggestions();
  }
});
