// --- Полный каталог товаров с ценами в PLN ---
const productsCatalog = [
  {name: "Куриное филе", price: 25, unit: "кг"},
  {name: "Свинина", price: 25, unit: "кг"},
  {name: "Рыба замороженная", price: 28, unit: "кг"},
  {name: "Масло растительное", price: 10, unit: "шт"},
  {name: "Масло сливочное", price: 7, unit: "шт"},
  {name: "Мука", price: 5, unit: "кг"},
  {name: "Рис", price: 14, unit: "кг"},
  {name: "Макароны", price: 10, unit: "кг"},
  {name: "Гречка", price: 14, unit: "кг"},
  {name: "Бобовые", price: 10, unit: "кг"},
  {name: "Сыр Gouda", price: 36, unit: "кг"},
  {name: "Яйца", price: 1.5, unit: "шт"},
  {name: "Хлеб", price: 7, unit: "шт"},
  {name: "Молоко", price: 6, unit: "л"},
  {name: "Йогурт", price: 2, unit: "шт"},
  {name: "Творог", price: 5, unit: "шт"},
  {name: "Творог с жижей", price: 2.35, unit: "шт"},
  {name: "Шоколад", price: 2, unit: "шт"},
  {name: "Фрукты", price: 7, unit: "кг"},
  {name: "Овощи", price: 10, unit: "кг"},
  {name: "Зубная паста", price: 10, unit: "шт"},
  {name: "Зубные щетки", price: 8, unit: "шт"},
  {name: "Мыло", price: 10, unit: "л"},
  {name: "Шампунь", price: 25, unit: "шт"},
  {name: "Туалетная бумага", price: 15, unit: "12 рулонов"},
  {name: "Чистящее средство кухня", price: 10, unit: "шт"},
  {name: "Средство для ванной/туалета", price: 10, unit: "шт"},
  {name: "Мусорные пакеты", price: 12, unit: "30 шт"},
  {name: "Губки/тряпки", price: 10, unit: "шт"},
  {name: "Батарейки", price: 20, unit: "4 шт"},
  {name: "Бумажные полотенца", price: 4, unit: "рулон"},
  {name: "Капсулы для посудомойки", price: 20, unit: "25 капсул"},
  {name: "Стиральный порошок", price: 40, unit: "25 капсул"},  
  {name: "Чай", price: 10, unit: "шт"},  
  {name: "Замороженные овощи", price: 7, unit: "шт"},  
];

// --- Предустановленные списки ---
let predefinedLists = {
  big: [
    {name: "Куриное филе", qty: 6}, {name: "Свинина", qty: 3},
    {name: "Рыба замороженная", qty: 1}, {name: "Масло растительное", qty: 1},
    {name: "Масло сливочное", qty: 3},
    {name: "Рис", qty: 2}, {name: "Макароны", qty: 3},
    {name: "Гречка", qty: 2}, {name: "Бобовые", qty: 1},
    {name: "Яйца", qty: 30},
    {name: "Чай", qty: 1},
    {name: "Замороженные овощи", qty: 4}
  ],
  small: [
    {name: "Хлеб", qty: 2}, 
    {name: "Йогурт", qty: 5}, 
    {name: "Фрукты", qty: 3},
    {name: "Овощи", qty: 2}, 
    {name: "Сыр Gouda", qty: 0.5},
    {name: "Творог с жижей", qty: 1},
    {name: "Шоколад", qty: 2},
  ],
  smaller: [
    {name: "Хлеб", qty: 4}, {name: "Молоко", qty: 6},
    {name: "Йогурт", qty: 6}, {name: "Фрукты", qty: 3},
    {name: "Овощи", qty: 4}, {name: "Сыр Gouda", qty: 0.5}
  ],
  house: [
    {name: "Стиральный порошок", qty: 1},
    {name: "Капсулы для посудомойки", qty: 1},
    {name: "Бумажные полотенца", qty: 8},
    {name: "Зубная паста", qty: 2},
    {name: "Туалетная бумага", qty: 1},
    {name: "Мыло", qty: 1}
  ]
};

