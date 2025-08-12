document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', () => addTask());
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask(taskText = null, isCompleted = false) {
        const text = taskText ?? todoInput.value.trim();
        if (text === '') {
            return;
        }

        const taskItem = document.createElement('li');
        if (isCompleted) {
            taskItem.classList.add('completed');
        }

        const taskContent = document.createElement('span');
        taskContent.textContent = text;
        taskItem.appendChild(taskContent);

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskActions.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✗';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });
        taskActions.appendChild(deleteBtn);

        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);

        if (!taskText) {
            todoInput.value = '';
            todoInput.focus();
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('todoTasks'));
        if (tasks) {
            tasks.forEach(task => addTask(task.text, task.completed));
        }
    }
});