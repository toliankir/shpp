function scrollToClass(targetClass) {

    const body = $('html');
    const elementHeight = $(targetClass).height();
    const elementTop = $(targetClass).position().top;
    const windowHeight = body.height();

    let scrollPosition = elementTop - (windowHeight - elementHeight) / 2;
    if (elementHeight > windowHeight) {
        scrollPosition = elementTop;
    }

    body.animate({scrollTop: scrollPosition}, 500);
}

$(document).scroll(() => {
    const scrollUpButton = $('.button-up');
    const buttonActiveClass = 'button-up--active';

    if ($(this).scrollTop() === 0) {
        scrollUpButton.removeClass(buttonActiveClass);
    } else {
        scrollUpButton.addClass(buttonActiveClass);
    }
});