let customLists = JSON.parse(localStorage.getItem("customLists")) || {};
let currentListKey = null;
let deleteTargetKey = null;

// --- Инициализация селекта ---
const productSelect = document.getElementById("product-select");
productsCatalog.forEach(p => {
  const option = document.createElement("option");
  option.value = p.name;
  option.textContent = `${p.name} (${p.price} PLN за ${p.unit})`;
  productSelect.appendChild(option);
});

// --- Переключение вкладок ---
function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(div => div.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tab + '-tab').style.display = 'block';
  document.querySelector(`.tab-btn[onclick="showTab('${tab}')"]`).classList.add('active');
}

// --- Показ списка ---
function showList(key) {
  currentListKey = key;
  const listEl = document.getElementById("shopping-list");
  listEl.innerHTML = "";
  const listItems = predefinedLists[key] || customLists[key] || [];
  let total = 0;

  listItems.forEach(item => {
    const catalogItem = productsCatalog.find(p => p.name === item.name);
    const price = (catalogItem.price * item.qty).toFixed(2);
    total += parseFloat(price);
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.qty} ${catalogItem.unit} (${price} PLN)`;
    li.addEventListener("click", () => li.classList.toggle("completed"));
    listEl.appendChild(li);
  });

  const totalEl = document.getElementById("total-price");
  totalEl.textContent = `Итоговая стоимость: ${total.toFixed(2)} PLN`;
  totalEl.className = total < 200 ? "green" : total < 400 ? "yellow" : "red";
}

// --- Добавление товара в редактор ---
function addProductToEditor() {
  const name = document.getElementById("product-select").value;
  const qty = parseFloat(document.getElementById("product-quantity").value);
  if(!qty || qty <= 0) return alert("Введите количество!");
  const editorList = document.getElementById("editor-list");
  const li = document.createElement("li");
  li.textContent = `${name} - ${qty}`;
  li.dataset.name = name;
  li.dataset.qty = qty;
  editorList.appendChild(li);
}

// --- Сохранение кастомного списка ---
function saveCustomList() {
  const listName = document.getElementById("new-list-name").value.trim();
  if(!listName) return alert("Введите название списка!");
  const items = Array.from(document.getElementById("editor-list").children).map(li => {
    return {name: li.dataset.name, qty: parseFloat(li.dataset.qty)};
  });
  if(items.length === 0) return alert("Добавьте хотя бы один товар!");
  customLists[listName] = items;
  localStorage.setItem("customLists", JSON.stringify(customLists));
  addCustomListButton(listName);
  document.getElementById("editor-list").innerHTML = "";
  document.getElementById("new-list-name").value = "";
  alert("Список сохранён!");
}

// --- Добавление кнопки кастомного списка ---
function addCustomListButton(name) {
  if(document.getElementById("list-buttons").querySelector(`button[data-key="${name}"]`)) return;
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.dataset.key = name;
  btn.onclick = () => showList(name);
  document.getElementById("list-buttons").appendChild(btn);
}

// --- Удаление текущего списка ---
function deleteCurrentList() {
  if(!currentListKey) return;
  deleteTargetKey = currentListKey;
  document.getElementById("modal").style.display = "block";
}

document.getElementById("confirm-delete").onclick = () => {
  if(customLists[deleteTargetKey]) {
    delete customLists[deleteTargetKey];
    localStorage.setItem("customLists", JSON.stringify(customLists));
  } else if(predefinedLists[deleteTargetKey]) {
    delete predefinedLists[deleteTargetKey];
  }
  document.getElementById("modal").style.display = "none";
  showList(null);
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// --- Инициализация кастомных списков ---
Object.keys(customLists).forEach(addCustomListButton);
