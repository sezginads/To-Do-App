const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const hepsiniSilButonu = document.querySelector("#hepsiniSilButonu");
const görevListesi = document.querySelector("#task-list");
const dataKey = "items";
let items = [];

loadItems();

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  görevListesi.addEventListener("click", deleteItem);
  hepsiniSilButonu.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

function getItemsFromLS() {
  if (localStorage.getItem(dataKey))
    return JSON.parse(localStorage.getItem(dataKey));

  return [];
}

function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem(dataKey, JSON.stringify(items));
}

function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem(dataKey, JSON.stringify(items));
}

function createItem(text) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);

  görevListesi.appendChild(li);
}

function addNewItem(e) {
  if (!input.value) {
    alert("Lütfen bir görev ekleyiniz.");
    return;
  }

  createItem(input.value);

  setItemToLS(input.value);

  input.value = "";

  e.preventDefault();
}

function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("are you sure ?")) {
      e.target.parentElement.parentElement.remove();

      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

function deleteAllItems(e) {
  if (confirm("are you sure ?")) {
    while (görevListesi.firstChild) {
      görevListesi.removeChild(görevListesi.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}
