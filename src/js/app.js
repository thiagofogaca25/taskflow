const form = document.querySelector('#tarefaForm');
const lista = document.querySelector('#listaTarefas');
const filtro = document.querySelector('#filtro');
const status = document.querySelector('#status');
const temaBtn = document.querySelector('#temaBtn');

let tarefas = JSON.parse(localStorage.getItem('taskflow-tarefas') || '[]');

function salvar() {
  localStorage.setItem('taskflow-tarefas', JSON.stringify(tarefas));
}

function renderizar() {
  const valor = filtro.value;
  const visiveis = tarefas.filter(t => {
    if (valor === 'pendentes') return !t.concluida;
    if (valor === 'concluidas') return t.concluida;
    return true;
  });

  lista.innerHTML = '';
  status.textContent = `${visiveis.length} tarefa(s) exibida(s).`;

  visiveis.forEach(tarefa => {
    const li = document.createElement('li');
    li.className = `tarefa ${tarefa.concluida ? 'concluida' : ''}`;

    const titulo = document.createElement('h3');
    titulo.textContent = tarefa.titulo;

    const descricao = document.createElement('p');
    descricao.textContent = tarefa.descricao || 'Sem descrição.';

    const acoes = document.createElement('div');
    acoes.className = 'acoes';

    const concluir = document.createElement('button');
    concluir.className = 'btn btn-sec';
    concluir.type = 'button';
    concluir.textContent = tarefa.concluida ? 'Reabrir' : 'Concluir';
    concluir.setAttribute('aria-label', `${tarefa.concluida ? 'Reabrir' : 'Concluir'} tarefa ${tarefa.titulo}`);
    concluir.addEventListener('click', () => {
      tarefa.concluida = !tarefa.concluida;
      salvar();
      renderizar();
    });

    const excluir = document.createElement('button');
    excluir.className = 'btn btn-danger';
    excluir.type = 'button';
    excluir.textContent = 'Excluir';
    excluir.setAttribute('aria-label', `Excluir tarefa ${tarefa.titulo}`);
    excluir.addEventListener('click', () => {
      tarefas = tarefas.filter(item => item.id !== tarefa.id);
      salvar();
      renderizar();
    });

    acoes.append(concluir, excluir);
    li.append(titulo, descricao, acoes);
    lista.appendChild(li);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const dados = new FormData(form);
  const titulo = dados.get('titulo').trim();
  const descricao = dados.get('descricao').trim();

  if (!titulo) return;

  tarefas.push({
    id: Date.now(),
    titulo,
    descricao,
    concluida: false
  });

  salvar();
  form.reset();
  renderizar();
  document.querySelector('#tituloTarefa').focus();
});

filtro.addEventListener('change', renderizar);

temaBtn.addEventListener('click', () => {
  const escuro = document.body.classList.toggle('escuro');
  temaBtn.setAttribute('aria-pressed', String(escuro));
  temaBtn.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
  temaBtn.textContent = escuro ? 'Modo claro' : 'Modo escuro';
});

renderizar();


// Filtro de tarefas
let filtroAtual = "todas";

function filtrarTarefas(tarefas) {
  if (filtroAtual === "pendentes") {
    return tarefas.filter(tarefa => !tarefa.concluida);
  }

  if (filtroAtual === "concluidas") {
    return tarefas.filter(tarefa => tarefa.concluida);
  }

  return tarefas;
}

document.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-filtro]");
  if (!botao) return;

  filtroAtual = botao.dataset.filtro;

  document.querySelectorAll("[data-filtro]").forEach((item) => {
    item.classList.toggle("ativo", item === botao);
  });

  if (typeof renderizarTarefas === "function") {
    renderizarTarefas();
  }
});
