function showCartFormError(form, message) {
    let messageBox = form.querySelector(".cart-form-message");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.className = "cart-form-message";
        form.prepend(messageBox);
    }

    messageBox.textContent = message;
    messageBox.classList.add("show", "error");
    messageBox.classList.remove("success");
}

function showCartFormSuccess(form, message) {
    let messageBox = form.querySelector(".cart-form-message");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.className = "cart-form-message";
        form.prepend(messageBox);
    }

    messageBox.textContent = message;
    messageBox.classList.add("show", "success");
    messageBox.classList.remove("error");
}

function clearCartFormErrors(form) {
    const messageBox = form.querySelector(".cart-form-message");
    const invalidInputs = form.querySelectorAll(".input-error");

    if (messageBox) {
        messageBox.textContent = "";
        messageBox.classList.remove("show", "error", "success");
    }

    invalidInputs.forEach((input) => {
        input.classList.remove("input-error");
    });
}

function markInputError(input) {
    if (input) {
        input.classList.add("input-error");
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9+\s()-]{7,20}$/.test(phone);
}

function validateCartCheckoutForm(form) {
    clearCartFormErrors(form);

    const nameInput = form.querySelector('[name="customerName"]');
    const emailInput = form.querySelector('[name="customerEmail"]');
    const phoneInput = form.querySelector('[name="customerPhone"]');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name.length < 3) {
        markInputError(nameInput);
        showCartFormError(form, "Моля, въведете име и фамилия.");
        return false;
    }

    if (!isValidEmail(email)) {
        markInputError(emailInput);
        showCartFormError(form, "Моля, въведете валиден имейл адрес.");
        return false;
    }

    if (!isValidPhone(phone)) {
        markInputError(phoneInput);
        showCartFormError(form, "Моля, въведете валиден телефонен номер.");
        return false;
    }

    showCartFormSuccess(form, "Данните са валидни.");
    return true;
}