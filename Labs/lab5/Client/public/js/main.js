let items_container = document.querySelector('.items-container');
// MENU TOGLE BEGIN
let nav_bar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    nav_bar.classList.toggle('active');
    search_bar.classList.remove('active');
    if (header.style.backgroundColor != '#fff0de') {
        header.style.backgroundColor = '#fff0de';
    }
    else {
        header.style.backgroundColor = null;
    }
}
let header = document.querySelector('header');
window.addEventListener('scroll', () => header.classList.toggle('shadow', window.scrollY > 0))
// MENU TOGLE END
// WIDOW SCROLL BEGIN
window.onscroll = () => {
    nav_bar.classList.remove('active');
}
// WIDOW SCROLL END
// IMAGE PRELOAD BEGIN
const home_logo = document.querySelector('#home_logo');
const about_img = document.querySelector('#about_img');
const home_img = document.querySelector('#home_img');
const home = document.querySelector('#home');
function setSrc() {
    home_img.src = "./img/home_photo.png";
    home_logo.src = "./img/logo.png";
    about_img.src = "./img/about-img.png";
    home.style.cssText = `
    background: url(./img/home_bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;`;
}
setSrc();
// IMAGE PRELOAD END

// FETCH DATA BEGIN

let title;
let price;
let img_link;

function Fetch_Data() {
    fetch("http://localhost:3000/smartphones").then(
        (response) => {
            return response.text();
        }
    ).then((text) => {
        let imgArray = JSON.parse(text);
        imgArray.forEach(element => {
            title = element.title;
            price = element.price;
            img_link = element.image_link;
            Load_Data(title, price, img_link);
        });
    })
}
Fetch_Data();
// FETCH DATA END

// PASTE DATA TO HTML BEGIN
function Load_Data(title, price, image_link) {
    try {
        let items_container_title = items_container.querySelectorAll('.title');
        items_container_title.forEach(element => {
            if (element.textContext = title) {
                return;
            }
        });
    } catch (e) {
        console.log(e);
    }

    let item_template =
        `<div class="box">
            <img src="${image_link}">
            <h3 class="title">${title}</h3>
            <div class="content">
                <span>${price} grn</span>
            </div>
        </div>`
    let item = document.createElement('div');
    item.innerHTML = item_template;
    items_container.append(item);
}
// PASTE DATA TO HTML END