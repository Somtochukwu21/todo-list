class Todo {
  todos = [];

  addTodo(title) {
    const todoId = Math.floor(Math.random() * 1 * Date.now()).toString(32);
    const todo = { title, id: todoId };
    this.todos.push(todo);

    return todo;
  }

  delete(id) {
    this.todos = this.todos.filter((de) => {
      if (de.id !== id) {
        return true;
      }
      return false;
    });
  }

  removeAll(el) {
    this.todos = [];
    el.innerHTML = null;
  }
}

const todo = new Todo();

function addTodoUI(todo) {
  const todoUI = `
    <div class="todo-cont">
      <input type="checkbox" name="" id="todo-${todo.id}" />
      <label for="todo-${todo.id}">
        ${todo.title}
      </label>
    </div>
          
    <div class="todo-actions">
      <button class="todo-ed-btn-${todo.id}">edit</button>
      <button class="todo-rm-btn-${todo.id}">delete</button>
    </div>
        `;

  const li = document.createElement("li");
  li.classList.add(`todo`);
  li.classList.add(`todo-item-${todo.id}`);
  li.innerHTML = todoUI;

  const domFragment = document.createDocumentFragment();
  domFragment.appendChild(li);

  const todos = query(".todo-list");
  todos.appendChild(domFragment);
  attachRemoveTodo(query(`.todo-rm-btn-${todo.id}`), todo.id);

  attachEditTodo(query(`.todo-ed-btn-${todo.id}`));

  checkBox(`#todo-${todo.id}`)
}

function attachRemoveTodo(el, id) {
  el.addEventListener("click", () => {
    query(`.todo-item-${id}`).remove();
    todo.delete(id);
  });
}

function attachEditTodo(el) {
  el.addEventListener("click", () => {
    const label = el.parentElement.previousElementSibling.lastElementChild;

    if (el.innerText.toLowerCase() === "edit") {
      label.contentEditable = true;
      el.innerText = "save";
    } else {
      label.contentEditable = false;
      el.innerText = "edit";
    }
  });
}




function query(selector) {
  return document.querySelector(selector);
}

function queryAll(selector) {
  return document.querySelectorAll(selector);
}

window.addEventListener("load", () => {
  const form = query(".todo-form");
  const input = query(".todo-title");
  const todos = query(".todo-list");
  const clearAllBtn = query(".clear-all-btn");
  const pending = query(`[data-selection='pending']`);
  form.onsubmit = (e) => {
    e.preventDefault();

    const title = input.value;
    if (!title || title.trim() === "") {
      return false;
    }

    // adds the todo value
    const addedTodo = todo.addTodo(title);

    // update the textarea value
    input.value = null;

    // display todo to the UI
    addTodoUI(addedTodo);
  };

  clearAllBtn.addEventListener("click", () => todo.removeAll(todos));

  pending.onclick = () => {
    pending.classList.add('active')
    // pending.classList.add("active");
  };
});
