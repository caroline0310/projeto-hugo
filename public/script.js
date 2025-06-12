// Feedback simples
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-feedback");
  const mensagem = document.getElementById("mensagem-feedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      mensagem.textContent = "Obrigado pelo seu feedback! 💖";
      form.reset();
    });
  }
});
