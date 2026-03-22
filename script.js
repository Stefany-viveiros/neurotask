let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Salvar no navegador
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adicionar tarefa
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();

  if (!text) return;

  const task = {
    text,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(task);
  input.value = '';

  saveTasks();
  renderTasks();
  generateInsight();
}

// Marcar como concluída
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  generateInsight();
}

// Deletar tarefa
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  generateInsight();
}

// Renderizar na tela
function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span class="checkbox" onclick="toggleTask(${index})">✔</span>
      <span class="task-text">${task.text}</span>
      <span class="delete-btn" onclick="deleteTask(${index})">🗑</span>
    `;

    list.appendChild(li);
  });
}

// Gerar "insight inteligente"
function generateInsight() {
  const suggestion = document.getElementById('suggestion');

  const pending = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;

  if (tasks.length === 0) {
    suggestion.textContent = 'Adicione tarefas para receber insights inteligentes.';
  } else if (pending > done) {
    suggestion.textContent = 'Você tem muitas tarefas pendentes. Comece pela mais difícil 💪';
  } else if (done > pending) {
    suggestion.textContent = 'Você está mandando muito bem! Continue assim 🚀';
  } else {
    suggestion.textContent = 'Equilíbrio perfeito. Que tal subir o nível hoje? 😏';
  }
}

// Inicializar
function init() {
  renderTasks();
  generateInsight();
}

init();