// Get DOM elements
const contentInput = document.getElementById("contentInput");
const charCount = document.getElementById("charCount");
const submitBtn = document.getElementById("submitBtn");
const warningMsg = document.getElementById("warningMsg");
const successMsg = document.getElementById("successMsg");
const inputWrapper = document.querySelector(".input-wrapper");
const charCounter = document.querySelector(".char-counter");

const MAX_CHARS = 200;
const WARNING_THRESHOLD = 0.8; // 80%
const DANGER_THRESHOLD = 0.9; // 90%

// Update character count and visual states
function updateCharCount() {
  const currentLength = contentInput.value.length;
  charCount.textContent = currentLength;

  const percentageUsed = currentLength / MAX_CHARS;

  // Reset all states
  inputWrapper.classList.remove("warning", "limit-reached");
  charCounter.classList.remove("warning", "danger");
  warningMsg.style.display = "none";

  if (currentLength === MAX_CHARS) {
    // Limit reached
    inputWrapper.classList.add("limit-reached");
    charCounter.classList.add("danger");
    warningMsg.style.display = "block";
  } else if (percentageUsed >= DANGER_THRESHOLD) {
    // Danger zone (90%)
    inputWrapper.classList.add("warning");
    charCounter.classList.add("danger");
  } else if (percentageUsed >= WARNING_THRESHOLD) {
    // Warning zone (80%)
    inputWrapper.classList.add("warning");
    charCounter.classList.add("warning");
  }

  // Enable/disable submit button based on content
  submitBtn.disabled = currentLength === 0 || currentLength > MAX_CHARS;
}

// Prevent typing beyond limit
contentInput.addEventListener("input", function () {
  if (this.value.length > MAX_CHARS) {
    this.value = this.value.substring(0, MAX_CHARS);
  }
  updateCharCount();
});

// Handle submit
submitBtn.addEventListener("click", function () {
  const content = contentInput.value.trim();

  if (content.length === 0) {
    alert("Please write something before posting!");
    return;
  }

  if (content.length > MAX_CHARS) {
    alert("Content exceeds maximum character limit!");
    return;
  }

  // Show success message
  successMsg.style.display = "block";
  console.log("Posted:", content);

  // Clear textarea
  contentInput.value = "";
  updateCharCount();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMsg.style.display = "none";
  }, 3000);
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCharCount();
});