// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('new-todo');
    const prioritySelect = document.getElementById('priority');
    const todoList = document.getElementById('todo-list');
    const allButton = document.getElementById('all');
    const completedButton = document.getElementById('completed');
    const incompleteButton = document.getElementById('incomplete');

    let todos = [];

    function renderTodos(filter = 'all') {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (filter === 'completed') return todo.completed;
            if (filter === 'incomplete') return !todo.completed;
            return true;
        });

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                renderTodos(filter);
            });

            const text = document.createElement('span');
            text.textContent = `${todo.text} (${todo.priority})`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.addEventListener('click', () => {
                todos = todos.filter(t => t !== todo);
                renderTodos(filter);
            });

            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    addTodoButton.addEventListener('click', () => {
        const text = todoInput.value.trim();
        const priority = prioritySelect.value;
        if (text) {
            todos.push({ text, priority, completed: false });
            todoInput.value = '';
            renderTodos();
        }
    });

    allButton.addEventListener('click', () => renderTodos('all'));
    completedButton.addEventListener('click', () => renderTodos('completed'));
    incompleteButton.addEventListener('click', () => renderTodos('incomplete'));

    renderTodos();
});
