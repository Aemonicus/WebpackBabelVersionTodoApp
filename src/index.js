
import { renderTodos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'



// On appelle la fonction si on veut voir quelque chose..
renderTodos();

// On remplit l'objet search avec la valeur recherchée
document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderTodos(); // On rappelle la fonction dans le search pour le mettre à jour avec les données entrées dans le search car l'appel initial de la fonction renderNotes n'affiche que les données initiales
});

// ------------------- FILTRER dans un search input

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  const text = e.target.elements[0].value.trim()
  e.preventDefault();

  if (text.length > 0) {
    createTodo(text)
    renderTodos();
    e.target.elements[0].value = "";
  }
});

document.querySelector("#check").addEventListener("change", e => {
  setFilters({
    hideCompleted: e.target.checked
  })
  renderTodos();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'todos') {
    loadTodos()
    renderTodos()
  }
})


const calcul = (...numbers) => {
  let sum = 0
  numbers.forEach((num) => sum += num)
  return sum / numbers.length
}

console.log(calcul(10, 2, 46, 200))

const printTeam = (name, coach, ...players) => {
  return `Team: ${name} ; Coach: ${coach}; Players: ${players.join(', ')}`
}

console.log(printTeam('Liberty', 'Casey Penn', 'Marge', 'Aiden', 'Herbert', 'Sherry'))