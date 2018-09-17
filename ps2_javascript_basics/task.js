/**
 * Gets the correct word for the plural
 */
function getWordForNumber(zero, one, two, inputNumber) {
    while (inputNumber.toString().length > 4) {
        inputNumber = inputNumber.toString().substr(3, inputNumber.toString().length);
    }

    const lastOne = Math.abs(inputNumber % 10);
    const lastTwo = Math.abs(inputNumber % 100);
    console.log(inputNumber);
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
        el.classList.remove("input-data--error");
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

    if (!(/^-?[0-9]+$/.test(task1Sum1.value))) {
        resultElement.innerText = `Input correct data.`;
        task1Sum1.classList.add("input-data--error");
    }
    startNumber = parseInt(task1Sum1.value, 10);
    if (!(/^-?[0-9]+$/.test(task1Sum2.value))) {
        resultElement.innerText = `Input correct data.`;
        task1Sum2.classList.add("input-data--error");
    }
    endNumber = parseInt(task1Sum2.value, 10);

    if (startNumber > endNumber) {
        resultElement.innerText = `Input correct data.`;
        task1Sum1.classList.add("input-data--error");
        task1Sum2.classList.add("input-data--error");
    }
    if (document.getElementsByClassName("input-data--error").length > 0) {
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

    if (!(/^-?[0-9]+?$/.test(task2Sum1.value))) {
        resultElement.innerText = `Input correct data.`;
        task2Sum1.classList.add("input-data--error");
    }
    startNumber = parseInt(task2Sum1.value, 10);

    if (!(/^-?[0-9]+?$/.test(task2Sum2.value))) {
        resultElement.innerText = `Input correct data.`;
        task2Sum2.classList.add("input-data--error");
    }
    endNumber = parseInt(task2Sum2.value, 10);

    if (startNumber > endNumber) {
        resultElement.innerText = `Input correct data.`;
        task2Sum1.classList.add("input-data--error");
        task2Sum2.classList.add("input-data--error");
    }

    if (!(/^(?:[0-9]+,)*\d$/.test(numbers))) {
        resultElement.innerText = `Input correct data.`;
        task2Numbers.classList.add("input-data--error");
    }
    const numbersArray = numbers.split(",");

    if (document.getElementsByClassName("input-data--error").length > 0) {
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

    if (!(/^[0-9]+$/.test(countElement.value))) {
        resultElement.innerText = `Input correct data.`;
        countElement.classList.add("input-data--error");
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

    if (!(/^[0-9]+$/.test(secondsElement.value))) {
        resultElement.innerText = `Input correct data.`;
        secondsElement.classList.add("input-data--error");
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

    if (!(/^-?[0-9]+$/.test(ageElement.value))) {
        resultElement.innerText = `Input correct data.`;
        ageElement.classList.add("input-data--error");
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
        resultElement.innerText = `Input correct data.`;
        firstDateElement.classList.add("input-data--error");
    }
    if (!checkDate(secondDate, /\d{1,2}/)) {
        resultElement.innerText = `Input correct data.`;
        secondDateElement.classList.add("input-data--error");
    }
    if (document.getElementsByClassName("input-data--error").length > 0) {
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
        resultElement.innerText = `Input correct data.`;
        dateElement.classList.add("input-data--error");
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
        resultElement.innerText = `Input correct data.`;
        sizeElement.classList.add("input-data--error");
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

    if (!/^[0-9]+$/.test(roomElement.value)) {
        resultElement.innerText = `Input correct data.`;
        roomElement.classList.add("input-data--error");
    }
    if (!/^[0-9]+$/.test(roomsElement.value)) {
        resultElement.innerText = `Input correct data.`;
        roomsElement.classList.add("input-data--error");
    }
    if (!/^[0-9]+$/.test(floorsElement.value)) {
        resultElement.innerText = `Input correct data.`;
        floorsElement.classList.add("input-data--error");
    }
    if (!/^[0-9]+$/.test(entrancesElement.value)) {
        resultElement.innerText = `Input correct data.`;
        entrancesElement.classList.add("input-data--error");
    }

    let room = parseInt(roomElement.value, 10);
    const rooms = parseInt(roomsElement.value, 10);
    const floors = parseInt(floorsElement.value, 10);
    const entrance = parseInt(entrancesElement.value, 10);

    if (room < 1) {
        resultElement.innerText = `Input correct data.`;
        roomElement.classList.add("input-data--error");
    }
    if (rooms < 1) {
        resultElement.innerText = `Input correct data.`;
        roomsElement.classList.add("input-data--error");
    }
    if (floors < 1) {
        resultElement.innerText = `Input correct data.`;
        floorsElement.classList.add("input-data--error");
    }
    if (entrance < 1) {
        resultElement.innerText = `Input correct data.`;
        entrancesElement.classList.add("input-data--error");
    }

    if (room > rooms * floors * entrance) {
        resultElement.innerText = `Input correct data.`;
        roomElement.classList.add("input-data--error");
        roomsElement.classList.add("input-data--error");
        floorsElement.classList.add("input-data--error");
        entrancesElement.classList.add("input-data--error");
    }

    if (document.getElementsByClassName("input-data--error").length > 0) {
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
        resultElement.innerText = `Input correct data.`;
        numElement.classList.add("input-data--error");
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