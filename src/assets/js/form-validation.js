document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("[data-form-type]");
    const messageBox = document.getElementById("siteMessage");

    if (!form || !messageBox) {
        return;
    }

    const formType = form.dataset.formType;

    const formConfigs = {
        commission: {
            requiredFields: [
                {
                    name: "fullName",
                    message: "Моля, въведете Вашето име и фамилия."
                },
                {
                    name: "email",
                    message: "Моля, въведете Вашия имейл адрес."
                },
                {
                    name: "bookTitle",
                    message: "Моля, въведете заглавието на книгата."
                },
                {
                    name: "author",
                    message: "Моля, въведете автора на книгата."
                },
                {
                    name: "coverMaterial",
                    message: "Моля, изберете материал на корицата."
                }
            ],
            successMessage:
                "Благодарим Ви! Вашата поръчка беше изпратена успешно. Ще се свържем с Вас скоро за уточняване на детайлите."
        },

        contact: {
            requiredFields: [
                {
                    name: "fullName",
                    message: "Моля, въведете Вашето име и фамилия."
                },
                {
                    name: "email",
                    message: "Моля, въведете Вашия имейл адрес."
                },
                {
                    name: "phone",
                    message: "Моля, въведете телефон за връзка."
                },
                {
                    name: "message",
                    message: "Моля, въведете Вашето съобщение."
                }
            ],
            successMessage:
                "Благодарим Ви! Вашето съобщение беше изпратено успешно. Ще се свържем с Вас скоро."
        }
    };

    const config = formConfigs[formType];

    if (!config) {
        return;
    }

    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = `site-message show ${type}`;

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    function clearErrors() {
        const fields = form.querySelectorAll("input, select, textarea");

        fields.forEach((field) => {
            field.classList.remove("input-error");
        });

        messageBox.className = "site-message";
        messageBox.textContent = "";
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();

        for (const fieldInfo of config.requiredFields) {
            const field = form.elements[fieldInfo.name];

            if (!field || field.value.trim() === "") {
                field.classList.add("input-error");
                field.focus();

                showMessage(fieldInfo.message, "error");
                return;
            }
        }

        const emailField = form.elements["email"];

        if (emailField && !isValidEmail(emailField.value.trim())) {
            emailField.classList.add("input-error");
            emailField.focus();

            showMessage("Моля, въведете валиден имейл адрес.", "error");
            return;
        }

        showMessage(config.successMessage, "success");
        form.reset();
    });
});