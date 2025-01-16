function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Número de telefone copiado para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar para a área de transferência: ", err);
    });
}

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", function () {
    // Fecha todos os outros panels
    accordions.forEach((item) => {
      if (item !== this) {
        item.classList.remove("active");
        const otherPanel = item.nextElementSibling;
        otherPanel.style.maxHeight = null;
        otherPanel.classList.remove("open");
      }
    });

    // Alterna o estado do accordion clicado
    this.classList.toggle("active");

    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null; // Fecha o panel
      panel.classList.remove("open");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px"; // Abre o panel
      panel.classList.add("open");
    }
  });
});