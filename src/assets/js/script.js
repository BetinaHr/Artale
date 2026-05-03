const text = "Сподели мислите си тук...";
const textarea = document.getElementById("message");

let i = 0;

function typeEffect() {
  if (i < text.length) {
    textarea.value += text.charAt(i);
    i++;
    setTimeout(typeEffect, 50);
  }
}

typeEffect();

textarea.addEventListener("click", () => {
    textarea.value = "";
})


