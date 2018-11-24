const $sliderPreviews = $('.slider-previews');
const $sliderCurrent = $('.slider-current');

const classCurrentPreview = 'current';
const keyBack = 'ArrowLeft';
const keyNext = 'ArrowRight';

let currentImageId = 0;

$(() =>{
    IMAGES.forEach((el, id) => {
        $(`<li><img data-id=${id} src=${API_URL}${SMALL_SIZE}/${el}></li>`).appendTo($sliderPreviews);
    });
   setImage(currentImageId);
});

document.addEventListener('keydown', (event) => {
    if (event.key === keyBack) {
        currentImageId--;
    }

    if (event.key === keyNext) {
        currentImageId++;
    }

    if (currentImageId < 0 || currentImageId > IMAGES.length - 1) {
        currentImageId = 0;
    }
    setImage(currentImageId);
});

$sliderPreviews.on('click', 'img', (el) => {
    const imageId = $(el.target).attr('data-id');
    currentImageId = imageId;
    setImage(imageId);
});

function setImage(id) {
    $sliderCurrent.find('img').attr('src', `${API_URL}${BIG_SIZE}/${IMAGES[id]}`);
    setCurrentPreview(id);
}

function setCurrentPreview(id) {
    const allPreviewElements = $sliderPreviews.find('li');
    allPreviewElements.removeClass(classCurrentPreview);
    $(allPreviewElements[id]).attr('class', classCurrentPreview);
}