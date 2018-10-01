const $scrollUpButton = $('.button-up');
const BUTTON_ACTIVE_CLASS = 'button-up--active';

$(document).scroll(() => {
    if ($(this).scrollTop() === 0) {
        $scrollUpButton.removeClass(BUTTON_ACTIVE_CLASS);
    } else {
        $scrollUpButton.addClass(BUTTON_ACTIVE_CLASS);
    }
});

$('#gotoContent').on('click', () => {
    scrollToClass('.content');
});
$('#gotoDirections').on('click', () => {
    scrollToClass('.directions');
});
$('#gotoFooter').on('click', () => {
    scrollToClass('.footer');
});
$('.button-up').on('click', () => {
    scrollToClass('.header');
});

function scrollToClass(targetClass) {
    const page = $('html');
    const elementHeight = $(targetClass).height();
    const elementTop = $(targetClass).position().top;
    const windowHeight = page.height();

    let scrollPosition = elementTop - (windowHeight - elementHeight) / 2;
    if (elementHeight > windowHeight) {
        scrollPosition = elementTop;
    }

    page.animate({scrollTop: scrollPosition}, 500);
}

