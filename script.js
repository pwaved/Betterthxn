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


// Elementos do DOM
const returnCheckbox = document.getElementById('local-devolve');
const localInput = document.getElementById('local');
const dataInicio = document.getElementById('data-inicio');
const dataFim = document.getElementById('data-fim');
const categoriaSelect = document.getElementById("categoria");
const imagens = document.querySelectorAll(".panelimage");
const buscarButton = document.getElementById("buscar");

// Adiciona ou remove os campos de devolução
function toggleReturnInput() {
  const existingInput = document.getElementById('local-devolucao');
  const existingLabel = document.getElementById('label-local-devolucao');

  if (returnCheckbox.checked) {
    if (!existingInput && !existingLabel) {
      const returnLabel = document.createElement('label');
      returnLabel.id = 'label-local-devolucao';
      returnLabel.setAttribute('for', 'local-devolucao');
      returnLabel.textContent = 'Local de Devolução:';

      const returnInput = document.createElement('input');
      returnInput.type = 'text';
      returnInput.name = 'local-devolucao';
      returnInput.id = 'local-devolucao';
      returnInput.placeholder = 'Digite o local de devolução';

      // Insere o input e o label após o campo "local"
      localInput.insertAdjacentElement('afterend', returnInput);
      localInput.insertAdjacentElement('afterend', returnLabel);
    }
  } else {
    existingInput?.remove();
    existingLabel?.remove();
  }
}

// Validações de datas
function validarData(input, referencia, mensagemErro, comparar) {
  const data1 = new Date(input.value);
  const data2 = new Date(referencia.value);

  if (!comparar(data1, data2)) {
    alert(mensagemErro);
    input.value = ''; // Limpa o campo inválido
  }
}

function validarDataRetirada() {
  validarData(
    dataInicio,
    // converte o objeto date para string no formato yyyy-mm-dd(split"T")HH:MM:SS:sssZ usando o toIsoString e split
    { value: new Date().toISOString().split('T')[0] }, // Data atual como referência
    "A data de retirada não pode ser anterior à data de hoje!",
    (dataRetirada, hoje) => dataRetirada >= new Date(hoje)
  );
}

function validarDataDevolucao() {
  validarData(
    dataFim,
    dataInicio,
    "A data de devolução não pode ser menor que a data de retirada!",
    (dataDevolucao, dataRetirada) => dataDevolucao >= dataRetirada
  );
}

// Seleção de categoria
function selecionarCategoriaPorImagem() {
  imagens.forEach((imagem) => {
    imagem.addEventListener('click', () => {
      const categoria = imagem.getAttribute("data-categoria");
      if (categoria) {
        categoriaSelect.value = categoria;
        alert(`Categoria ${categoria} selecionada!`);
      }
    });
  });
}

// Validação de todos os campos antes da busca
function validarCampos() {
  const localDevolve = document.getElementById('local-devolucao');

  if (!dataInicio.value || !dataFim.value || !categoriaSelect.value) {
    alert("Preencha todos os campos para realizar a busca!");
    return false;
  }
  //se o checkbox de devolução estiver marcado e o campo de devolução estiver vazio
  if (returnCheckbox.checked && (!localDevolve || !localDevolve.value.trim())) {
    alert("Preencha o local de devolução!");
    return false;
  }

  return true;
}

// Eventos
returnCheckbox.addEventListener('change', toggleReturnInput);
dataInicio.addEventListener('change', validarDataRetirada);
dataFim.addEventListener('change', validarDataDevolucao);
buscarButton.addEventListener('click', () => {
  if (validarCampos()) {
    window.location.href = 'pagina-de-pagamento.html'; // Redireciona para a página correta
  }
});
selecionarCategoriaPorImagem();
