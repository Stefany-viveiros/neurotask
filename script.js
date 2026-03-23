// script.js - NeuroTask PRO FINAL

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let xp = parseInt(localStorage.getItem('xp')) || 0;

function saveAll() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('xp', xp);
}

// CHAMADA PARA IA
async function askAI(prompt) {
  try {
    const response = await fetch("http://localhost:3000/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();

    if (!data.choices) {
      return "Erro na resposta da IA.";
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return "Erro ao conectar com a IA.";
  }
}

// DETECTAR PRIORIDADE COM IA
async function detectPriorityAI(text) {
  const prompt = `Classifique a prioridade da tarefa (responda apenas: high, medium ou low): ${text}`;
  const response = await askAI(prompt);

  if (response.toLowerCase().includes('high')) return 'high';
  if (response.toLowerCase().includes('medium')) return 'medium';
  return 'low';
}

// ADICIONAR TAREFA
async function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  const aiPriority = await detectPriorityAI(text);

  const task = {
    text,
    completed: false,
    priority: aiPriority,
    createdAt: new Date()
  };

  tasks.push(task);
  input.value = '';

  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

// EDITAR TAREFA ✏️
function editTask(index) {
  const newText = prompt("Editar tarefa:", tasks[index].text);

  if (!newText || newText.trim() === "") return;

  tasks[index].text = newText.trim();

  saveAll();
  renderTasks();
  generateInsight();
}

// CONCLUIR TAREFA ✔️
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  xp += tasks[index].completed ? 10 : -10;

  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

// DELETAR TAREFA 🗑️
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

// CORES POR PRIORIDADE
function getPriorityColor(priority) {
  if (priority === 'high') return '#ff4d4d';
  if (priority === 'medium') return '#ffc107';
  return '#00c6ff';
}

// RENDERIZAR TAREFAS
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

      <div class="actions">
        <span onclick="editTask(${index})">✏️</span>
        <span onclick="deleteTask(${index})">🗑</span>
      </div>
    `;

    list.appendChild(li);
  });
}

// INSIGHT COM IA 💡
async function generateInsight() {
  const suggestion = document.getElementById('suggestion');

  if (tasks.length === 0) {
    suggestion.textContent = 'Adicione tarefas para receber insights inteligentes.';
    return;
  }

  const taskListText = tasks.map(t => t.text).join(', ');

  const aiResponse = await askAI(
    `Analise essas tarefas e dê um conselho curto e motivador: ${taskListText}`
  );

  suggestion.textContent = aiResponse;
}

// DASHBOARD
function updateDashboard() {
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  document.getElementById('stats').innerHTML = `
    <p>✅ Concluídas: ${done}/${total}</p>
  `;
}

// CHAT COM IA 🤖
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');

  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  input.value = '';

  const aiResponse = await askAI(message);

  const aiMsg = document.createElement('div');
  aiMsg.className = 'chat-message ai';
  aiMsg.textContent = aiResponse;
  chatBox.appendChild(aiMsg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

// INICIALIZAÇÃO
function init() {
  renderTasks();
  updateDashboard();
  generateInsight();
}

init();