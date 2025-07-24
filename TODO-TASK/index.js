const API_URL = 'https://dummyjson.com/todos';
let todos = [];
let currentPage = 1;
const itemsPerPage = 5;

const todoList = document.getElementById('todoList');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const searchInput = document.getElementById('searchInput');
const fromDateInput = document.getElementById('fromDate');
const toDateInput = document.getElementById('toDate');

// Add createdDate field to each todo
function addCreatedDate(todo) {
  return {
    ...todo,
    createdDate: new Date(Date.now() - Math.random() * 1e10)
      .toISOString()
      .split('T')[0]
  };
}

// Show/Hide loading spinner
function setLoading(state) {
  loading.style.display = state ? 'block' : 'none';
}

// Display error message
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('d-none');
  setTimeout(() => errorDiv.classList.add('d-none'), 3000);
}

// Save todos to localStorage
function saveTodosToLocalStorage() {
  localStorage.setItem('myTodos', JSON.stringify(todos));
}

// Load from API or localStorage
async function fetchTodos() {
  try {
    setLoading(true);

    const localData = localStorage.getItem('myTodos');
    if (localData) {
      todos = JSON.parse(localData);
      renderTodos();
      return;
    }

    const res = await fetch(`${API_URL}?limit=100`);
    const data = await res.json();
    todos = data.todos.map(addCreatedDate);
    saveTodosToLocalStorage();
    renderTodos();
  } catch (err) {
    showError('Failed to fetch todos.');
  } finally {
    setLoading(false);
  }
}

// Render todos with filters and pagination
function renderTodos() {
  let filtered = [...todos];

  const search = searchInput.value.toLowerCase();
  if (search) {
    filtered = filtered.filter(todo =>
      todo.todo.toLowerCase().includes(search)
    );
  }

  const fromDate = fromDateInput.value;
  const toDate = toDateInput.value;
  if (fromDate && toDate) {
    filtered = filtered.filter(todo => {
      const date = new Date(todo.createdDate);
      return date >= new Date(fromDate) && date <= new Date(toDate);
    });
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  todoList.innerHTML = paginated.map(todo => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input type="checkbox" class="form-check-input me-2" ${todo.completed ? 'checked' : ''} disabled />
        <span style="${todo.completed ? 'text-decoration: line-through; color: gray;' : ''}">
          ${todo.todo}
        </span>
        <small class="text-muted d-block">📅 ${todo.createdDate}</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        ${!todo.completed ? `<button class="btn btn-sm btn-success" onclick="markAsDone(${todo.id})">✅ Mark as Done</button>` : ''}
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    </li>
  `).join('');

  renderPagination(filtered.length);
}

// Pagination rendering
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <button class="page-link" onclick="goToPage(${i})">${i}</button>
      </li>
    `;
  }
}

// Change current page
function goToPage(page) {
  currentPage = page;
  renderTodos();
}
window.goToPage = goToPage;

// Mark task as done
async function markAsDone(id) {
  try {
    setLoading(true);
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo);
    saveTodosToLocalStorage();
    renderTodos();

    // Optional fake API call
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true })
    });
  } catch (err) {
    showError('Failed to update todo.');
  } finally {
    setLoading(false);
  }
}
window.markAsDone = markAsDone;

// Delete task
async function deleteTodo(id) {
  try {
    setLoading(true);
    todos = todos.filter(todo => todo.id !== id);
    saveTodosToLocalStorage();
    renderTodos();

    // Optional fake API call
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
  } catch (err) {
    showError('Failed to delete todo.');
  } finally {
    setLoading(false);
  }
}
window.deleteTodo = deleteTodo;

// Add new todo
document.getElementById('todoForm').addEventListener('submit', async e => {
  e.preventDefault();
  const input = document.getElementById('newTodo');
  const newTask = input.value.trim();
  if (!newTask) return;

  try {
    setLoading(true);
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: newTask,
        completed: false,
        userId: 1
      })
    });

    const added = await res.json();
    const newTodo = addCreatedDate(added);
    todos.unshift(newTodo);
    saveTodosToLocalStorage();
    input.value = '';
    renderTodos();
  } catch (err) {
    showError('Failed to add todo.');
  } finally {
    setLoading(false);
  }
});

// Search + filter events
searchInput.addEventListener('input', () => {
  currentPage = 1;
  renderTodos();
});

document.getElementById('filterBtn').addEventListener('click', () => {
  currentPage = 1;
  renderTodos();
});

// Initial load
fetchTodos();
