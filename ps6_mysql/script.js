const $chatContainer = $('#chatContainer');
const $loginContainer = $('#loginContainer');
const $sendContainer = $('#sendContainer');

const $userName = $('#userName');
const $userPassword = $('#userPassword');
const $errorResponse = $('#errorResponse');

const $chatData = $('#chatData');
const $chatDataList = $("#chatDataList");

const $message = $('#message');

const smiles = [
    "img/smile1.png",
    "img/smile2.png"
];

let timestamp = 0;
let requetTimeout;
let $ajaxXHR;

$('#login').on('click', () => {
    login($userName.val(), $userPassword.val());
});

$('#sendMessage').on('click', () => {
    sendMessage($message.val());
});

$sendContainer.keyup((event) => {
    if (event.keyCode === 13) {
        sendMessage($message.val());
    }
});

function login(login, password) {

    if (!checkLogin(login)) {
        $errorResponse.text('Type correct login');
        return;
    }

    if (!checkPassword(password)) {
        $errorResponse.text('Password must be more then 6 charsets');
        return;
    }

    imagePreload(smiles);

    $.ajax({
        url: './api/chat.php',
        type: 'POST',
        data: {
            user: login,
            password: password
        },
        error: (jqXHR) => {

            errorCode(jqXHR);
        },
        success: () => {
            $loginContainer.hide();
            $chatContainer.show();
            $sendContainer.show();
            getMessages();
        }
    });
}

function sendMessage(message) {
    if (!message) {
        return;
    }
    $ajaxXHR.abort();
    clearTimeout(requetTimeout);
    $.ajax({
        url: './api/chat.php',
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        data: {
            message: message
        },
        type: 'POST',
        success: () => {
            getMessages();
            $message.val('');
        }
    });
}

function logout() {
    $chatContainer.hide();
    $sendContainer.hide();
    $loginContainer.show();
    $ajaxXHR.abort();
    clearTimeout(requetTimeout);
}

function errorCode(jqXHR) {
    if (jqXHR.statusText === "abort") {
        return;
    }
    $errorResponse.text('Service temporarily unavailable');
    if (jqXHR.status === 401) {
        $errorResponse.text(jqXHR.responseText);
    }
    console.log(jqXHR.statusText);
    console.log(jqXHR.responseText);
}

function getMessages() {
    $ajaxXHR = $.ajax({
        url: './api/chat.php',
        type: 'GET',
        data: {
            timestamp: timestamp
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: (data) => {
            messagesAdd(data);
            requetTimeout = setTimeout(getMessages, 1000);
        }
    });
}

function messagesAdd(messagesJson) {
    const jsonData = JSON.parse(messagesJson);
    jsonData.forEach((message) => {
        $("<li />").html(`[${timestampToDate(message.timestamp)}] <span class="chat-bold">${message.user} :</span> ${
            message.message
                .replace(':)', '<img class="image-smile" src="img/smile1.png">')
                .replace(':(', '<img class="image-smile" src="img/smile2.png">')
            }`).appendTo($chatDataList);
        timestamp = message.timestamp;
    });

    const chatMassagesHeight = $chatDataList.height() - $chatData.height();
    $chatData.animate({ scrollTop: chatMassagesHeight }, 200);
}

function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

function checkLogin(login) {
    return /^[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z0-9_,\.]{2,19}$/.test(login);
}

function checkPassword(password) {
    return /^.{6,}$/.test(password);
}

function imagePreload(imagesArray) {
    imagesArray.forEach((value) => {
        console.log(value);
        $('<img/>').attr('src', value).hide().appendTo('body');
    });
}