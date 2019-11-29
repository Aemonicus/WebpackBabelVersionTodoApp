
import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'


// Fonction principale pour filtrer
const renderTodos = () => {

  const todoEl = document.querySelector('#todos')
  const filters = getFilters()
  const filteredTodos = getTodos().filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  // On vide le html pour éviter une liste interminable
  document.querySelector("#todos-list").innerHTML = "";

  document
    .querySelector("#todos-list")
    .appendChild(generateSummaryDOM(incompleteTodos));


  filteredTodos.forEach((todo) => {
    document.querySelector("#todos-list").appendChild(generateTodoDOM(todo));
  });

};


// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement('div')
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Set up todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Set up the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  todoEl.appendChild(containerEl)

  // Set up the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add('button', 'button--text')
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });


  return todoEl;
};


// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.classList.add('list-title')
  if (incompleteTodos.length > 1) {
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
  } else {
    summary.textContent = `You have ${incompleteTodos.length} todo left`;
  }
  return summary;
};

export { generateTodoDOM, renderTodos, generateSummaryDOM }