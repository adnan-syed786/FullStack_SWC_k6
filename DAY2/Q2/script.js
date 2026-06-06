const list = document.querySelector("#list");
const totalSpan = document.querySelector("#total");
const remainingSpan = document.querySelector("#remaining");

const ITEM_COUNT = 1500;

// Generate HTML string for all items at once (faster than DOM operations)
const itemsHTML = Array.from({ length: ITEM_COUNT }, (_, i) => 
  `<div class="item" data-id="${i}">
     <span class="item-title">Notification ${i + 1}</span>
     <button class="delete">Delete</button>
   </div>`
).join("");

// Insert all HTML at once
list.innerHTML = itemsHTML;

// Update counters
totalSpan.textContent = ITEM_COUNT;
remainingSpan.textContent = ITEM_COUNT;

// Single event listener using event delegation
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const item = event.target.closest(".item");
    item.remove();
    
    // Update remaining count
    const remaining = list.children.length;
    remainingSpan.textContent = remaining;
  }
});
