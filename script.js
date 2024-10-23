document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const statusMessage = document.getElementById('statusMessage');

    // Load todos from localStorage
    loadTodos();

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
            setStatusMessage('Item added successfully!', 'success');
            saveTodos();
        } else {
            setStatusMessage('Please enter a todo item.', 'error');
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addButton.click();
        }
    });

    function addTodoItem(text, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span ${completed ? 'style="text-decoration: line-through;"' : ''}>${text}</span>
            <button onclick="editTodoItem(this)">Edit</button>
            <button onclick="this.parentElement.remove(); saveTodos();">Delete</button>
        `;
        todoList.appendChild(li);
    }

    function setStatusMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        setTimeout(() => statusMessage.textContent = '', 3000); // Clear message after 3 seconds
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('input[type="checkbox"]').checked
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoItem(todo.text, todo.completed));
    }

    window.editTodoItem = function(button) {
        const li = button.parentElement;
        const span = li.querySelector('span');
        const newText = prompt('Edit todo item:', span.textContent);
        if (newText !== null) {
            span.textContent = newText;
            saveTodos();
        }
    };
});
