document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('new-task');
    const list = document.getElementById('task-list');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      list.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
          <button onclick="deleteTask(${index})">Delete</button>
        `;
        list.appendChild(li);
      });
    }
  
    window.toggleTask = function(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    window.deleteTask = function(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const taskText = input.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        input.value = '';
        saveTasks();
        renderTasks();
      }
    });
  
    renderTasks(); // Load saved tasks on startup
  });
