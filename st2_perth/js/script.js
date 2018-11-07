const menuShowBtn = document.getElementById('menu-show');
const menuHideBtn = document.getElementById('menu-hide');
const toTopBtn = document.getElementById('button-up');
const menu = document.getElementById('hidden-menu');

menuShowBtn.addEventListener('click', () => {
    menu.style.visibility = 'visible';
});

menuHideBtn.addEventListener('click', () => {
    menu.style.visibility = 'hidden';
});

toTopBtn.addEventListener('click', () => {
    scrollToTop();
});

function scrollToTop() {
    const scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition - (scrollPosition / 10));
        window.requestAnimationFrame(scrollToTop);
    }
}