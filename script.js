const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
}

const productsCatalog = [
  {name: "Куриное филе", price: 25, unit: "кг"},
  {name: "Вода (1.5 л)", price: 3, unit: "шт"},
  {name: "Вода (5 л)", price: 4.99, unit: "шт"},
  {name: "Свинина", price: 24.90, unit: "кг"},
  {name: "Рыба замороженная", price: 17.80, unit: "кг"},
  {name: "Масло растительное", price: 7.99, unit: "шт"},
  {name: "Масло сливочное", price: 9.49, unit: "шт"},
  {name: "Мука", price: 5, unit: "кг"},
  {name: "Рис", price: 3.99, unit: "кг"},
  {name: "Макароны", price: 7.50, unit: "кг"},
  {name: "Гречка", price: 6.49, unit: "кг"},
  {name: "Бобовые", price: 11.80, unit: "кг"},
  {name: "Сыр Gouda", price: 31.99, unit: "кг"},
  {name: "Яйца", price: 1.5, unit: "шт"},
  {name: "Хлеб", price: 7, unit: "шт"},
  {name: "Молоко", price: 6, unit: "л"},
  {name: "Йогурт", price: 2.49, unit: "шт"},
  {name: "Сметана", price: 4, unit: "шт"},
  {name: "Творог", price: 3.29, unit: "шт"},
  {name: "Творог с жижей", price: 2.35, unit: "шт"},
  {name: "Шоколад", price: 2.49, unit: "шт"},
  {name: "Фрукты", price: 7, unit: "кг"},
  {name: "Овощи", price: 10, unit: "кг"},
  {name: "Зубная паста", price: 10, unit: "шт"},
  {name: "Зубные щетки", price: 8, unit: "шт"},
  {name: "Мыло", price: 10, unit: "л"},
  {name: "Шампунь", price: 25, unit: "шт"},
  {name: "Туалетная бумага", price: 13.79, unit: "12 рулонов"},
  {name: "Чистящее средство кухня", price: 10, unit: "шт"},
  {name: "Средство для ванной/туалета", price: 10, unit: "шт"},
  {name: "Мусорные пакеты", price: 12, unit: "30 шт"},
  {name: "Губки/тряпки", price: 10, unit: "шт"},
  {name: "Батарейки", price: 20, unit: "4 шт"},
  {name: "Бумажные полотенца", price: 4.99, unit: "упаковка(ок)"},
  {name: "Капсулы для посудомойки", price: 20, unit: "25 капсул"},
  {name: "Стиральный порошок", price: 40, unit: "25 капсул"},  
  {name: "Чай", price: 10, unit: "шт"},  
  {name: "Замороженные овощи", price: 7, unit: "шт"},  
  {name: "Дезодорант", price: 11, unit: "шт"},  
];

let predefinedLists = {
  big: [
    {name: "Куриное филе", qty: 6}, 
    {name: "Свинина", qty: 3},
    {name: "Рыба замороженная", qty: 1}, 
    {name: "Масло растительное", qty: 1},
    {name: "Масло сливочное", qty: 3},
    {name: "Рис", qty: 2}, 
    {name: "Макароны", qty: 3},
    {name: "Гречка", qty: 2}, 
    {name: "Бобовые", qty: 1},
    {name: "Яйца", qty: 30},
    {name: "Чай", qty: 1},
    {name: "Замороженные овощи", qty: 4},
    {name: "Дезодорант", qty: 3}
  ],
  small: [
    {name: "Хлеб", qty: 2}, 
    {name: "Йогурт", qty: 5}, 
    {name: "Фрукты", qty: 3},
    {name: "Овощи", qty: 2}, 
    {name: "Сыр Gouda", qty: 0.5},
    {name: "Творог", qty: 2},
    {name: "Творог с жижей", qty: 2},
    {name: "Шоколад", qty: 2},
    {name: "Вода (1.5 л)", qty: 6},
    {name: "Вода (5 л)", qty: 1},
    {name: "Сметана", qty: 1},
  ],
  smaller: [
    {name: "Хлеб", qty: 4}, {name: "Молоко", qty: 6}
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

const productSelect = document.getElementById("product-select");
productsCatalog.forEach(p => {
  const option = document.createElement("option");
  option.value = p.name;
  option.textContent = `${p.name} (${p.price} PLN за ${p.unit})`;
  productSelect.appendChild(option);
});

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(div => div.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tab + '-tab').style.display = 'block';
  document.querySelector(`.tab-btn[onclick="showTab('${tab}')"]`).classList.add('active');
}

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

    if (item.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", (e) => {
      li.classList.toggle("completed");
      item.completed = li.classList.contains("completed"); 
      if (customLists[key]) {
        localStorage.setItem("customLists", JSON.stringify(customLists)); 
      }
      createParticlesFromElement(li);
    });

    listEl.appendChild(li);
  });

  const totalEl = document.getElementById("total-price");
  totalEl.textContent = `Итоговая стоимость: ${total.toFixed(2)} PLN`;
  totalEl.className = total < 200 ? "green" : total < 400 ? "yellow" : "red";
}

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

function createParticlesFromElement(li) {
  const rect = li.getBoundingClientRect();
  
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    const angle = Math.random() * 2 * Math.PI;
    const distance = 20 + Math.random() * 30;

    const anim = particle.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) scale(0)`, opacity: 0 }
    ], {
      duration: 600 + Math.random()*400,
      easing: 'ease-out',
      fill: 'forwards' 
    });

    anim.onfinish = () => particle.remove();
  }
}

function addCustomListButton(name) {
  if(document.getElementById("list-buttons").querySelector(`button[data-key="${name}"]`)) return;
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.dataset.key = name;
  btn.onclick = () => showList(name);
  document.getElementById("list-buttons").appendChild(btn);
}

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

Object.keys(customLists).forEach(addCustomListButton);

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.fontSize = (10 + Math.random() * 20) + 'px';
  snowflake.style.animationDuration = (5 + Math.random() * 5) + 's';
  snowflake.textContent = '❄';

  document.getElementById('snow-container').appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 10000);
}

setInterval(createSnowflake, 300);
