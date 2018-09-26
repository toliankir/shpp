let animationEnd = true;
const ANIMATION_DELAY = 500;
const CUSTOM_SELECT_OBJ = $('div.custom-select');
const CUSTOM_SELECT_CONTENT_OBJ = $('div.custom-select__content');
const SLIDER = 'div.slider';

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
    const slider = $('<div></div>');
    selectData.forEach((selectItemData) => {
        const elementContent = `<img class="custom-select__image" src="${selectItemData.image}">${selectItemData.title}`;
        $('<div></div>').addClass('slider__item').html(elementContent).on('click', () => {
                $(CUSTOM_SELECT_CONTENT_OBJ).addClass('custom-select__content--selected').html(elementContent);
            }
        ).appendTo($(slider));
    });
    $(slider).addClass('slider').appendTo('div.custom-select');

    CUSTOM_SELECT_OBJ.on('click', () => {
        if (animationEnd) {
            selectToggle();
        }
    });

    $(document).on('click', () => {
        if (animationEnd && $(SLIDER).css('display') === 'block') {
            selectToggle();
        }
    });

    function selectToggle() {
        const slider = $(SLIDER);
        if (slider.css('display') === 'none') {
            CUSTOM_SELECT_OBJ.toggleClass('custom-select--active');
        }
        animationEnd = false;
        slider.slideToggle(ANIMATION_DELAY, () => {
            animationEnd = true;
            if (slider.css('display') === 'none') {
                CUSTOM_SELECT_OBJ.toggleClass('custom-select--active');
            }
        });
    }
}