const searchInput = document.querySelector("#searchInput");
const results = document.querySelector("#results");
const resultCount = document.querySelector("#resultCount");
const computeCount = document.querySelector("#computeCount");

const products = [
  { name: "Everyday Laptop Pro", category: "Electronics", price: "$899" },
  { name: "Noise Canceling Headphones", category: "Electronics", price: "$149" },
  { name: "Smart Fitness Watch", category: "Wearables", price: "$119" },
  { name: "Mirrorless Travel Camera", category: "Cameras", price: "$720" },
  { name: "Cotton Running Shoes", category: "Footwear", price: "$64" },
  { name: "Leather Office Backpack", category: "Bags", price: "$88" },
  { name: "Steel Water Bottle", category: "Kitchen", price: "$18" },
  { name: "Ceramic Dinner Set", category: "Kitchen", price: "$56" },
  { name: "Compact Air Fryer", category: "Appliances", price: "$95" },
  { name: "Bluetooth Speaker Mini", category: "Electronics", price: "$42" },
  { name: "Desk Lamp with USB", category: "Home Office", price: "$32" },
  { name: "Memory Foam Pillow", category: "Home", price: "$38" },
  { name: "Gaming Keyboard RGB", category: "Computers", price: "$74" },
  { name: "Wireless Mouse", category: "Computers", price: "$28" },
  { name: "Nonstick Cookware Set", category: "Kitchen", price: "$112" },
  { name: "Denim Jacket", category: "Fashion", price: "$69" },
  { name: "Quick Dry Towel Pack", category: "Travel", price: "$24" },
  { name: "Portable Phone Charger", category: "Mobiles", price: "$39" },
  { name: "Yoga Mat", category: "Fitness", price: "$22" },
  { name: "Wall Storage Shelves", category: "Home", price: "$47" }
];

let computations = 0;

function debounce(callback, delay = 300) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

function renderProducts(items) {
  results.textContent = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No matching products found.";
    results.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <div class="product-name">${item.name}</div>
        <div class="product-category">${item.category}</div>
      </div>
      <span class="price">${item.price}</span>
    `;
    fragment.appendChild(listItem);
  });

  results.appendChild(fragment);
}

function filterProducts(query) {
  computations += 1;
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? products.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(normalizedQuery))
    : products;

  resultCount.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;
  computeCount.textContent = `Computations: ${computations}`;
  renderProducts(filtered);
}

const debouncedSearch = debounce((event) => {
  filterProducts(event.target.value);
}, 300);

searchInput.addEventListener("input", debouncedSearch);

filterProducts("");
