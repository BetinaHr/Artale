    const bookShowcase = document.getElementById("bookShowcase");
    const bookTabs = document.querySelectorAll(".book-tab");
    const bookScenes = document.querySelectorAll(".book-scene");

    if (bookShowcase) {
        bookTabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                event.stopPropagation();

                const mode = tab.dataset.bookMode;

                bookShowcase.dataset.mode = mode;

                bookTabs.forEach((btn) => {
                    btn.classList.remove("active");
                });

                tab.classList.add("active");

                bookScenes.forEach((scene) => {
                    scene.classList.remove("active");
                });

                const activeScene = document.querySelector(`.scene-${mode}`);

                if (activeScene) {
                    activeScene.classList.add("active");
                }
            });
        });
    }