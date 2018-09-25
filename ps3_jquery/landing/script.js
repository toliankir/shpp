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
        if ($(this).scrollTop() === 0) {
            if (scrollUpButton.css('opacity') === '1') {
                scrollUpButton.animate({opacity: 0}, 500, () => {
                    scrollUpButton.css('display', 'none');
                });
            }
        } else {
            scrollUpButton.css('display', 'block');
            if (scrollUpButton.css('opacity') === '0') {
                scrollUpButton.animate({opacity: 1}, 500, () => {

                });
            }
        }
    });
