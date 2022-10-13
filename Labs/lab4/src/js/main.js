let search_bar = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search_bar.classList.toggle('active');
    nav_bar.classList.remove('active');
}
let nav_bar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    nav_bar.classList.toggle('active');
    search_bar.classList.remove('active');
    if (header.style.backgroundColor != 'var(--main-color)') {
        header.style.backgroundColor = 'var(--main-color)';
    }
    else {
        header.style.backgroundColor = null;
    }
}
let header = document.querySelector('header');
window.addEventListener('scroll', () => header.classList.toggle('shadow', window.scrollY > 0))

window.onscroll = () => {
    nav_bar.classList.remove('active');
    search_bar.classList.remove('active');
}
updateStocktotal()

let buttonMinus = document.querySelectorAll('.bx-minus')
for (let i = 0; i < buttonMinus.length; i++) {
    let button = buttonMinus[i];
    button.addEventListener('click', quantityChangedItemsMinus);
}
let buttonPlus = document.querySelectorAll('.bx-plus')
for (let i = 0; i < buttonPlus.length; i++) {
    let button = buttonPlus[i];
    button.addEventListener('click', quantityChangedItemsPlus)
}

let quantityInputs = document.getElementsByClassName('stock-quantity-input');
for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChangedStock)
}

let addToStockButtons = document.getElementsByClassName('btn-add');
for (let i = 0; i < addToStockButtons.length; i++) {
    let button = addToStockButtons[i];
    button.addEventListener('click', addTostockClicked);
}

let removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
}
let filterinput = document.querySelector('#search');
filterinput.addEventListener('keyup', filterTitles)


function quantityChangedItemsPlus(event) {
    let button = event.target;
    let currentQuant = parseFloat(button.previousElementSibling.value);

    button.previousElementSibling.value = currentQuant + 1;
}
function quantityChangedItemsMinus(event) {
    let button = event.target;

    let currentQuant = parseFloat(button.nextElementSibling.value);
    if (currentQuant <= 0) {
        return
    }
    else {
        button.nextElementSibling.value = currentQuant - 1;
    }
}

function filterTitles() {
    let filterValue = document.querySelector('#search').value.toUpperCase();
    let itemsContainer = document.querySelector('.items-container');
    let boxes = itemsContainer.querySelectorAll('.box');

    for (let i = 0; i < boxes.length; i++) {
        let item = boxes[i].querySelector('h3');
        if (item.textContent.toUpperCase().indexOf(filterValue) > -1) {
            boxes[i].style.display = '';
        }
        else {
            boxes[i].style.display = 'none';
        }
    }


}

function stockIndicatorAmount() {
    let itemsIndicator = document.querySelector('.stock-amount');
    let stockItemContainer = document.querySelector('.stock-items');
    itemsIndicator.textContent = stockItemContainer.children.length;
    if (itemsIndicator.textContent == 0) {
        itemsIndicator.style.display = "none";
    }
    else {
        itemsIndicator.style.display = "initial";
    }

}

