function scrollToClass(id) {
    const elementHeight = $(id).height();
    const elementTop = $(id).position().top;
    const windowHeight = $("html, body").height();
    let scrollPosition = elementTop - (windowHeight - elementHeight) / 2;
    if (elementHeight > windowHeight) {
        scrollPosition = elementTop;
    }

    $("html, body").animate({scrollTop: scrollPosition}, 1000);
}