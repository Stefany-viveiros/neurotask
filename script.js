let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let xp = parseInt(localStorage.getItem('xp')) || 0;

// SALVAR
function saveAll() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('xp', xp);
}

// IA - fetch 
async function askAI(prompt) {
  try {
    const response = await fetch("http://localhost:3000/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro na resposta do fetch:", errorData);
      return "Erro na IA.";
    }

    const data = await response.json();
    return data.reply || "Erro na IA.";

  } catch (error) {
    console.error("Erro ao conectar com a IA:", error);
    return "Erro ao conectar com a IA.";
  }
}

// PRIORIDADE IA
async function detectPriorityAI(text) {
  const prompt = `Classifique a prioridade (high, medium, low): ${text}`;
  const response = await askAI(prompt);

  const res = response.toLowerCase();
  if (res.includes('high')) return 'high';
  if (res.includes('medium')) return 'medium';
  return 'low';
}

// ADICIONAR
async function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  input.disabled = true;
  const aiPriority = await detectPriorityAI(text);

  const task = {
    text,
    completed: false,
    priority: aiPriority,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  input.value = '';
  input.disabled = false;

  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

// EDITAR
function editTask(index) {
  const newText = prompt("Editar tarefa:", tasks[index].text);
  if (!newText?.trim()) return;

  tasks[index].text = newText.trim();
  saveAll();
  renderTasks();
  generateInsight();
}

// TOGGLE
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  xp += tasks[index].completed ? 10 : -10;
  xp = Math.max(0, xp);

  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

// DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAll();
  renderTasks();
  updateDashboard();
  generateInsight();
}

// COR PRIORIDADE
function getPriorityColor(priority) {
  return { high: '#ff4d4d', medium: '#ffc107', low: '#00c6ff' }[priority];
}

// RENDER
function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const order = { high: 3, medium: 2, low: 1 };

  tasks
    .sort((a, b) => order[b.priority] - order[a.priority])
    .forEach((task, index) => {
      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');
      li.style.borderLeft = `5px solid ${getPriorityColor(task.priority)}`;

      li.innerHTML = `
  <span class="checkbox" onclick="toggleTask(${index})">✔</span>
  <span class="task-text">${task.text}</span>
  <div class="actions">
    <span class="edit-btn" onclick="editTask(${index})">✏️</span>
    <span class="delete-btn" onclick="deleteTask(${index})">🗑</span>
  </div>
`;

      list.appendChild(li);
    });
}

// INSIGHT IA
async function generateInsight() {
  const suggestion = document.getElementById('suggestion');
  if (tasks.length === 0) {
    suggestion.textContent = 'Adicione tarefas para receber insights.';
    return;
  }

  suggestion.textContent = '⏳ Analisando...';

  const taskListText = tasks.map(t => t.text).join(', ');
  const aiResponse = await askAI(`Dê um conselho curto e motivador para: ${taskListText}`);
  suggestion.textContent = aiResponse;
}

// DASHBOARD
function updateDashboard() {
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  document.getElementById('stats').innerHTML = `
    <p>✅ ${done}/${total} concluídas</p>
    <p>⚡ XP: ${xp}</p>
  `;
}

// CHAT IA
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

  const loading = document.createElement('div');
  loading.textContent = 'IA está digitando...';
  chatBox.appendChild(loading);

  const aiResponse = await askAI(message);

  chatBox.removeChild(loading);

  const aiMsg = document.createElement('div');
  aiMsg.className = 'chat-message ai';
  aiMsg.textContent = aiResponse;
  chatBox.appendChild(aiMsg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

// INIT
function init() {
  renderTasks();
  updateDashboard();
  generateInsight();
}

init();