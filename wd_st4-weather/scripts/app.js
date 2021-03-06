const $allMenuItems = $('nav a');
const $forecast = $('.forecast');
const $nowWeather = $('.now');

const $mainContainer = $('.container');
const $error = $('.error');

const apiUrl = 'api/';
const startService = 'json';

const menuActiveClass = 'active';
const serviceAttributeName = 'data-service';

$(document).ready(() => {

    resetMenuActiveClass();

    $allMenuItems.on('click', (el) => {
        resetMenuActiveClass();
        el.preventDefault();
        const $item = $(el.target);
        const service = $item.attr(serviceAttributeName);
        addMenuItemActiveClass(service);
        setWeather(service);
    });

    addMenuItemActiveClass(startService);
    setWeather(startService);
});

/**
 * Add active class to settled menu element.
 * @param service
 */
function addMenuItemActiveClass(service) {
    $(`nav [${serviceAttributeName}=${service}]`).addClass(menuActiveClass);
}

/**
 * Removes all active class from all menu elements.
 */
function resetMenuActiveClass() {
    $allMenuItems.removeClass(menuActiveClass);
}

/**
 * Fill page by weather information from service response.
 * @param service
 */
function setWeather(service) {
    $error.hide();
    $mainContainer.show();

    $.getJSON(`${apiUrl}?service=${service}&UTCOffset=${(new Date).getTimezoneOffset()}`, (data) => {
        //Log status code to console if response not 200 Ok.
        if (data.code >= 300) {
            console.error(data.statusText);
            $error.show();
            $mainContainer.hide();
            return;
        }
        if (data.code > 200) {
            console.warn(data.statusText);
        }

        $forecast.html('');
        const weather = data.body.period;
        let nowWeather = null;
        const nowTimestamp = Date.now();
        weather.forEach((weatherForHour) => {
            const date = new Date(weatherForHour.timestamp * 1000);
            if (nowTimestamp > date) {
                nowWeather = weatherForHour;
            }
            const $weatherItem = $('<div class="hourly-forecast clearfix"></div>')
                .append(`<div class="forecast-date">${date.getHours().toString().padStart(2, '0')}:00</div>`)
                .append($('<div class="forecast-weather"></div>')
                    .append(`<div class="forecast-temperature">${weatherForHour.temperature} &deg;</div>`)
                    .append(`<div class="forecast-icon"><img class="svg-image" src="img/icons/${getImageFilename(weatherForHour.imageType)}"></div>`));
            $forecast.append($weatherItem);
        });

        if (nowWeather !== null) {
            const date = new Date(nowWeather.timestamp * 1000);
            $($nowWeather.find($('.date'))[0]).text(`${data.body.city} ${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}`);
            $($nowWeather.find($('.current-temperature'))[0])
                .html(nowWeather.temperature + '&deg;');
            $($nowWeather.find($('.weather-icon'))[0])
                .html(`<img class="svg-image" src="img/icons/${getImageFilename(nowWeather.imageType)}">`);
        }
        imgToSvg();
    })
        .fail(() => {
            $mainContainer.hide();
            $error.show();
        });
}

/**
 * Replaces svg image DOM object by it's path.
 */
function imgToSvg() {
    $('img.svg-image').each((index, el) => {
        const $img = $(el);
        const imgSrc = $img.attr('src');
        $.get(imgSrc, (data) => {
            const $svg = $(data).find('svg');
            $img.replaceWith($svg);
        }, 'xml');
    });
}

/**
 * Return weather icon filename from response image type.
 * @param weatherType
 * @returns {string}
 */
function getImageFilename(weatherType) {
    switch (weatherType) {
        case 'FLASH':
            return '001-flash.svg';
        case 'SUN':
            return '002-sun.svg';
        case 'SKY':
            return '005-sky.svg';
        case 'SKYSUN':
            return '004-sky-1.svg';
        case 'RAIN':
            return '003-rain.svg';
    }
}