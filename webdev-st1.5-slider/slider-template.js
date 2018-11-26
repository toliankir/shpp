const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];

const $sliderPreviews = $('.slider-previews');
const $sliderCurrent = $('.slider-current');

const classCurrentPreview = 'current';
const keyBack = 37;
const keyNext = 39;

let currentImageId = 0;

$(() => {
    IMAGES.forEach((el, id) => {
        $(`<li><img data-id=${id} src=${API_URL}${SMALL_SIZE}/${el}></li>`).appendTo($sliderPreviews);
    });
    setImage(currentImageId);

    $(document).on('keydown', (event) => {
        if (event.keyCode === keyBack) {
            currentImageId--;
            if (currentImageId < 0) {
                currentImageId = IMAGES.length - 1;
            }
        }

        if (event.keyCode === keyNext) {
            currentImageId++;
            if (currentImageId >= IMAGES.length) {
                currentImageId = 0;
            }
        }

        setImage(currentImageId);
    });

    $sliderPreviews.on('click', 'img', (el) => {
        const imageId = $(el.target).attr('data-id');
        currentImageId = imageId;
        setImage(imageId);
    });
});

function setImage(id) {
    $sliderCurrent.find('img').attr('src', `${API_URL}${BIG_SIZE}/${IMAGES[id]}`);
    setCurrentPreview(id);
}

function setCurrentPreview(id) {
    $sliderPreviews.find('.' + classCurrentPreview).removeClass(classCurrentPreview);
    $($sliderPreviews.find('li')[id]).attr('class', classCurrentPreview);
}