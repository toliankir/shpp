/**
 Simple element get method.
 */
function $(id) {
    return document.getElementById(id);
}

/**
 Add child element to parent node with HTML value.
 */
function addChild(parent, element, value = null, id = null) {
    console.log("Add element " + element + " with value:" + value);
    let el = document.createElement(element);
    if (value) {
        el.innerText = value;
    }
    if (id) {
        el.setAttribute("id", id);
    }
    parent.appendChild(el);
}

/**
 Checks number in input element
 */
function checkNumber(element) {
    if (element && Math.round(element.value) != element.value) {
        console.log(`Wrong input data: ${element.value}`);
        element.value = Math.round(element.value);
    }
}

/**
 *Checks input element value by regExp
 */
function checkByRegexp(element, reg) {
    const regResult = reg.test(element.value.toString());
    console.log(`Checking ${element.value} for regexp ${reg.toString()} = ${regResult}`);
    if (!regResult) {
        element.value = "Wrong input data.";
    }
    return regResult;
}

//Creates div object or clear it is if exist.
function createOrResetDivElement(id) {
    let element = $(id);
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
    if (/^\d*0$/.test(inputNumber.toString()) ||
        /^\d*1[1-9]$/.test(inputNumber.toString()) ||
        /^\d*[5-9]$/.test(inputNumber.toString())) {
        return zero;
    } else if (/^\d*1$/.test(inputNumber.toString())) {
        return one;
    } else if (/^\d*[2-4]$/.test(inputNumber.toString())) {
        return two;
    }
}


/**
 Function for Task 1.
 */
