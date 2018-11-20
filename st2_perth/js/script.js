const menuShowBtn = document.getElementById('menu-show');
const menuHideBtn = document.getElementById('menu-hide');
const toTopBtn = document.getElementById('button-up');
const menu = document.getElementById('hidden-menu');
let prevScrollValue = document.documentElement.scrollTop;
let scrollDown = false;

menuShowBtn.addEventListener('click', () => {
    menu.style.visibility = 'visible';
    menuShowBtn.style.visibility = 'hidden';
});

menuHideBtn.addEventListener('click', () => {
    menu.style.visibility = 'hidden';
    menuShowBtn.style.visibility = 'visible';
});

toTopBtn.addEventListener('click', () => {
    scrollDown = false;
    scrollToTop();
});

window.addEventListener('scroll', () => {
    const scrollValue = document.documentElement.scrollTop;
    if (prevScrollValue < scrollValue) {
        scrollDown = true;
    }
    prevScrollValue = scrollValue;
});

function scrollToTop() {
    const scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > 0 && !scrollDown) {
        window.scrollTo(0, scrollPosition - (scrollPosition / 10));
        window.requestAnimationFrame(scrollToTop);
    }
}