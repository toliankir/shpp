const $chatContainer = $('#chatContainer');
const $loginContainer = $('#loginContainer');
const $sendContainer = $('#sendContainer');

const $userName = $('#userName');
const $userPassword = $('#userPassword');
const $errorResponse = $('#errorResponse');

const $chatData = $('#chatData');
const $chatDataList = $("#chatDataList");
const $chatLogout = $('#chatLogout');

const $message = $('#message');

const smiles = [
    "img/smile1.png",
    "img/smile2.png"
];

const apiURL = './api/';


let timestamp = 0;
let requestTimeout;
let $ajaxXHR;
let firstEntry = true;

$(document).ready(() => {
    $ajaxXHR = $.ajax({
        url: apiURL,
        type: 'GET',
        data: {
            timestamp: timestamp
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: () => {
            imagePreload(smiles);
            $loginContainer.hide();
            $chatContainer.show();
            $sendContainer.show();
            getMessages();
        }
    });

});

$chatLogout.on('click', () => {
    $.ajax({
        url: apiURL,
        type: 'POST',
        data: {
            logout: 'logout'
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: () => {
            logout();
        }
    });
});

$('#login').on('click', () => {
    firstEntry = false;
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

    $.ajax({
        url: apiURL,
        type: 'POST',
        data: {
            user: login,
            password: password
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: () => {
            showChat();
        }
    });
}

function sendMessage(message) {
    if (!message.trim()) {
        return;
    }
    $ajaxXHR.abort();
    clearTimeout(requestTimeout);
    $.ajax({
        url: apiURL,
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

function errorCode(jqXHR) {
    if (jqXHR.status === 401) {
        if (!firstEntry) {
            $errorResponse.text(jqXHR.responseText);
        }
        logout(); 
        return;
    }
    $errorResponse.text('Service temporarily unavailable');
    logout(); 
}

function getMessages() {
    $ajaxXHR = $.ajax({
        url: apiURL,
        type: 'GET',
        data: {
            timestamp: timestamp
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: (data) => {
            messagesAdd(data);
            requestTimeout = setTimeout(getMessages, 1000);
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

    if (jsonData.length > 0) {
        const chatMassagesHeight = $chatDataList.height() - $chatData.height();
        $chatData.animate({
            scrollTop: chatMassagesHeight
        }, 200);
    }
}

function showChat() {
    imagePreload(smiles);
    $errorResponse.text('');
    $loginContainer.hide();
    $chatLogout.show();
    $chatContainer.show();
    $sendContainer.show();
    getMessages();
}

function logout() {
    firstEntry = true;
    $chatContainer.hide();
    $sendContainer.hide();
    $chatLogout.hide();
    $loginContainer.show();
    clearTimeout(requestTimeout);
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
        $('<img>').attr('src', value).hide().appendTo('body');
    });
}