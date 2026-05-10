const book = document.querySelector(".book");
const bookPages = document.getElementById("bookPages");
const pageOne = document.querySelector(".page-one");
const pageTwo = document.querySelector(".page-two");

let isSecondPage = false;
let isFlipping = false;

if (book && bookPages && pageOne && pageTwo) {
    book.addEventListener("click", () => {
        if (isFlipping) {
            return;
        }

        isFlipping = true;
        bookPages.classList.add("flipping");

        setTimeout(() => {
            isSecondPage = !isSecondPage;

            pageOne.classList.toggle("active", !isSecondPage);
            pageTwo.classList.toggle("active", isSecondPage);
        }, 330);

        setTimeout(() => {
            bookPages.classList.remove("flipping");
            isFlipping = false;
        }, 780);
    });
}