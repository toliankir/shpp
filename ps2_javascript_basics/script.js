/**
Simple element get method.
*/
function $(id){
	return document.getElementById(id);
}

/**
Add child element to parent node with HTML value.
*/
function addChild(parent, element, value) {
	console.log("Add element " + element + " with value:" + value)
	let el = document.createElement(element);
	if (value != null) el.innerText = value;
	parent.appendChild(el);
}

function ckeckNumber(element) {
	if (Math.round(element.value) != element.value) {
		console.log(`Wrong input data: ${element.value}`);
		element.value = Math.round(element.value);
	}
}

function checkByRegexp(element, reg) {
	const regResult = element.value.toString().match(reg) != null;
	console.log(`Checking ${element.value} for regexp ${reg.toString()} = ${regResult}`);
	if (!regResult) {
		element.value = "Wrong input data.";
	}
	
	return regResult;
}

/**
Function for Task 1.
*/
function task1(){
	console.log("Run task 1");
	const in1 = Number($("Task1Sum1").value);
	const in2 = Number($("Task1Sum2").value);
	let result = 0;

		for (let i=in1; i<=in2; i++) {
			result += i;
		}

	const parent = $("Task1");
	addChild(parent, "br");
	addChild(parent, "span", "Result: " + result);
	console.log("Tusk 1: first input value = " + in1 + ", second input value = " + in2 + 
		", result = " + result);
}

/**
Function for Task 2.
*/
function task2(){
	console.log("Run task 2");
	const in1 = Number($("Task2Sum1").value);
	const in2 = Number($("Task2Sum2").value);
	const numbersArray = $("Task2Numbers").value.split(",");
	 result = 0;

		for (let i=in1; i<=in2; i++) {
			if (numbersArray.indexOf(i.toString()[i.toString().length - 1]) != -1) {
				console.log(i);
				result += i;
			}
		}

	const parent = $("Task2");
	addChild(parent, "br");
	addChild(parent, "span", "Result: " + result);
	console.log("Tusk 2: first input value = " + in1 + ", second input value = " + in2 + 
		", result = " + result);
}

/**
Function for Task 3.
*/
function task3(){
	console.log("Run task 3");
	let drawElement;
	//If div exist, reset content
	if (drawElement = $("divDraw")) {
		drawElement.innerHTML = "";
	} else {
		drawElement = document.createElement("div");
		drawElement.setAttribute("id", "divDraw"); 
	}
	
	const parent = $("Task3");
	const count = Number($("Task3RowsCol").value);
	console.log(count);
	for (i = 0; i < count; i++) {

		const listNode = document.createElement("ul");
		for (i2 = 0; i2 < i; i2++) {
			const listItem = document.createElement("li");
			listItem.innerText = "*";
			listNode.appendChild(listItem);
		}
		drawElement.appendChild(listNode);

	}
	parent.appendChild(drawElement);
}

/**
Function for Task 4.
*/
function task4(){
	console.log("Run task 4");
	const seconds = Number($("Task4Seconds").value);
	const parent = $("Task4");
	let h = Math.round(seconds/ 60 / 60);
	h = (h < 10 ? "0" + h : h);
	let m = Math.round((seconds - (h * 60 * 60)) / 60);
	m = (m < 10 ? "0" + m : m);
	let  s = seconds - (h * 60 * 60) - (m * 60);
	s = (s < 10 ? "0" + s : s);
	addChild(parent,"br",null);
	addChild(parent,"span",  h + ":" + m + ":" + s);
}

