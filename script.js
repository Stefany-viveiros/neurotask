// script.js - NeuroTask PRO (IA + Gamificação + Prioridade + Dashboard)

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let xp = parseInt(localStorage.getItem('xp')) || 0;

function saveAll() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('xp', xp);
}

function detectPriority(text) {
  const t = text.toLowerCase();
  if (t.includes('prova') || t.includes('urgente') || t.includes('trabalho')) return 'high';
  if (t.includes('estudar') || t.includes('projeto')) return 'medium';
  return 'low';
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  const task = {
    text,
    completed: false,
    priority: detectPriority(text),
    createdAt: new Date()
  };

  tasks.push(task);
  input.value = '';

  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;

  if (tasks[index].completed) {
    xp += 10;
  } else {
    xp -= 10;
  }

  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

function getPriorityColor(priority) {
  if (priority === 'high') return '#ff4d4d';
  if (priority === 'medium') return '#ffc107';
  return '#00c6ff';
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.sort((a, b) => {
    const order = { high: 3, medium: 2, low: 1 };
    return order[b.priority] - order[a.priority];
  });

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    if (task.completed) li.classList.add('completed');

    li.style.borderLeft = `5px solid ${getPriorityColor(task.priority)}`;

    li.innerHTML = `
      <span class="checkbox" onclick="toggleTask(${index})">✔</span>
      <span class="task-text">${task.text}</span>
      <span class="delete-btn" onclick="deleteTask(${index})">🗑</span>
    `;

    list.appendChild(li);
  });
}

function generateInsight() {
  const suggestion = document.getElementById('suggestion');

  const pending = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;

  if (tasks.length === 0) {
    suggestion.textContent = 'Adicione tarefas para receber insights inteligentes.';
  } else if (pending > done) {
    suggestion.textContent = 'Você está acumulando tarefas. Comece pela mais difícil AGORA.';
  } else if (done > pending) {
    suggestion.textContent = 'Alta performance detectada. Continue assim 🔥';
  } else {
    suggestion.textContent = 'Equilíbrio ok… mas você pode ir além.';
  }
}

function updateDashboard() {
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const level = Math.floor(xp / 50);

  document.getElementById('stats').innerHTML = `
    <p>✅ Concluídas: ${done}/${total}</p>
    <p>⚡ XP: ${xp}</p>
    <p>🏆 Nível: ${level}</p>
  `;
}

function init() {
  renderTasks();
  updateDashboard();
  generateInsight();
}

init();
