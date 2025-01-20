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


const returnCheckbox = document.getElementById('local-devolve');
const localInput = document.getElementById('local');
// evento da mudança do checkbox
returnCheckbox.addEventListener('change', () => {
  let existingInput = document.getElementById('local-devolucao');
  let existingLabel = document.getElementById('label-local-devolucao'); 

  if (returnCheckbox.checked) {
    //evitar duplicação de campos
    if (!existingInput && !existingLabel) {
      const returnInput = document.createElement('input');
      const returnLabel = document.createElement('label');
      returnLabel.id = 'label-local-devolucao';
      returnLabel.setAttribute('for', 'local-devolucao');
      returnLabel.textContent = 'Local de Devolução:';
      returnInput.type = 'text';
      returnInput.name = 'local-devolucao';
      returnInput.id = 'local-devolucao';
      returnInput.placeholder = 'Digite o local de devolução';

      // insere o input do local de devolucao apos o local de retirada
      
      localInput.insertAdjacentElement('afterend', returnInput);
      localInput.insertAdjacentElement('afterend', returnLabel);
    }
    // remove os campos
  } else {
    if (existingInput && existingLabel) {
      existingInput.remove();
      existingLabel.remove();
    }
  }
});

const dataInicio = document.getElementById("data-inicio");
const dataFim = document.getElementById("data-fim");

function validarDataRetirada() {
  const hoje = new Date();
  const dataRetirada = new Date(dataInicio.value); 

  if (dataRetirada < hoje.setHours(0,0,0,0)) {
    alert("A data de retirada não pode ser anterior a data de hoje!");
    dataInicio.value = ''; // limpa o campo 
  }
}

function validarDataDevolucao() { 
  const dataRetirada = new Date(dataInicio.value);
  const dataDevolucao = new Date(dataFim.value);

  if(dataDevolucao < dataRetirada) {
    alert("A data de devolução não pode ser menor que a data de retirada!")
    dataFim.value = ''; // limpa o campo  
  }
}

dataInicio.addEventListener('change', validarDataRetirada); 
dataFim.addEventListener('change', validarDataDevolucao);
