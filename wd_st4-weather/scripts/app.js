const $allMenuItems = $('nav a');
const $forecast = $('.forecast');
const $nowWeather = $('.now');

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
        // $item.addClass('active');
        addMenuItemActiveClass(service);
        setWeather(service);

    });
    addMenuItemActiveClass(startService);
    setWeather(startService);
});

function addMenuItemActiveClass(service) {
    $(`nav [${serviceAttributeName}=${service}]`).addClass(menuActiveClass);

}

function resetMenuActiveClass() {
    $allMenuItems.removeClass(menuActiveClass);
}

function setWeather(service) {
    $.getJSON(`${apiUrl}?service=${service}`, (data) => {
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
                .append(`<div class="forecast-date">${date.getHours().toString().padStart(2, '0')}:${
                    date.getMinutes().toString().padStart(2, '0')}</div>`)
                .append($('<div class="forecast-weather"></div>')
                    .append(`<div class="forecast-temperature">${weatherForHour.temperature} &deg;</div>`)
                    .append(`<div class="forecast-icon"><img class="svg-image" src="img/icons/${getImageFilename(weatherForHour.imageType)}"></div>`));
            $forecast.append($weatherItem);
        });

        if (nowWeather !== null) {
            const date = new Date(nowWeather.timestamp * 1000);
            $($nowWeather.find($('.date'))[0]).text(`${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}`);
            $($nowWeather.find($('.current-temperature'))[0])
                .html(nowWeather.temperature + '&deg;');
            $($nowWeather.find($('.weather-icon'))[0])
                .html(`<img class="svg-image" src="img/icons/${getImageFilename(nowWeather.imageType)}">`);
        }
        imgToSvg();
    });
}

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

function getImageFilename(weatherType) {
    switch (weatherType) {
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