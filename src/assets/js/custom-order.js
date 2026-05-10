const customOrderForm = document.getElementById("customOrderForm");
const siteMessage = document.getElementById("siteMessage");

function showMessage(message, type) {
    if (!siteMessage) {
        return;
    }

    siteMessage.textContent = message;
    siteMessage.className = `site-message show ${type}`;
}

function getCart() {
    return JSON.parse(localStorage.getItem("artaleCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("artaleCart", JSON.stringify(cart));
}

if (customOrderForm) {
    customOrderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(customOrderForm);

        const bookTitle = formData.get("bookTitle").trim();
        const author = formData.get("author").trim();
        const message = formData.get("message").trim();

        if (!bookTitle || !author || !message) {
            showMessage("Моля, попълнете заглавие, автор и описание на идеята.", "error");
            return;
        }

        const customCartItem = {
            id: Date.now(),
            type: "custom",
            createdAt: new Date().toLocaleString("bg-BG"),

            book: {
                image: "./assets/images/pretty-book.png",
                title: bookTitle,
                author: `от ${author}`,
                price: "По договаряне"
            },

            customization: {
                coverMaterial: formData.get("coverMaterial") || "Не е избрано",
                coverColor: formData.get("coverColor") || "Не е избрано",
                edgeStyle: formData.get("edgeStyle") || "Не е избрано",
                edgeColors: formData.get("edgeColors") || "Не е избрано",
                initials: formData.get("engraving") || "Няма",
                dedicationDate: formData.get("dedicationDate") || "Няма",
                dedicationMessage: message
            }
        };

        const cart = getCart();

        cart.push(customCartItem);
        saveCart(cart);

        showMessage("Custom поръчката беше добавена в количката.", "success");

        setTimeout(() => {
            window.location.href = "./cart.html";
        }, 650);
    });
}