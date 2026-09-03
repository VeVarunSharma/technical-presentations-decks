export function initDeck({ onReset } = {}) {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const previousButton = document.getElementById("previousButton");
  const nextButton = document.getElementById("nextButton");
  const progressBar = document.getElementById("progressBar");
  const slideCount = document.getElementById("slideCount");
  const buildCount = document.getElementById("buildCount");
  const dotNav = document.getElementById("dotNav");
  const stage = document.getElementById("stage");
  const sourcesDialog = document.getElementById("sourcesDialog");
  const scenarioStage = document.getElementById("scenarioStage");
  const fullscreenButton = document.getElementById("fullscreenButton");
  const sourcesButton = document.getElementById("sourcesButton");
  const closeSources = document.getElementById("closeSources");

  if (!slides.length || !stage) {
    throw new Error("Presentation runtime requires .slide elements inside #stage.");
  }

  let currentSlide = Math.max(
    0,
    Math.min(slides.length - 1, Number.parseInt(location.hash.slice(1), 10) - 1 || 0),
  );

  const pad = (value) => String(value).padStart(2, "0");
  const buildSteps = slides.map((slide) =>
    [...new Set(Array.from(slide.querySelectorAll("[data-build-step]"), (element) => Number(element.dataset.buildStep)))]
      .filter(Number.isFinite)
      .sort((a, b) => a - b),
  );
  const buildState = slides.map(() => 0);

  if (dotNav) {
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.title = `${pad(index + 1)} - ${slide.dataset.title || `Slide ${index + 1}`}`;
      dot.setAttribute("aria-label", `Go to slide ${index + 1}: ${slide.dataset.title || ""}`);
      dot.addEventListener("click", () => showSlide(index));
      dotNav.appendChild(dot);
    });
  }

  function syncBuildState(slideIndex) {
    const state = buildState[slideIndex];
    slides[slideIndex].querySelectorAll("[data-build-step]").forEach((element) => {
      const visible = Number(element.dataset.buildStep) <= state;
      element.classList.toggle("build-visible", visible);
      element.setAttribute("aria-hidden", visible ? "false" : "true");
    });
  }

  function hasNextBuild(slideIndex = currentSlide) {
    return buildSteps[slideIndex].some((step) => step > buildState[slideIndex]);
  }

  function hasPreviousBuild(slideIndex = currentSlide) {
    return buildState[slideIndex] > 0;
  }

  function updateNavigationState() {
    const canHideBuild = hasPreviousBuild();
    const canRevealBuild = hasNextBuild();

    if (previousButton) {
      const action = canHideBuild ? "Hide" : "Back";
      previousButton.disabled = currentSlide === 0 && !canHideBuild;
      previousButton.innerHTML = `<span aria-hidden="true">←</span><span class="nav-button-label">${action}</span>`;
      previousButton.setAttribute("aria-label", canHideBuild ? "Hide previous build step" : "Previous slide");
      previousButton.title = canHideBuild ? "Hide the latest revealed step" : "Go to the previous slide";
    }
    if (nextButton) {
      const action = canRevealBuild ? "Reveal" : "Next";
      nextButton.disabled = currentSlide === slides.length - 1 && !canRevealBuild;
      nextButton.innerHTML = `<span class="nav-button-label">${action}</span><span aria-hidden="true">→</span>`;
      nextButton.setAttribute("aria-label", canRevealBuild ? "Reveal next build step" : "Next slide");
      nextButton.title = canRevealBuild ? "Reveal the next step on this slide" : "Go to the next slide";
    }

    if (buildCount) {
      const steps = buildSteps[currentSlide];
      const revealed = steps.filter((step) => step <= buildState[currentSlide]).length;
      buildCount.textContent = steps.length ? `${revealed}/${steps.length} revealed` : "No builds";
    }
  }

  function acknowledgeNavigation(button, message) {
    if (!button) return;
    button.dataset.feedback = message;
    button.classList.remove("nav-activated");
    void button.offsetWidth;
    button.classList.add("nav-activated");
  }

  function revealNextBuild() {
    const nextStep = buildSteps[currentSlide].find((step) => step > buildState[currentSlide]);
    if (nextStep === undefined) return false;
    buildState[currentSlide] = nextStep;
    syncBuildState(currentSlide);
    updateNavigationState();
    return true;
  }

  function hidePreviousBuild() {
    if (!hasPreviousBuild()) return false;
    buildState[currentSlide] =
      buildSteps[currentSlide].filter((step) => step < buildState[currentSlide]).at(-1) || 0;
    syncBuildState(currentSlide);
    updateNavigationState();
    return true;
  }

  function resetAllBuilds() {
    buildState.fill(0);
    slides.forEach((_, index) => syncBuildState(index));
    updateNavigationState();
  }

  function showSlide(index) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === nextIndex);
      slide.classList.toggle("was-active", slideIndex < nextIndex);
      slide.setAttribute("aria-hidden", slideIndex === nextIndex ? "false" : "true");
    });

    currentSlide = nextIndex;
    syncBuildState(currentSlide);

    if (progressBar) progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
    if (slideCount) slideCount.textContent = `${pad(currentSlide + 1)} / ${pad(slides.length)}`;
    if (scenarioStage) scenarioStage.textContent = slides[currentSlide].dataset.scenarioStage || "";
    if (dotNav) {
      Array.from(dotNav.children).forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
    }

    history.replaceState(null, "", `#${currentSlide + 1}`);
    document.title = `${slides[currentSlide].dataset.title || `Slide ${currentSlide + 1}`} - ${document.documentElement.dataset.deckTitle || "Presentation"}`;
    updateNavigationState();
  }

  function advanceForward() {
    if (revealNextBuild()) {
      acknowledgeNavigation(nextButton, "Step revealed");
      return;
    }
    const previousSlide = currentSlide;
    showSlide(currentSlide + 1);
    if (currentSlide !== previousSlide) acknowledgeNavigation(nextButton, "Next slide");
  }

  function advanceBackward() {
    if (hidePreviousBuild()) {
      acknowledgeNavigation(previousButton, "Step hidden");
      return;
    }
    const previousSlide = currentSlide;
    showSlide(currentSlide - 1);
    if (currentSlide !== previousSlide) acknowledgeNavigation(previousButton, "Previous slide");
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  previousButton?.addEventListener("click", advanceBackward);
  nextButton?.addEventListener("click", advanceForward);
  fullscreenButton?.addEventListener("click", toggleFullscreen);
  sourcesButton?.addEventListener("click", () => sourcesDialog?.showModal());
  closeSources?.addEventListener("click", () => sourcesDialog?.close());

  document.addEventListener("keydown", (event) => {
    const interactive = event.target instanceof Element
      ? event.target.closest("button, a, input, textarea, select")
      : null;

    if (event.key === "Escape" && sourcesDialog?.open) {
      sourcesDialog.close();
      return;
    }
    if (event.key.toLowerCase() === "f" && !interactive) {
      toggleFullscreen();
      return;
    }
    if (interactive && event.key === " ") return;

    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      advanceForward();
    } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      advanceBackward();
    } else if (event.key === "Home") {
      event.preventDefault();
      resetAllBuilds();
      onReset?.();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  let touchStartX = 0;
  stage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  stage.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) <= 55) return;
    if (delta < 0) advanceForward();
    else advanceBackward();
  }, { passive: true });

  resetAllBuilds();

  return {
    slides,
    buildSteps,
    buildState,
    get currentSlide() {
      return currentSlide;
    },
    showSlide,
    revealNextBuild,
    hidePreviousBuild,
    resetAllBuilds,
    advanceForward,
    advanceBackward,
  };
}
