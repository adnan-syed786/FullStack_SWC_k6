const scrollFrame = document.querySelector("#scrollFrame");
const scrollTrack = document.querySelector("#scrollTrack");
const cardTemplate = document.querySelector("#cardTemplate");
const sampleTemplate = document.querySelector("#sampleTemplate");
const statusText = document.querySelector("#status");
const pauseButton = document.querySelector("#pauseAnimation");
const scrollDownButton = document.querySelector("#scrollDown");
const scrollTopButton = document.querySelector("#scrollTop");

const samplePosts = [
  {
    avatar: "M",
    title: "More feed content loaded",
    text: "The infinite scroll area added another sample card while the loader stayed visible below it.",
    color: "banner-blue"
  },
  {
    avatar: "P",
    title: "Skeleton placeholder still active",
    text: "The gray shimmer cards show where new content will appear while more data is being fetched.",
    color: "banner-coral"
  },
  {
    avatar: "D",
    title: "Manual scroll is available",
    text: "Use the scrollbar, mouse wheel, trackpad, or the buttons to move through the feed panel.",
    color: "banner-gold"
  },
  {
    avatar: "T",
    title: "Git-ready folder structure",
    text: "This question remains inside its own Q4 folder with HTML, CSS, JavaScript, and README files.",
    color: "banner-green"
  }
];

let skeletonCount = document.querySelectorAll(".skeleton-card").length;
let sampleCount = document.querySelectorAll(".sample-card").length;
let isLoading = false;

function updateStatus() {
  statusText.textContent = `Showing ${sampleCount} sample cards and ${skeletonCount} loading placeholders.`;
}

function createSkeletonCard(index) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const media = card.querySelector(".media");

  if (index % 2 === 0) {
    media.classList.add("compact");
  }

  return card;
}

function createSampleCard(index) {
  const post = samplePosts[index % samplePosts.length];
  const card = sampleTemplate.content.firstElementChild.cloneNode(true);
  const avatar = card.querySelector(".sample-avatar");
  const banner = card.querySelector(".sample-banner");

  avatar.textContent = post.avatar;
  card.querySelector(".sample-meta").textContent = `Loaded item ${index + 1} • just now`;
  card.querySelector("h2").textContent = post.title;
  card.querySelector("p").textContent = post.text;
  banner.classList.add(post.color);

  return card;
}

function addMoreCards(amount = 4) {
  const loader = scrollTrack.querySelector(".bottom-loader");
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < amount; index += 1) {
    if (index % 2 === 0) {
      fragment.appendChild(createSampleCard(sampleCount));
      sampleCount += 1;
    } else {
      skeletonCount += 1;
      fragment.appendChild(createSkeletonCard(skeletonCount));
    }
  }

  scrollTrack.insertBefore(fragment, loader);
  updateStatus();
}

function handleInfiniteScroll() {
  const distanceFromBottom = scrollFrame.scrollHeight - scrollFrame.scrollTop - scrollFrame.clientHeight;

  if (distanceFromBottom > 90 || isLoading) return;

  isLoading = true;
  setTimeout(() => {
    addMoreCards();
    isLoading = false;
  }, 450);
}

scrollFrame.addEventListener("scroll", handleInfiniteScroll);

scrollDownButton.addEventListener("click", () => {
  scrollFrame.scrollBy({ top: 420, behavior: "smooth" });
});

scrollTopButton.addEventListener("click", () => {
  scrollFrame.scrollTo({ top: 0, behavior: "smooth" });
});

pauseButton.addEventListener("click", () => {
  const isPaused = scrollFrame.classList.toggle("is-paused");
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
  pauseButton.setAttribute("aria-pressed", String(isPaused));
});

updateStatus();
