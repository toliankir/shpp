let animationEnd = true;
const $select = $('.custom-select');
const $content = $('.custom-select__content');
const ANIMATION_DELAY = 500;
const SLIDER = '.slider';

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
    const slider = $('<div class="slider">');
    selectData.forEach((selectItemData) => {
        const elementContent = `<img class="custom-select__image" src="${selectItemData.image}">${selectItemData.title}`;
        $('<div class="slider__item">')
            .html(elementContent).on('click', () => {
                $($content)
                    .addClass('custom-select__content--selected')
                    .html(elementContent);
            }
        ).appendTo(slider);
    });
    slider.appendTo('.custom-select');

    $select.on('click', () => {
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
            $select.toggleClass('custom-select--active');
        }
        animationEnd = false;
        slider.slideToggle(ANIMATION_DELAY, () => {
            animationEnd = true;
            if (slider.css('display') === 'none') {
                $select.toggleClass('custom-select--active');
            }
        });
    }
}