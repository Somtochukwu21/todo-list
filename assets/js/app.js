/**********************************
 *
 *
 * INITIALIZE ALL DOM and Attach event Listeners
 *
 *
 * **********************************
 */

class DomAcessor {
  #dom = document;
  #eventName = null;
  elem = null;

  query(selector, all = false) {
    this.elem = all
      ? this.#dom.querySelectorAll(selector)
      : this.#dom.querySelector(selector);
    return this;
  }
  event(eventName) {
    this.#eventName = eventName;
    return this;
  }

  listen(cb) {
    if (this.elem instanceof NodeList) {
      this.elem.forEach((el) => {
        this.#attach(el, cb);
      });
    } else {
      this.#attach(this.elem, cb);
    }

    return this;
  }

  #attach(el, cb) {
    if (!this.#eventName) {
      throw Error("no event attached");
    }
    el.addEventListener(this.#eventName, cb);
  }

  remove(selector) {
    if (!selector) {
      if (this.elem instanceof NodeList) {
        this.elem.forEach((el) => el.remove());
      } else {
        this.elem.remove();
      }
    } else {
      const elem = document.querySelectorAll(selector);
      elem.forEach((el) => el.remove());
    }
  }
}

function query(selector) {
  return document.querySelector(selector);
}

function queryAll(selector) {
  return document.querySelectorAll(selector);
}

/***
 *
 *
 * Todo Class
 *
 */

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

  edit(el) {
    let liContent = el.querySelector("span");
    let input = document.createElement("input");
    input.type = "text";
    input.value = liContent.textContent;
    el.append(input);
    input.focus();
    input.addEventListener("blur", () => {
      liContent.innerHTML = input.value;
      input.remove();
    });
  }

  removeAll(el) {
    this.todos = [];
    el.innerHTML = null;
  }
}

const todo = new Todo();
/**
 *
 *
 * Update UI
 *
 */
function addTodoUI(todo) {
  const todoUI = `<div class="todo-cont">
            <input type="checkbox" name="" id="todo-${todo.id}" />
            <label for="todo-${todo.id}">
              ${todo.title}
            </label>
          </div>
          <div class="todo-actions">
            <button class='"todo-ed-btn-${todo.id}"'>edit</button>
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
    console.log(query(`.todo-ed-btn-${todo.id}`));
}

function attachRemoveTodo(el, id) {
  el.addEventListener("click", () => {
    query(`.todo-item-${id}`).remove();
    todo.delete(id);
  });
}

/**
 *
 * Handle Event
 */

window.onload = (e) => {
  const todoAddBtn = query(".todo-add-btn");
  const todos = query(".todo-list");
  const todoTitle = query(".todo-title");
  const clearAllBtn = query(".clear-all-btn");

  todoAddBtn.addEventListener("click", () => {
    // get the todo text title
    const title = todoTitle.value;
    if (!title || title.trim() === "") {
      return false;
    }
    // add to array object
    const addedTodo = todo.addTodo(title);

    // update the textarea value
    todoTitle.value = null;

    // display todo to the UI
    addTodoUI(addedTodo);
  });

  clearAllBtn.addEventListener("click", () => todo.removeAll(todos));
};
