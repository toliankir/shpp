const menuShowBtn = document.getElementById('menu-show');
const menuHideBtn = document.getElementById('menu-hide');
const menu = document.getElementById('hidden-menu');

menuShowBtn.addEventListener('click', () => {
    menu.style.visibility = 'visible';
});

menuHideBtn.addEventListener('click', () => {
    menu.style.visibility = 'hidden';
});