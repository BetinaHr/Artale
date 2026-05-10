const catalogButtons = document.querySelectorAll(".catalog-btn");

const modalHTML = `
    <div class="customize-modal" id="customizeModal">
        <div class="customize-modal-backdrop"></div>

        <div class="customize-modal-card">
            <button class="customize-close" type="button" aria-label="Затвори">×</button>

            <div class="customize-modal-header">
                <img id="modalBookImage" src="" alt="Избрана книга">

                <div>
                    <span class="customize-kicker">Персонализиране</span>
                    <h2 id="modalBookTitle">Заглавие</h2>
                    <p id="modalBookAuthor">Автор</p>
                    <p class="modal-price">Цена от <strong id="modalBookPrice">185 лв.</strong></p>
                </div>
            </div>

            <form class="customize-form" id="customizeForm">
                <div class="customize-grid">
                    <div class="form-group">
                        <label for="coverColor">Цвят на корицата</label>
                        <input id="coverColor" name="coverColor" type="text" placeholder="Напр. бордо, кафяво, зелено">
                    </div>

                    <div class="form-group">
                        <label for="edgeStyle">Рисувани ръбове</label>
                        <select id="edgeStyle" name="edgeStyle">
                            <option value="Без рисувани ръбове">Без рисувани ръбове</option>
                            <option value="Златисти ръбове">Златисти ръбове</option>
                            <option value="Флорални ръбове">Флорални ръбове</option>
                            <option value="Готически стил">Готически стил</option>
                            <option value="Приказен стил">Приказен стил</option>
                            <option value="По моя идея">По моя идея</option>
                        </select>
                    </div>
                </div>

                <div class="customize-grid">
                    <div class="form-group">
                        <label for="initials">Гравирани инициали</label>
                        <input id="initials" name="initials" type="text" placeholder="Напр. М. И.">
                    </div>

                    <div class="form-group">
                        <label for="dedicationDate">Дата / година</label>
                        <input id="dedicationDate" name="dedicationDate" type="text" placeholder="Напр. 2026">
                    </div>
                </div>

                <div class="form-group">
                    <label for="dedicationMessage">Послание / бележки</label>
                    <textarea id="dedicationMessage" name="dedicationMessage" placeholder="Опишете как искате да изглежда книгата..."></textarea>
                </div>

                <button class="add-to-cart-btn" type="submit">
                    Добави в количката
                </button>
            </form>
        </div>
    </div>
`;

document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.getElementById("customizeModal");
const modalBookImage = document.getElementById("modalBookImage");
const modalBookTitle = document.getElementById("modalBookTitle");
const modalBookAuthor = document.getElementById("modalBookAuthor");
const modalBookPrice = document.getElementById("modalBookPrice");
const customizeForm = document.getElementById("customizeForm");
const closeButton = document.querySelector(".customize-close");
const modalBackdrop = document.querySelector(".customize-modal-backdrop");

let selectedBook = null;

function openCustomizeModal(card) {
    const image = card.querySelector("img").src;
    const title = card.querySelector("h2").textContent.trim();
    const author = card.querySelector(".author").textContent.trim();
    const price = card.querySelector(".price strong").textContent.trim();

    selectedBook = {
        image,
        title,
        author,
        price
    };

    modalBookImage.src = image;
    modalBookTitle.textContent = title;
    modalBookAuthor.textContent = author;
    modalBookPrice.textContent = price;

    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeCustomizeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
    customizeForm.reset();
}

catalogButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".book-card");
        openCustomizeModal(card);
    });
});

closeButton.addEventListener("click", closeCustomizeModal);
modalBackdrop.addEventListener("click", closeCustomizeModal);

customizeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(customizeForm);

    const cartItem = {
        id: Date.now(),
        createdAt: new Date().toLocaleString("bg-BG"),
        book: selectedBook,
        customization: {
            coverColor: formData.get("coverColor") || "Не е избрано",
            edgeStyle: formData.get("edgeStyle") || "Не е избрано",
            initials: formData.get("initials") || "Няма",
            dedicationDate: formData.get("dedicationDate") || "Няма",
            dedicationMessage: formData.get("dedicationMessage") || "Няма допълнителни бележки"
        }
    };

    const cart = JSON.parse(localStorage.getItem("artaleCart")) || [];

    cart.push(cartItem);

    localStorage.setItem("artaleCart", JSON.stringify(cart));

    closeCustomizeModal();

    window.location.href = "./cart.html";
});