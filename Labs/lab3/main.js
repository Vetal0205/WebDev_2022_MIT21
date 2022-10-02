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
    else{
        header.style.backgroundColor = null;
    }
}
let header = document.querySelector('header');
window.addEventListener('scroll', () => header.classList.toggle('shadow', window.scrollY > 0))

window.onscroll = () => {
    nav_bar.classList.remove('active');
    search_bar.classList.remove('active');
}