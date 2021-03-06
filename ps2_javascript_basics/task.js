const DATA_ERROR_CSS_CLASS = `input-data--error`;
const DATA_ERROR_MSG = `Input correct data.`;
const REGEXP_INTEGER = /^-?[0-9]+$/;
const REGEXP_INTEGER_POSITIVE = /^[0-9]+$/;
/**
 * Gets the correct word for the plural
 */
function getWordForNumber(zero, one, two, inputNumber) {
    while (inputNumber.toString().length > 4) {
        inputNumber = inputNumber.toString().substr(3, inputNumber.toString().length);
    }

    const lastOne = Math.abs(inputNumber % 10);
    const lastTwo = Math.abs(inputNumber % 100);
    if ((lastTwo >= 10 && lastTwo <= 19) || lastOne === 0 || (lastOne >= 5 && lastOne <= 9)) {
        return zero;
    }
    if (lastOne === 1) {
        return one;
    }
    if (lastOne >= 2 && lastOne <= 4) {
        return two;
    }
}

/**
 * Remove class input-data--error from all objects of DOM.
 */
function resetInputErrors() {
    const allInput = document.getElementsByClassName("input-data");
    Array.from(allInput).forEach((el) => {
        el.classList.remove(DATA_ERROR_CSS_CLASS);
    });
}

/**
 * Checks input date
 * @param inDate String with date
 * @param dayRegExp RegExp for finding the day.
 * @returns {boolean} return true if input date correct.
 */
function checkDate(inDate, dayRegExp) {
    const calcDate = new Date(inDate.toString());
    return Number(dayRegExp.exec(inDate)) === calcDate.getDate();
}

/**
 Functions for Task 1.
 */
