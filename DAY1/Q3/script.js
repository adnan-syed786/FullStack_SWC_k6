class ImageCarousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector(".carousel__track");
        this.slides = [...element.querySelectorAll(".carousel__slide")];
        this.previousButton = element.querySelector(".carousel__button--previous");
        this.nextButton = element.querySelector(".carousel__button--next");
        this.dotsContainer = element.querySelector(".carousel__dots");
        this.currentDisplay = element.querySelector("[data-current-slide]");
        this.totalDisplay = element.querySelector("[data-total-slides]");
        this.interval = Number(element.dataset.interval) || 3000;
        this.currentIndex = 0;
        this.timer = null;

        this.createDots();
        this.bindEvents();
        this.update();
        this.startAutoSlide();
    }

    createDots() {
        this.dots = this.slides.map((_, index) => {
            const dot = document.createElement("button");
            dot.className = "carousel__dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Show image ${index + 1}`);
            dot.addEventListener("click", () => {
                this.goTo(index);
                this.restartAutoSlide();
            });
            this.dotsContainer.appendChild(dot);
            return dot;
        });
    }

    bindEvents() {
        this.previousButton.addEventListener("click", () => {
            this.goTo(this.currentIndex - 1);
            this.restartAutoSlide();
        });

        this.nextButton.addEventListener("click", () => {
            this.goTo(this.currentIndex + 1);
            this.restartAutoSlide();
        });

        this.carousel.addEventListener("mouseenter", () => this.stopAutoSlide());
        this.carousel.addEventListener("mouseleave", () => this.startAutoSlide());
        this.carousel.addEventListener("focusin", () => this.stopAutoSlide());
        this.carousel.addEventListener("focusout", (event) => {
            if (!this.carousel.contains(event.relatedTarget)) {
                this.startAutoSlide();
            }
        });

        this.carousel.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.goTo(this.currentIndex - 1);
            }
            if (event.key === "ArrowRight") {
                this.goTo(this.currentIndex + 1);
            }
        });

        document.addEventListener("visibilitychange", () => {
            document.hidden ? this.stopAutoSlide() : this.startAutoSlide();
        });
    }

    goTo(index) {
        this.currentIndex = (index + this.slides.length) % this.slides.length;
        this.update();
    }

    update() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.currentDisplay.textContent = this.currentIndex + 1;
        this.totalDisplay.textContent = this.slides.length;

        this.dots.forEach((dot, index) => {
            const isActive = index === this.currentIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
    }

    startAutoSlide() {
        if (this.timer || this.slides.length < 2 || document.hidden) return;
        this.timer = setInterval(() => this.goTo(this.currentIndex + 1), this.interval);
    }

    stopAutoSlide() {
        clearInterval(this.timer);
        this.timer = null;
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    new ImageCarousel(carousel);
});
