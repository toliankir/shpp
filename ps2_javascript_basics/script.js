/**
 Add child element to parent node with HTML value.
 */
function addChild(parent, element, value = null, id = null) {
    const el = document.createElement(element);
    if (value) {
        el.innerText = value;
    }
    if (id) {
        el.setAttribute("id", id);
    }
    parent.appendChild(el);
}

/**
 *Checks input element value by regExp
 */
function checkByRegexp(element, reg) {
    const regResult = reg.test(element.value.toString());
    if (!regResult) {
        alert("Wrong input data.");
        element.value = "";
    }
}

//Creates div object or clear it is if exist.
function createOrResetDivElement(id) {
    let element = document.getElementById(id);
    if (element) {
        element.innerHTML = "";
    } else {
        element = document.createElement("div");
        element.setAttribute("id", id);
    }
    return element;
}

//Gets the correct word for the plural
function getWordForNumber(zero, one, two, inputNumber) {
    lastOne = inputNumber % 10;
    lastTwo = inputNumber % 100;
    if ((lastTwo >= 10 && lastTwo <= 19) || lastOne == 0 || (lastOne >= 5 && lastOne <= 9)) {
        return zero;
    }
    if (lastOne == 1) {
        return one;
    }
    if (lastOne >= 2 && lastOne <= 4) {
        return two;
    }
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
 Function for Task 1.
 */
function task1() {
    const startNumber = Number(document.getElementById("Task1Sum1").value);
    const endNumber = Number(document.getElementById("Task1Sum2").value);
    const parent = document.getElementById("Task1");
    const resultElement = createOrResetDivElement("task1ResultElement");
    let result = 0;

    for (let i = startNumber; i <= endNumber; i++) {
        result += i;
    }

    addChild(resultElement, "span", result.toString());
    console.log(resultElement);
    // resultElement.innerHTML = `<span>${result}</span>`;
    parent.appendChild(resultElement);
    console.log(`Task 1: first input value = ${startNumber}, second input value = ${endNumber}, result = ${result}`);
}

/**
 Function for Task 2.
 */
function task2() {
    const startNumber = Number(document.getElementById("Task2Sum1").value);
    const endNumber = Number(document.getElementById("Task2Sum2").value);
    const resultElement = createOrResetDivElement("task2ResultElement");
    const parent = document.getElementById("Task2");

    if (/^[0-9,]*$/.test(document.getElementById("Task2Numbers").value)) {
        const numbersArray = document.getElementById("Task2Numbers").value.split(",");
        let result = 0;

        for (let i = startNumber; i <= endNumber; i++) {
            if (numbersArray.includes(Math.abs(i % 10).toString())) {
                result += i;
            }
        }
        addChild(resultElement, "span", result.toString());
        parent.appendChild(resultElement);
        console.log(`Tusk 2: first input value = ${startNumber}, second input value = ${endNumber}, result = ${result}`);
    } else {
        alert("Wrong input in \"Last numbers to calculate\"");
    }
}

/**
 Function for Task 3.
 */
function task3() {
    const drawElement = createOrResetDivElement("divDraw");

    const parent = document.getElementById("Task3");
    const count = Number(document.getElementById("Task3RowsCol").value);

    if (count >= 0) {
        for (let i = 0; i < count; i++) {

            const listNode = document.createElement("ul");
            for (let i2 = 0; i2 < (i + 1); i2++) {
                const listItem = document.createElement("li");
                listItem.innerText = "*";
                listNode.appendChild(listItem);
            }
            drawElement.appendChild(listNode);

        }
        parent.appendChild(drawElement);
    } else {
        alert("Rows count must be equals or more then 0;");
    }
}

/**
 Function for Task 4.
 */
function task4() {
    let seconds = Number(document.getElementById("Task4Seconds").value);
    const parent = document.getElementById("Task4");
    const resultElement = createOrResetDivElement("task4ResultElement");
    const h = Math.round(seconds / 60 / 60).toString().padStart(2, "0");
    seconds -= (h * 60 * 60);
    const m = Math.round(seconds / 60).toString().padStart(2, "0");
    const s = (seconds - (m * 60)).toString().padStart(2, "0");

    addChild(resultElement, "span", `${h}:${m}:${s}`);
    parent.appendChild(resultElement);
}

/**
 Function for Task 5.
 */
function task5() {
    const parent = document.getElementById("Task5");
    const resultElement = createOrResetDivElement("task5ResultElement");
    const age = Number(document.getElementById("Task5Age").value);
    addChild(resultElement, "span", `${age} ${getWordForNumber("лет", "год", "года", age)}`);
    parent.appendChild(resultElement);
}

/**
 Function for Task 6.
 */

function task6() {
    const firstDate = document.getElementById("Task6FirstDate").value;
    const secondDate = document.getElementById("Task6SecondDate").value;

    if (checkDate(firstDate, /\d{1,2}/) && checkDate(secondDate, /\d{1,2}/)) {
        const parent = document.getElementById("Task6");
        const resultElement = createOrResetDivElement("task6ResultElement");
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
        const firstDateMaxSize = [60, 60, 24, monthSize[dateFirst.getMonth()], 12, 0];

        let timeDifferent = [
            dateSecond.getFullYear() - dateFirst.getFullYear(),
            dateSecond.getMonth() - dateFirst.getMonth(),
            dateSecond.getDate() - dateFirst.getDate(),
            dateSecond.getHours() - dateFirst.getHours(),
            dateSecond.getMinutes() - dateFirst.getMinutes(),
            dateSecond.getSeconds() - dateFirst.getSeconds()
        ];

        for (let i = 5; i > 0; i--) {
            if (timeDifferent[i] < 0) {
                timeDifferent[i] += firstDateMaxSize[i];
                timeDifferent[i - 1]--;
            }
        }

        let msg = "между датами прошло - ";
        timeDifferent.forEach((item, key) => {
            msg += `${item} ${getWordForNumber(nameOfVariable[key][0], nameOfVariable[key][1], nameOfVariable[key][2], item)}, `;
        });
        addChild(resultElement, "span", msg);
        parent.appendChild(resultElement);
    } else {
        alert("Wrong date format.");
    }
}

/**
 Function for Task 7.
 */
function task7() {
    if (checkDate(document.getElementById("Task7Birthday").value, /\d{1,2}$/)) {
        const dates = [
            {
                start: 0,
                end: 19,
                link: "10.png",
                title: "Козерог"
            },
            {
                start: 80,
                end: 108,
                link: "1.png",
                title: "Овен"
            },
            {
                start: 109,
                end: 139,
                link: "2.png",
                title: "Телец"
            },
            {
                start: 140,
                end: 170,
                link: "3.png",
                title: "Близнецы"
            },
            {
                start: 171,
                end: 202,
                link: "4.png",
                title: "Рак"
            },
            {
                start: 203,
                end: 233,
                link: "5.png",
                title: "Лев"
            },
            {
                start: 234,
                end: 264,
                link: "6.png",
                title: "Дева"
            },
            {
                start: 264,
                end: 294,
                link: "7.png",
                title: "Весы"
            },
            {
                start: 295,
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
            },
            {
                start: 20,
                end: 79,
                link: "11.png",
                title: "Рыбы"
            }];
        const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const birthday = new Date(document.getElementById("Task7Birthday").value.toString());
        const parent = document.getElementById("Task7");
        const resultElement = createOrResetDivElement("task7ResultElement");

        let dayOfTheYear = 0;
        for (let i = 0; i < birthday.getMonth(); i++) {
            dayOfTheYear += month[i];
        }

        dayOfTheYear += birthday.getDate();
        console.log("Day of the year: " + dayOfTheYear);

        for (let i = 0; i < dates.length; i++) {
            if (dates[i].start <= dayOfTheYear && dates[i].end >= dayOfTheYear) {
                addChild(resultElement, "p", dates[i].title);

                const elImg = document.createElement("img");
                elImg.setAttribute("src", "img/" + dates[i].link);
                resultElement.appendChild(elImg);

                parent.appendChild(resultElement);
            }
        }
    } else {
        alert("Wrong date format.");
    }
}

/**
 Function for Task 8.
 */
function task8() {
    const drawElement = createOrResetDivElement("boardConvas");
    drawElement.setAttribute("class", "Task8__canvas");

    const parent = document.getElementById("Task8");
    const size = document.getElementById("Task8boardSize").value.split("x");
    const w = Number(size[0]);
    const h = Number(size[1]);
    let color = false;
    const steps = w * h;
    for (let i = 0; i < steps; i++) {
        //If line is end
        if (i % w === 0) {
            addChild(drawElement, "br");
        }

        if (i % w === 0 && w % 2 === 0) {
            color = !color;
        }

        color = !color;
        const boardElement = document.createElement("div");
        if (color) {
            boardElement.setAttribute("class", "Task8__item");
        } else {
            boardElement.setAttribute("class", "Task8__item Task8__marked");
        }

        drawElement.appendChild(boardElement);
    }
    parent.appendChild(drawElement);
}

/**
 Function for Task 9.
 */
function task9() {
    const parent = document.getElementById("Task9");
    const room = Number(document.getElementById("Task9Room").value);
    const rooms = Number(document.getElementById("Task9Rooms").value);
    const floors = Number(document.getElementById("Task9Floors").value);
    const entrances = Number(document.getElementById("Task9Entrances").value);
    const resultElement = createOrResetDivElement("task9ResultElement");

    if (room > 0 && room <= entrances * floors * rooms && rooms > 0 && floors > 0 && entrances > 0) {
        const entrance = Math.trunc((room - 1) / (rooms * floors));
        const floor = Math.trunc((room - (entrance * floors * rooms)) / rooms);
        addChild(resultElement, "span", `Entrance: ${entrance + 1}, floor: ${floor + 1}`);
        parent.appendChild(resultElement);
    } else {
        alert("Input date is out of range");
    }
}

/**
 Function for Task 10.
 */
function task10() {
    const parent = document.getElementById("Task10");
    const resultElement = createOrResetDivElement("task10ResultElement");
    const num = document.getElementById("Task10Input").value.toString().replace(/[^0-9]/g, "");

    if (num) {
        const result = num.split("").reduce((tmpResult, item) => {
            return Number(tmpResult) + Number(item);
        });
        addChild(resultElement, "span", result);
        parent.appendChild(resultElement);
    } else {
        alert("Input correct data.");
    }
}

/**
 Function for Task 11.
 */
function task11() {
    const parent = document.getElementById("Task11");
    const resultElement = createOrResetDivElement("task11ResultElement");
    const text = document.getElementById("Task11Text").value;
    const links = text.replace(/ /g, "").replace(/https?:\/\//ig, "").split(",").sort();


    const list = document.createElement("ul");
    for (let i = 0; i < links.length; i++) {
        const listItem = document.createElement("li");
        const linkItem = document.createElement("a");
        linkItem.innerText = links[i];
        linkItem.setAttribute("href", "http://" + links[i]);
        listItem.appendChild(linkItem);
        list.appendChild(listItem);
    }
    resultElement.appendChild(list);
    parent.appendChild(resultElement);
}