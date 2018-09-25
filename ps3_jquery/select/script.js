let animationEnd = true;
const animationDelay = 500;
const CUSTOM_SELECT_OBJ = 'div.custom-select';
const CUSTOM_SELECT_CONTENT_OBJ = 'div.custom-select__content';
const SLIDER_OBJ = 'div.slider';

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
    const slider = document.createElement('div');
    selectData.forEach((selectItemData) => {
        const newSliderItem = document.createElement('div');
        const elementContent = `<img class="custom-select__image" src="${selectItemData.image}">${selectItemData.title}`;
        $(newSliderItem).addClass('slider__item').html(elementContent).click(() => {
                $(CUSTOM_SELECT_CONTENT_OBJ).
                addClass('custom-select__content--selected').
                html(elementContent);
            }
        ).appendTo($(slider));
    });

    $(slider).addClass('slider').appendTo('div.custom-select');
    $(CUSTOM_SELECT_OBJ).click(() => {
        if (animationEnd) {
            selectToggle();
        }
    });

    $(document).click(() => {
        if (animationEnd && $(SLIDER_OBJ).css('display') === 'block') {
            selectToggle();
        }
    });

    function selectToggle() {
        const slider = $(SLIDER_OBJ);
        const customSelect = $(CUSTOM_SELECT_OBJ);
        if (slider.css('display') === 'none') {
            customSelect.toggleClass('custom-select--active');
        }
        animationEnd = false;
        slider.slideToggle(animationDelay, () => {
            animationEnd = true;
            if (slider.css('display') === 'none') {
                customSelect.toggleClass('custom-select--active');
            }
        });
    }
}