const slideDelay = 300;
const CUSTOM_SELECT_CLASS = 'custom-select';
const CUSTOM_SELECT_CONTENT_CLASS = CUSTOM_SELECT_CLASS + '__content';
const CUSTOM_SELECT_SLIDER_CLASS = CUSTOM_SELECT_CLASS + '__slider';
const CUSTOM_SELECT_ITEM_CLASS_NAME = CUSTOM_SELECT_CLASS + '-item';
const CUSTOM_SELECT_CLICKED_CLASS_NAME = CUSTOM_SELECT_CLASS + '--clicked';


$('div' + '.' + CUSTOM_SELECT_CLASS).click((event) => {
    const selectObj = $(event.target).closest('.' + CUSTOM_SELECT_CLASS);
    const slider = $(selectObj).find('.' + CUSTOM_SELECT_SLIDER_CLASS);

    //Set position
    slider.css('top', selectObj.position().top + $(selectObj).height() + 2);
    slider.css('left', selectObj.position().left);
    slider.stop(true);

    if (slider.css('display') === 'none') {
        selectObj.toggleClass(CUSTOM_SELECT_CLICKED_CLASS_NAME);
    }
    slider.slideToggle(slideDelay, () => {
        if (slider.css('display') === 'none') {
            selectObj.toggleClass(CUSTOM_SELECT_CLICKED_CLASS_NAME);
        }
    });

});

//On item click sets its data to select.
$('.' + CUSTOM_SELECT_ITEM_CLASS_NAME).click((event) => {
    const clickedItem = $(event.target);
    const itemHtml = clickedItem.closest('.' + CUSTOM_SELECT_ITEM_CLASS_NAME).html();
    clickedItem.closest('.' + CUSTOM_SELECT_CLASS).find('.' + CUSTOM_SELECT_CONTENT_CLASS).html(itemHtml);
});

//
$("html").click((event) => {
    const selectObj = $(event.target).closest('.' + CUSTOM_SELECT_CLASS);

    //If clicks not on custom select element.
    $('.' + CUSTOM_SELECT_SLIDER_CLASS).each((sliderIndex, slider) => {
        if ($(slider)[0] !== selectObj.find('.' + CUSTOM_SELECT_SLIDER_CLASS)[0]) {
            $(slider).stop(true);
            $(slider).slideUp(slideDelay, () => {
                $(slider).closest('.' + CUSTOM_SELECT_CLASS).removeClass(CUSTOM_SELECT_CLICKED_CLASS_NAME);
            });
        }
    });
});

//Sets default checked option for all custom select elements.
$('div.' + CUSTOM_SELECT_ITEM_CLASS_NAME + '[data-checked]').each((index, el) => {
    $(el).closest('.' + CUSTOM_SELECT_CLASS).find('.' + CUSTOM_SELECT_CONTENT_CLASS).html($(el).html());
});

