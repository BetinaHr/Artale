const cartContainer = document.getElementById("cartContainer");

let cart = JSON.parse(localStorage.getItem("artaleCart")) || [];

function saveCart() {
    localStorage.setItem("artaleCart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function renderCart() {
    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Количката е празна</h2>
                <p>
                    Все още няма добавени персонализирани книги.
                    Разгледайте каталога и изберете книга за персонализация.
                </p>

                <div class="cart-summary-actions">
                    <a href="./catalog.html" class="checkout-btn">Към каталога</a>
                </div>
            </div>
        `;

        updateCartCount();
        return;
    }

    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cart.map((item) => {
                return `
                    <article class="cart-card" data-id="${item.id}">
                        <img src="${item.book.image}" alt="${item.book.title}">

                        <div class="cart-card-content">
                            <div class="cart-card-header">
                                <div>
                                    <span class="cart-date">${item.createdAt}</span>
                                    <h2>${item.book.title}</h2>
                                    <p>${item.book.author}</p>
                                </div>

                                <button class="remove-cart-btn" type="button" data-id="${item.id}">
                                    Премахни
                                </button>
                            </div>

                            <div class="cart-details">
                                ${item.type === "custom" ? `
                                    <p><strong>Тип:</strong> Custom поръчка</p>
                                    <p><strong>Материал:</strong> ${item.customization.coverMaterial}</p>
                                    <p><strong>Корица:</strong> ${item.customization.coverColor}</p>
                                    <p><strong>Ръбове:</strong> ${item.customization.edgeStyle}</p>
                                    <p><strong>Цветове:</strong> ${item.customization.edgeColors}</p>
                                    <p><strong>Гравиране:</strong> ${item.customization.initials}</p>
                                    <p><strong>Дата:</strong> ${item.customization.dedicationDate}</p>
                                    <p class="cart-message"><strong>Идея:</strong> ${item.customization.dedicationMessage}</p>
                                    <p><strong>Цена:</strong> ${item.book.price}</p>
                                ` : `
                                    <p><strong>Тип:</strong> Книга от каталога</p>
                                    <p><strong>Корица:</strong> ${item.customization.coverColor}</p>
                                    <p><strong>Ръбове:</strong> ${item.customization.edgeStyle}</p>
                                    <p><strong>Инициали:</strong> ${item.customization.initials}</p>
                                    <p><strong>Дата:</strong> ${item.customization.dedicationDate}</p>
                                    <p class="cart-message"><strong>Бележки:</strong> ${item.customization.dedicationMessage}</p>
                                    <p><strong>Цена:</strong> ${item.book.price}</p>
                                `}
                            </div>
                        </div>
                    </article>
                `;
            }).join("")}
        </div>

        <div class="cart-summary">
            <h2>Потвърдете поръчката</h2>

            <p>
                Попълнете данните си и ние ще се свържем с Вас за уточняване на детайлите,
                цена и срок за изработка.
            </p>

            <form class="cart-checkout-form" id="cartCheckoutForm" novalidate>
                <div class="cart-checkout-grid">
                    <div class="form-group">
                        <label for="customerName">Име и фамилия</label>
                        <input id="customerName" name="customerName" type="text" placeholder="Вашето име" required>
                    </div>

                    <div class="form-group">
                        <label for="customerEmail">Имейл</label>
                        <input id="customerEmail" name="customerEmail" type="email" placeholder="example@email.com" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="customerPhone">Телефон</label>
                    <input id="customerPhone" name="customerPhone" type="tel" placeholder="+359 ..." required>
                </div>

                <div class="form-group">
                    <label for="finalMessage">Допълнителни бележки</label>
                    <textarea id="finalMessage" name="finalMessage" placeholder="Допълнителна информация към поръчката..."></textarea>
                </div>

                <div class="cart-summary-actions">
                    <a href="./catalog.html" class="continue-shopping-btn">Добави още</a>
                    <button class="checkout-btn" type="submit">Потвърди поръчката</button>
                </div>
            </form>
        </div>
    `;

    const removeButtons = document.querySelectorAll(".remove-cart-btn");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);

            cart = cart.filter((item) => {
                return item.id !== id;
            });

            saveCart();
            renderCart();
            updateCartCount();
        });
    });

    const checkoutForm = document.getElementById("cartCheckoutForm");

    checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateCartCheckoutForm(checkoutForm)) {
        return;
    }

    const formData = new FormData(checkoutForm);

        const submittedOrder = {
            id: Date.now(),
            submittedAt: new Date().toLocaleString("bg-BG"),
            customer: {
                name: formData.get("customerName"),
                email: formData.get("customerEmail"),
                phone: formData.get("customerPhone"),
                message: formData.get("finalMessage") || "Няма допълнителни бележки"
            },
            items: cart
        };

        const submittedOrders = JSON.parse(localStorage.getItem("artaleSubmittedOrders")) || [];
        submittedOrders.push(submittedOrder);

        localStorage.setItem("artaleSubmittedOrders", JSON.stringify(submittedOrders));

        localStorage.removeItem("artaleCart");
        cart = [];

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Поръчката е потвърдена!</h2>
                <p>
                    Благодарим Ви! Вашата заявка беше запазена успешно.
                    Ще се свържем с Вас за уточняване на детайлите.
                </p>

                <div class="cart-summary-actions">
                    <a href="../index.html" class="continue-shopping-btn">Към началната страница</a>
                    <a href="./catalog.html" class="checkout-btn">Разгледай още книги</a>
                </div>
            </div>
        `;

        updateCartCount();
    });
}

renderCart();
updateCartCount();