function task1() {
    resetInputErrors();
    const task1Sum1 = document.getElementById("Task1Sum1");
    const task1Sum2 = document.getElementById("Task1Sum2");
    const resultElement = document.getElementById("task1ResultElement");
    let startNumber, endNumber, result = 0;

    if (!(REGEXP_INTEGER.test(task1Sum1.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        task1Sum1.classList.add(DATA_ERROR_CSS_CLASS);
    }
    startNumber = parseInt(task1Sum1.value, 10);
    if (!(REGEXP_INTEGER.test(task1Sum2.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        task1Sum2.classList.add(DATA_ERROR_CSS_CLASS);
    }
    endNumber = parseInt(task1Sum2.value, 10);

    if (startNumber > endNumber) {
        resultElement.innerText = DATA_ERROR_MSG;
        task1Sum1.classList.add(DATA_ERROR_CSS_CLASS);
        task1Sum2.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (document.getElementsByClassName(DATA_ERROR_CSS_CLASS).length > 0) {
        return;
    }

    for (let i = startNumber; i <= endNumber; i++) {
        result += i;
    }

    resultElement.innerText = result.toString();
}

/**
 Function for Task 2.
 */
function task2() {
    resetInputErrors();
    const task2Sum1 = document.getElementById("Task2Sum1");
    const task2Sum2 = document.getElementById("Task2Sum2");
    const task2Numbers = document.getElementById("Task2Numbers");
    const numbers = document.getElementById("Task2Numbers").value;
    const resultElement = document.getElementById("task2ResultElement");
    let startNumber, endNumber, result = 0;

    if (!(REGEXP_INTEGER.test(task2Sum1.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        task2Sum1.classList.add(DATA_ERROR_CSS_CLASS);
    }
    startNumber = parseInt(task2Sum1.value, 10);

    if (!(REGEXP_INTEGER.test(task2Sum2.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        task2Sum2.classList.add(DATA_ERROR_CSS_CLASS);
    }
    endNumber = parseInt(task2Sum2.value, 10);

    if (startNumber > endNumber) {
        resultElement.innerText = DATA_ERROR_MSG;
        task2Sum1.classList.add(DATA_ERROR_CSS_CLASS);
        task2Sum2.classList.add(DATA_ERROR_CSS_CLASS);
    }

    if (!(/^(?:[0-9]+,)*\d$/.test(numbers))) {
        resultElement.innerText = DATA_ERROR_MSG;
        task2Numbers.classList.add(DATA_ERROR_CSS_CLASS);
    }
    const numbersArray = numbers.split(",");

    if (document.getElementsByClassName(DATA_ERROR_CSS_CLASS).length > 0) {
        return;
    }

    for (let i = startNumber; i <= endNumber; i++) {
        if (numbersArray.includes(Math.abs(i % 10).toString())) {
            result += i;
        }
    }

    resultElement.innerText = result.toString();
}

/**
 Function for Task 3.
 */
function task3() {
    resetInputErrors();
    const countElement = document.getElementById("Task3RowsCol");
    const resultElement = document.getElementById("task3ResultElement");
    let count;

    if (!(REGEXP_INTEGER_POSITIVE.test(countElement.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        countElement.classList.add(DATA_ERROR_CSS_CLASS);
        return;
    }
    count = parseInt(countElement.value, 10);

    const listNode = document.createElement("ul");
    for (let i = 1; i <= count; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = '*'.repeat(i);
        listNode.appendChild(listItem);
    }
    resultElement.innerHTML = "";
    resultElement.appendChild(listNode);
}

/**
 Function for Task 4.
 */
function task4() {
    resetInputErrors();
    const secondsElement = document.getElementById("Task4Seconds");
    const resultElement = document.getElementById("task4ResultElement");
    let seconds;

    if (!(REGEXP_INTEGER_POSITIVE.test(secondsElement.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        secondsElement.classList.add(DATA_ERROR_CSS_CLASS);
        return;
    }
    seconds = parseInt(secondsElement.value, 10);

    const h = Math.floor(seconds / 60 / 60).toString().padStart(2, "0");
    seconds -= (h * 60 * 60);
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds - (m * 60)).toString().padStart(2, "0");

    resultElement.innerText = `${h}:${m}:${s}`;
}

/**
 Function for Task 5.
 */
function task5() {
    resetInputErrors();
    const ageElement = document.getElementById("Task5Age");
    const resultElement = document.getElementById("task5ResultElement");

    if (!(REGEXP_INTEGER.test(ageElement.value))) {
        resultElement.innerText = DATA_ERROR_MSG;
        ageElement.classList.add(DATA_ERROR_CSS_CLASS);
        return;
    }

    resultElement.innerText = `${ageElement.value} ${getWordForNumber("лет", "год", "года", ageElement.value)}`;
}

/**
 Function for Task 6.
 */
function task6() {
    resetInputErrors();
    const firstDateElement = document.getElementById("Task6FirstDate");
    const firstDate = firstDateElement.value;
    const secondDateElement = document.getElementById("Task6SecondDate");
    const secondDate = secondDateElement.value;
    const resultElement = document.getElementById("task6ResultElement");

    if (!checkDate(firstDate, /\d{1,2}/)) {
        resultElement.innerText = DATA_ERROR_MSG;
        firstDateElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (!checkDate(secondDate, /\d{1,2}/)) {
        resultElement.innerText = DATA_ERROR_MSG;
        secondDateElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (document.getElementsByClassName(DATA_ERROR_CSS_CLASS).length > 0) {
        return;
    }

    let dateFirst = new Date(firstDate);
    let dateSecond = new Date(secondDate);
    if (dateFirst > dateSecond) {
        const tmp = dateFirst;
        dateFirst = dateSecond;
        dateSecond = tmp;
    }
    const nameOfVariable = [
        ["лет", "год", "года"],
        ["месяцев", "месяц", "месяца"],
        ["дней", "день", "дня"],
        ["часов", "час", "часа"],
        ["минут", "минута", "минут"],
        ["секунд", "секунда", "секунд"]
    ];
    const monthSize = [31, (dateFirst.getFullYear() % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDateMaxSize = [0, 12, monthSize[dateFirst.getMonth()], 24, 60, 60];

    let timeDifferent = [
        dateSecond.getFullYear() - dateFirst.getFullYear(),
        dateSecond.getMonth() - dateFirst.getMonth(),
        dateSecond.getDate() - dateFirst.getDate(),
        dateSecond.getHours() - dateFirst.getHours(),
        dateSecond.getMinutes() - dateFirst.getMinutes(),
        dateSecond.getSeconds() - dateFirst.getSeconds()
    ];

    for (let i = timeDifferent.length - 1; i > 0; i--) {
        if (timeDifferent[i] < 0) {
            timeDifferent[i] += firstDateMaxSize[i];
            timeDifferent[i - 1]--;
        }
    }

    let msg = "между датами прошло - ";
    timeDifferent.forEach((item, key) => {
        msg += `${item} ${getWordForNumber(nameOfVariable[key][0], nameOfVariable[key][1], nameOfVariable[key][2], item)}, `;
    });
    resultElement.innerText = msg;

}

/**
 Function for Task 7.
 */
function task7() {
    const dates = [
        {
            start: 0,
            end: 19,
            link: "10.png",
            title: "Козерог"
        },
        {
            start: 20,
            end: 49,
            link: "11.png",
            title: "Водолей"
        },
        {
            start: 50,
            end: 79,
            link: "12.png",
            title: "Рыбы"
        },
        {
            start: 80,
            end: 109,
            link: "1.png",
            title: "Овен"
        },
        {
            start: 110,
            end: 140,
            link: "2.png",
            title: "Телец"
        },
        {
            start: 141,
            end: 171,
            link: "3.png",
            title: "Близнецы"
        },
        {
            start: 172,
            end: 203,
            link: "4.png",
            title: "Рак"
        },
        {
            start: 204,
            end: 234,
            link: "5.png",
            title: "Лев"
        },
        {
            start: 235,
            end: 265,
            link: "6.png",
            title: "Дева"
        },
        {
            start: 266,
            end: 295,
            link: "7.png",
            title: "Весы"
        },
        {
            start: 296,
            end: 325,
            link: "8.png",
            title: "Скорпион"
        },
        {
            start: 326,
            end: 355,
            link: "9.png",
            title: "Стрелец"
        },
        {
            start: 356,
            end: 365,
            link: "10.png",
            title: "Козерог"
        }];
    const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dateElement = document.getElementById("Task7Birthday");
    const resultElement = document.getElementById("task7ResultElement");

    if (!checkDate(dateElement.value, /\d{1,2}$/)) {
        resultElement.innerText = DATA_ERROR_MSG;
        dateElement.classList.add(DATA_ERROR_CSS_CLASS);
        return;
    }

    const birthday = new Date(dateElement.value);

    let dayOfTheYear = 0;
    for (let i = 0; i < birthday.getMonth(); i++) {
        dayOfTheYear += month[i];
    }

    dayOfTheYear += birthday.getDate();

    const sign = dates.find((el) => {
        if (el.start <= dayOfTheYear && el.end >= dayOfTheYear) {
            return el;
        }
    });

    resultElement.innerHTML = `<p>${sign.title}</p><img src="img/${sign.link}">`;
}

/**
 Function for Task 8.
 */
function task8() {
    resetInputErrors();
    const resultElement = document.getElementById("task8ResultElement");
    const sizeElement = document.getElementById("Task8boardSize");
    if (!/^[0-9]+[xх][0-9]+$/.test(sizeElement.value)) {
        resultElement.innerText = DATA_ERROR_MSG;
        sizeElement.classList.add(DATA_ERROR_CSS_CLASS);
        return;
    }
    const size = sizeElement.value.split(/[xх]/);
    const elementSize = 50;
    const w = Number(size[0]);
    const h = Number(size[1]);
    let color = false;
    const steps = w * h;

    resultElement.style.width = `${w * elementSize}px`;
    resultElement.innerHTML = "";

    for (let i = 0; i < steps; i++) {
        if (i % w === 0 && i !== 0) {
            resultElement.appendChild(document.createElement("br"));
        }
        if (i % w === 0 && w % 2 === 0) {
            color = !color;
        }

        color = !color;
        const boardElement = document.createElement("div");
        if (color) {
            boardElement.setAttribute("class", "task8__item");
        } else {
            boardElement.setAttribute("class", "task8__item task8__marked");
        }
        resultElement.appendChild(boardElement);
    }

}

/**
 Function for Task 9.
 */
function task9() {
    resetInputErrors();
    const roomElement = document.getElementById("Task9Room");
    const roomsElement = document.getElementById("Task9Rooms");
    const floorsElement = document.getElementById("Task9Floors");
    const entrancesElement = document.getElementById("Task9Entrances");
    const resultElement = document.getElementById("task9ResultElement");

    if (!REGEXP_INTEGER_POSITIVE.test(roomElement.value)) {
        resultElement.innerText = DATA_ERROR_MSG;
        roomElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (!REGEXP_INTEGER_POSITIVE.test(roomsElement.value)) {
        resultElement.innerText = DATA_ERROR_MSG;
        roomsElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (!REGEXP_INTEGER_POSITIVE.test(floorsElement.value)) {
        resultElement.innerText = DATA_ERROR_MSG;
        floorsElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (!REGEXP_INTEGER_POSITIVE.test(entrancesElement.value)) {
        resultElement.innerText = DATA_ERROR_MSG;
        entrancesElement.classList.add(DATA_ERROR_CSS_CLASS);
    }

    let room = parseInt(roomElement.value, 10);
    const rooms = parseInt(roomsElement.value, 10);
    const floors = parseInt(floorsElement.value, 10);
    const entrance = parseInt(entrancesElement.value, 10);

    if (room < 1) {
        resultElement.innerText = DATA_ERROR_MSG;
        roomElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (rooms < 1) {
        resultElement.innerText = DATA_ERROR_MSG;
        roomsElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (floors < 1) {
        resultElement.innerText = DATA_ERROR_MSG;
        floorsElement.classList.add(DATA_ERROR_CSS_CLASS);
    }
    if (entrance < 1) {
        resultElement.innerText = DATA_ERROR_MSG;
        entrancesElement.classList.add(DATA_ERROR_CSS_CLASS);
    }

    if (room > rooms * floors * entrance) {
        resultElement.innerText = DATA_ERROR_MSG;
        roomElement.classList.add(DATA_ERROR_CSS_CLASS);
        roomsElement.classList.add(DATA_ERROR_CSS_CLASS);
        floorsElement.classList.add(DATA_ERROR_CSS_CLASS);
        entrancesElement.classList.add(DATA_ERROR_CSS_CLASS);
    }

    if (document.getElementsByClassName(DATA_ERROR_CSS_CLASS).length > 0) {
        return;
    }

    room--;
    const entranceCalc = Math.trunc((room) / (rooms * floors));
    const floor = Math.trunc((room - (entranceCalc * floors * rooms)) / rooms);

    resultElement.innerText = `Entrance: ${entranceCalc + 1}, floor: ${floor + 1}`;
}

/**
 Function for Task 10.
 */
function task10() {
    resetInputErrors();
    const resultElement = document.getElementById("task10ResultElement");
    const numElement = document.getElementById("Task10Input");

    if (!/^-?[0-9]+[.,]?[0-9]*$/.test(numElement.value)) {
        resultElement.innerText = DATA_ERROR_MSG;
        numElement.classList.add(DATA_ERROR_CSS_CLASS);
        return;
    }
    const numStr = numElement.value.replace(/[^0-9]/g, "").split("");

    const num = numStr.map((el) => {
        return parseInt(el, 10);
    });


    resultElement.innerText = num.reduce((tmpResult, item) => {
        return tmpResult + item;
    }).toString();
}

/**
 Function for Task 11.
 */
function task11() {

    const resultElement = document.getElementById("task11ResultElement");
    const text = document.getElementById("Task11Text").value;
    const links = text.split(",").map((el) => {
        return el.trim().replace(/^https?:\/\//, "");
    }).sort();


    const list = document.createElement("ul");
    links.forEach((el) => {
        const listItem = document.createElement("li");
        const linkItem = document.createElement("a");
        linkItem.innerText = el;
        linkItem.setAttribute("href", `//${el}`);
        listItem.appendChild(linkItem);
        list.appendChild(listItem);
    });
    resultElement.innerHTML = "";
    resultElement.appendChild(list);
}