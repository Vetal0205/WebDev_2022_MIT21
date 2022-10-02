let search_bar = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search_bar.classList.toggle('active');
}

let header = document.querySelector('header');
window.addEventListener('scroll', () => header.classList.toggle('shadow', window.scrollY > 0))