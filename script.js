(() => {
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const tasksEl = document.getElementById('tasks');
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

  function render() {
    tasksEl.innerHTML = '';
    tasks.forEach((t, i) => {
      const li = document.createElement('li');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = t.done;

      const span = document.createElement('span');
      span.textContent = t.text;
      if (t.done) span.classList.add('done');

      cb.addEventListener('change', () => {
        tasks[i].done = cb.checked;
        save();
        span.classList.toggle('done', cb.checked);
      });

      const del = document.createElement('button');
      del.textContent = 'Удалить';
      del.className = 'delete';
      del.addEventListener('click', () => {
        tasks.splice(i, 1);
        save();
        render();
      });

      li.append(cb, span, del);
      tasksEl.appendChild(li);
    });
  }

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    save(); render();
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addBtn.click(); });

  render();
})();
