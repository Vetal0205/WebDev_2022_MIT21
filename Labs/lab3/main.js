
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


let quantityInputs = document.getElementsByClassName('stock-quantity-input');
for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
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




function stockIndicatorAmount(){
    let itemsIndicator = document.querySelector('.stock-amount');
    let stockItemContainer = document.querySelector('.stock-items');
    console.log(stockItemContainer);
    itemsIndicator.textContent = stockItemContainer.children.length;
    if (itemsIndicator.textContent == 0){
        itemsIndicator.style.display = "none";
    }
    else{
        itemsIndicator.style.display = "initial";
    }
    
}


function addTostockClicked(event) {
    let addbutton = event.target;
    let stockItem = addbutton.parentNode.parentNode;

    let title = stockItem.getElementsByTagName('h3')[0].textContent;
    let weight = parseFloat(stockItem.getElementsByTagName('span')[0].textContent.replace('kg', ''));
    let imgScr = stockItem.getElementsByTagName('img')[0].attributes[0].value;
    let quantity = parseFloat(stockItem.getElementsByClassName('quantity-num')[0].textContent);
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
        if(stockItemNames[i].textContent == title){
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
    stockRow.getElementsByClassName('stock-quantity-input')[0].addEventListener('change', updateStocktotal);
}
function quantityChanged(event) {
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