function addTostockClicked(event) {
    let addbutton = event.target;
    let stockItem = addbutton.parentNode.parentNode;

    let title = stockItem.getElementsByTagName('h3')[0].textContent;
    let weight = parseFloat(stockItem.getElementsByTagName('span')[0].textContent.replace('kg', ''));
    let imgScr = stockItem.getElementsByTagName('img')[0].attributes[0].value;
    let quantity = parseFloat(stockItem.getElementsByClassName('quantity-num')[0].value);
    if (quantity <= 0) {
        quantity = 1;
    }
    addItemToStock(title, weight, imgScr, quantity);
    updateStocktotal();
    stockIndicatorAmount();
}
function addItemToStock(title, weight, imgScr, quantity) {
    let stockRow = document.createElement('div')
    let stockItemContainer = document.getElementsByClassName('stock-items')[0];
    let stockItemNames = stockItemContainer.getElementsByClassName('stock-item-title');


    for (let i = 0; i < stockItemNames.length; i++) {
        if (stockItemNames[i].textContent == title) {
            let currentRow = stockItemNames[i].parentNode.parentNode;
            currentRow.getElementsByClassName('stock-quantity-input')[0].value = parseFloat(currentRow.getElementsByClassName('stock-quantity-input')[0].value) + quantity;
            return;
        }
    }

    let stockRowContent = `
    <div class="stock-row">
        <div class="stock-item stock-column">
            <img class="stock-item-image" src="${imgScr}" width="100" height="100">
            <span class="stock-item-title">${title}</span>
        </div>
        <span class="stock-weight stock-column">${weight}kg</span>
        <div class="stock-quantity stock-column">
            <input class="stock-quantity-input" type="number" value="${quantity}">
            <button class="btn btn-danger" type="button">X</button>
        </div>
    </div>`
    stockRow.innerHTML = stockRowContent;
    stockItemContainer.append(stockRow);

    stockRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    stockRow.getElementsByClassName('stock-quantity-input')[0].addEventListener('change', quantityChangedStock);
}
function quantityChangedStock(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateStocktotal();
}
function removeCartItem(event) {
    let buttonClicked = event.target;
    // just hide
    // let removedNode = buttonClicked.parentNode.parentNode.remove();

    let stockItemContainer = document.getElementsByClassName('stock-items')[0];
    stockItemContainer.removeChild(buttonClicked.parentNode.parentNode.parentNode);

    updateStocktotal();
    stockIndicatorAmount();
}
function updateStocktotal() {
    let stockItemContainer = document.getElementsByClassName('stock-items')[0];
    let stockRows = stockItemContainer.getElementsByClassName('stock-row');
    let total = 0;
    for (let i = 0; i < stockRows.length; i++) {
        let stockRow = stockRows[i];

        let weightEl = stockRow.getElementsByClassName('stock-weight')[0];
        let quantEl = stockRow.getElementsByClassName('stock-quantity-input')[0];

        let weight = parseFloat(weightEl.textContent.replace('kg', ''));
        let quant = quantEl.valueAsNumber;
        total = total + (quant * weight);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('stock-total')[0].innerHTML = `\n                <h3>Total</h3>\n                <p>${total} kg</p>\n            `
}

async function addCustomer(title, body, imgScr, alt) {
    let customer = document.createElement('div');
    let CustomersContainer = document.querySelector('.volunteers-container');

    let CustomersContent = `
    <div class="box">
        <p>
            ${body}
        </p>
        <h3> ${title} </h3>
        <img src="${imgScr}" alt="${alt}">
    </div>`;
    customer.innerHTML = CustomersContent;
    CustomersContainer.append(customer);
}
async function Get_Posts_Users() {
    const limit = "7";
    const skip = "3";
    let response_posts = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`).then(resp => resp.json()).then(jsonp => jsonp.posts);
    let response_users = await fetch(`https://dummyjson.com/users?skip=${skip}&limit=${limit}`).then(resu => resu.json()).then(jsonu => jsonu.users);
   
    for (let i = 0; i < response_posts.length; i++) {
        let title = await response_posts[i].title;
        let body = await response_posts[i].body;
        let imgScr = `${response_users[i].image}`
        let alt = `volunteer${i}`;
        await addCustomer(title, body, imgScr, alt)
    };
}
Get_Posts_Users();


// weather api
let iconElement = document.querySelector(".weather-icon");
let tempElement = document.querySelector(".temperature-value p");
let descElement = document.querySelector(".temperature-description p");
let locationElement = document.querySelector(".location p");
let notificationElement = document.querySelector(".notification");

const weather = {};

weather.temperature = {
    unit: "celsius"
}

// По хорощому потрібно токен занести в файл .env і занести в .gitignore але в цьому випадку не буде працювати сайт
const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="./img/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});