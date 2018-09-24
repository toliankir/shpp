let animationEnd = true;
const selectData = [
    {
        title: "test 1",
        image: "img/1.png"
    },
    {
        title: "test 2",
        image: "img/2.png"
    },
    {
        title: "test 3",
        image: "img/3.png"
    },
    {
        title: "test 4",
        image: "img/4.png"
    },
    {
        title: "test 5",
        image: "img/5.png"
    }];

customSelectInit(selectData);

function customSelectInit(selectData) {
    const newSlider = document.createElement('div');
    selectData.forEach((element) => {
        const newSliderItem = document.createElement('div');
        const elementContent = `<img class="custom-select__image" src="${element.image}">${element.title}`;
        $(newSliderItem).addClass('slider__item').html(elementContent).click(() => {
                $('div.custom-select__content').
                addClass('custom-select__content--selected').
                html(elementContent);
            }
        ).appendTo($(newSlider));
    });

    $(newSlider).addClass('slider').appendTo('div.custom-select');
    $('div.custom-select').click(() => {
        if (animationEnd) {
            selectToggle();
        }
    });

    $(document).click(() => {
        if (animationEnd && $('div.slider').css('display') === 'block') {
            selectToggle();
        }
    });

    function selectToggle() {
        const slider = $('div.slider');
        const customSelect = $('div.custom-select');
        if (slider.css('display') === 'none') {
            customSelect.toggleClass('custom-select--active');
        }
        animationEnd = false;
        slider.slideToggle(500, () => {
            animationEnd = true;
            if (slider.css('display') === 'none') {
                customSelect.toggleClass('custom-select--active');
            }
        });
    }
}