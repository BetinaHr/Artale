const text = "Споделете мислите си тук...";
const textarea = document.getElementById("message");

let i = 0;

function typeEffect() {
  if (i < text.length) {
    textarea.value += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}

typeEffect();

textarea.addEventListener("click", () => {
    textarea.value = "";
})