/**
Function for Task 5.
*/
function task5(){
	console.log("Run task 5");
	const ar1 = ["лет", 0, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	const ar2 = ["год", 1, ];
	const ar3 = ["года", 2, 3, 4];
	const parent = $("Task5");
	const age = Number($("Task5Age").value);
	const lastNumeral = Number(age.toString()[age.toString().length - 1]);
	let str = "";

	if (ar1.indexOf(age) != -1 || ar1.indexOf(lastNumeral) != -1) {
		str = ar1[0];
	}
	if (ar2.indexOf(age) != -1 || ar2.indexOf(lastNumeral) != -1) {
		str = ar2[0];	
	}
	if (ar3.indexOf(age) != -1 || ar3.indexOf(lastNumeral) != -1) {
		str = ar3[0];
	}

	addChild(parent,"br",null);
	addChild(parent,"span", age + " " + str);
}

/**
Function for Task 7.
*/
function task6(){
	console.log("Run task 6");
	const dateFirst = new Date($("Task6FirstDate").value);
	const dateSecond = new Date($("Task6SecondDate").value);
	const parent = $("Task6");

	let diffSec = (dateSecond.getTime() - dateFirst.getTime()) / 1000;
	const year = Math.floor(diffSec / (365*24*60*60));
	diffSec = diffSec - year*365*24*60*60;
	const month = Math.floor(diffSec / (31*24*60*60));
	diffSec = diffSec - month*31*24*60*60;
	const days = Math.floor(diffSec / (24*60*60));
	diffSec = diffSec - days*24*60*60;
	const hour = Math.floor(diffSec / (60*60));
	diffSec = diffSec - hour*60*60;
	const minutes = Math.floor(diffSec / (60));
	diffSec = diffSec - minutes*60;
	const seconds = diffSec;
	
	diff = [year, month, days, hour, minutes, seconds];
	addChild(parent,"br",null);
	addChild(parent, "span", "между датами прошло " + year +" года, " + month + 
		" месяц, " + days +" дня, " + hour + " часов, " + minutes + " минут, " + seconds + " секунд");
}

/**
Function for Task 7.
*/
function task7(){
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

	let dayOfTheYear = 0;
	for (let i=0;i < birthday.getMonth(); i++) {
		dayOfTheYear += month[i];
	}

	dayOfTheYear += birthday.getDate();
	console.log("Day of the year: " + dayOfTheYear);

	for (let i=0; i<dates.length; i++) {
		if (dates[i].start < dayOfTheYear && dates[i].end > dayOfTheYear  ) {
			addChild(parent, "br", null);
			addChild(parent, "span", dates[i].title);
			addChild(parent, "br", null);
			const elImg = document.createElement("img");
			elImg.setAttribute("src", "img/" + dates[i].link);
			parent.appendChild(elImg);
		} 
	}
}

/**
Function for Task 8.
*/
function task8(){
	console.log("Run task 8");
	let drawElement;
	//If div exist, reset content
	if (drawElement = $("boardConvas")) {
		drawElement.innerHTML = "";
	} else {
		drawElement = document.createElement("div");
		drawElement.setAttribute("id", "boardConvas"); 
		drawElement.setAttribute("class", "Task8__canvas");
	}

	const parent = $("Task8")

	const size = $("Task8boardSize").value.split("x");
	const w = Number(size[0]);
	const h = Number(size[1]);
	let color = false;
	
	for (let i = 0; i < w * h; i++) {
		//If line is end
		if (i % w == 0) {
			addChild(drawElement, "br", null);
		}
		
		if (i % w == 0 && w % 2 == 0) {
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
function task9(){
	console.log("Run task 9");
	const parent = $("Task9");
	const room = Number($("Task9Room").value);
	const rooms = Number($("Task9Rooms").value);
	const floors = Number($("Task9Floors").value);
	const entrance = Math.round(room / (rooms * floors));
	const floor =  Math.round((room - (entrance * rooms)) / floors);
	addChild(parent, "br", null);
	addChild(parent, "span", "Entrance: " + entrance + ", floor: " + floor);
}

/**
Function for Task 10.
*/
function task10(){
	console.log("Run task 10");
	const parent = $("Task10");
	const num = $("Task10Input").value.toString();
	console.log(num);
	let result = 0;
	for (let i=0; i<num.length; i++) {
		let numeral = Number(num[i]);
		result += numeral;
	}
	addChild(parent, "br", null);
	addChild(parent, "span", result);
}

/**
Function for Task 11.
*/
function task11(){
	console.log("Run task 11");
	const parent = $("Task11");
	let text = $("Task11Text").value;
	// while (text.indexOf("http") != -1) {
	// 	text = text.replace("https://","").replace("http://","");
	// }
	let links = text.split(",").sort().map(item => item.replace(/^https?:\/\//i, ""));


	const list = document.createElement("ul");
	for (let i=0; i< links.length; i++) {
		const listItem = document.createElement("li");
		listItem.innerText = links[i];
		list.appendChild(listItem);
	}
	parent.appendChild(list);
}