function task1() {
    console.log("Run task 1");
    const startNumber = Number($("Task1Sum1").value);
    const endNumber = Number($("Task1Sum2").value);
    const parent = $("Task1");
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
    console.log("Run task 2");
    const startNumber = Number($("Task2Sum1").value);
    const endNumber = Number($("Task2Sum2").value);
    const resultElement = createOrResetDivElement("task2ResultElement");
    const parent = $("Task2");

    if (/^[0-9,]*$/.test($("Task2Numbers").value)) {
        const numbersArray = $("Task2Numbers").value.split(",");
        result = 0;

        for (let i = startNumber; i <= endNumber; i++) {
            if (numbersArray.indexOf(Math.abs(i % 10).toString()) != -1) {
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
    console.log("Run task 3");
    const drawElement = createOrResetDivElement("divDraw");

    const parent = $("Task3");
    const count = Number($("Task3RowsCol").value);

    if (count >= 0) {
        for (i = 0; i < count; i++) {

            const listNode = document.createElement("ul");
            for (i2 = 0; i2 < (i + 1); i2++) {
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
    console.log("Run task 4");
    const seconds = Number($("Task4Seconds").value);
    const parent = $("Task4");
    const resultElement = createOrResetDivElement("task4ResultElement");
    const h = Math.round(seconds / 60 / 60).toString().padStart(2, "0");
    const m = Math.round((seconds - (h * 60 * 60)) / 60).toString().padStart(2, "0");
    const s = seconds - (h * 60 * 60) - (m * 60).toString().padStart(2, "0");

    addChild(resultElement, "span", `${h}:${m}:${s}`);
    parent.appendChild(resultElement);
}

/**
 Function for Task 5.
 */
function task5() {
    console.log("Run task 5");
    const parent = $("Task5");
    const resultElement = createOrResetDivElement("task5ResultElement");
    const age = Number($("Task5Age").value);
    addChild(resultElement, "span", `${age} ${getWordForNumber("лет", "год", "года", age)}`);
    parent.appendChild(resultElement);
}

/**
 Function for Task 6.
 */

function checkDate(inDate) {
    const calcDate = new Date(inDate.toString());
    if (!isNaN(calcDate)) {
        console.log(1234);
        return true;
    } else {
        return false;
    }
}

function task6() {
    console.log("Run task 6");
    if (checkDate($("Task6FirstDate").value) && checkDate($("Task6SecondDate").value)) {
        const dateFirst = new Date($("Task6FirstDate").value);
        const dateSecond = new Date($("Task6SecondDate").value);
        if (dateFirst.getTime() < dateSecond.getTime()) {
            const parent = $("Task6");
            const resultElement = createOrResetDivElement("task6ResultElement");

            let diff = (dateSecond.getTime() - dateFirst.getTime()) / 1000;
            const year = Math.floor(diff / (365 * 24 * 60 * 60));
            diff -= year * 365 * 24 * 60 * 60;
            const month = Math.floor(diff / (30 * 24 * 60 * 60));
            diff -= month * 30 * 24 * 60 * 60;
            const days = Math.floor(diff / (24 * 60 * 60));
            diff -= days * 24 * 60 * 60;
            const hours = Math.floor(diff / (60 * 60));
            diff -= hours * 60 * 60;
            const minutes = Math.floor(diff / (60));
            diff -= minutes * 60;
            const seconds = diff;

            addChild(resultElement, "span", `между датами прошло ${year} ${getWordForNumber("лет", "год", "года", year)}, ` +
                `${month} ${getWordForNumber("месяцев", "месяц", "месяца", month)}, ` +
                `${days} ${getWordForNumber("дней", "день", "дня", days)}, ` +
                `${hours} ${getWordForNumber("часов", "час", "часа", hours)}, ` +
                `${minutes} ${getWordForNumber("минут", "минута", "минут", minutes)}, ` +
                `${seconds} ${getWordForNumber("секунд", "секунда", "секунд", seconds)}`);
            parent.appendChild(resultElement);
        } else {
            alert("Wrong time interval.");
        }
    } else {
        alert("Wrong date format.");
    }
}

/**
 Function for Task 7.
 */
function task7() {
    console.log("Run task 7");
    dates = [
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
    const birthday = new Date($("Task7Birthday").value.toString());
    const parent = $("Task7");
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
}

/**
 Function for Task 8.
 */
function task8() {
    console.log("Run task 8");
    let drawElement = createOrResetDivElement("boardConvas");
    drawElement.setAttribute("class", "Task8__canvas");

    const parent = $("Task8")
    const size = $("Task8boardSize").value.split("x");
    const w = Number(size[0]);
    const h = Number(size[1]);
    let color = false;

    for (let i = 0; i < w * h; i++) {
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
    console.log("Run task 9");
    const parent = $("Task9");
    const room = Number($("Task9Room").value);
    const rooms = Number($("Task9Rooms").value);
    const floors = Number($("Task9Floors").value);
    const entrances = Number($("Task9Entrances").value);
    const resultElement = createOrResetDivElement("task9ResultElement");

    if (room > 0 && room <= entrances * floors * rooms && rooms > 0 && floors > 0 && entrances > 0) {
        const entrance = Math.trunc((room - 1) / (rooms * floors));
        const floor = Math.trunc((room - (entrance * floors * rooms)) / rooms);
        addChild(resultElement, "span", `Entrance: ${entrance + 1}, floor: ${floor === 0 ? 1 : floor}`);
        parent.appendChild(resultElement);
    } else {
        alert("Input date is out of range");
    }
}

/**
 Function for Task 10.
 */
function task10() {
    console.log("Run task 10");
    const parent = $("Task10");
    const resultElement = createOrResetDivElement("task10ResultElement");
    const num = $("Task10Input").value.toString().replace(/[^0-9]/g, "");

    console.log(num);
    if (num) {
        let result = 0;
        for (let i = 0; i < num.length; i++) {
            let numeral = Number(num[i]);
            result += numeral;
        }

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
    console.log("Run task 11");
    const parent = $("Task11");
    const resultElement = createOrResetDivElement("task11ResultElement");
    let text = $("Task11Text").value;
    let links = text.replace(/ /g, "").split(",").sort().map(item => item.replace(/^https?:\/\//i, ""));


    const list = document.createElement("ul");
    for (let i = 0; i < links.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = links[i];
        list.appendChild(listItem);
    }
    resultElement.appendChild(list);
    parent.appendChild(resultElement);
}