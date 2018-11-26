const $chatContainer = $('#chatContainer');
const $loadingContainer = $('#loadingContainer');
const $loginContainer = $('#loginContainer');
const $sendContainer = $('#sendContainer');

const $userName = $('#userName');
const $userPassword = $('#userPassword');
const $errorResponse = $('#errorResponse');

const $chatData = $('#chatData');
const $chatDataList = $("#chatDataList");
const $chatLogout = $('#chatLogout');

const $message = $('#message');

const $loginForm = $('#loginForm');
const $sendForm = $('#sendForm');

const smiles = [
    "img/smile1.png",
    "img/smile2.png"
];

const apiURL = 'api/';

let lastId = -1;
let requestTimeout;
let $ajaxXHR;
let firstEntry = true;

$(document).ready(() => {

    $ajaxXHR = $.ajax({
        url: apiURL,
        dataType: 'json',
        type: 'GET',
        data: {
            id: lastId
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: (data) => {
            showLog(data);
            if (data.statusCode === 202) {
                imagePreload(smiles);
                $loadingContainer.hide();
                $chatContainer.show();
                $chatLogout.show();
                $sendContainer.show();
                getMessages();
                return;
            }
            $loadingContainer.hide();
            $loginContainer.show();
        }
    });
});

$chatLogout.on('click', () => {
    $.ajax({
        url: apiURL,
        dataType: 'json',
        type: 'POST',
        data: {
            logout: 'logout'
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: (data) => {
            showLog(data);
            logout();
        }
    });
});

$loginForm.submit((evt) => {
    evt.preventDefault();
    firstEntry = false;
    login($userName.val(), $userPassword.val());
});

$sendForm.submit((evt) => {
    evt.preventDefault();
    sendMessage($message.val());
});

function login(login, password) {
    $.ajax({
        url: apiURL,
        type: 'POST',
        dataType: 'json',
        data: {
            user: login,
            password: password
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: (data) => {
            showLog(data);
            if (data.statusCode !== 202) {
                $errorResponse.text(data.statusText);
                return;
            }
            showChat();
        }
    });
}

function sendMessage(message) {
    $ajaxXHR.abort('SendMessageAbort');
    clearTimeout(requestTimeout);
    $.ajax({
        url: apiURL,
        dataType: 'json',
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        data: {
            message: message
        },
        type: 'POST',
        success: (data) => {
            showLog(data);
            getMessages();
            $message.val('');
        }
    });
}


function errorCode(jqXHR) {
    if (jqXHR.statusText === 'SendMessageAbort') {
        return;
    }
    $errorResponse.text('Service temporarily unavailable');
    logout();
}

function getMessages() {
    $ajaxXHR = $.ajax({
        url: apiURL,
        dataType: 'json',
        type: 'GET',
        data: {
            id: lastId
        },
        error: (jqXHR) => {
            errorCode(jqXHR);
        },
        success: (data) => {
            messagesAdd(data.body);
            showLog(data);
            requestTimeout = setTimeout(getMessages, 1000);
        }
    });
}

function messagesAdd(messagesArray) {
    messagesArray.forEach((message) => {
        $("<li />").html(`[${timestampToDate(message.timestamp)}] <span class="chat-bold">${message.user} :</span> ${
            message.message
                .replace(/:\)/g, '<img class="image-smile" src="img/smile1.png">')
                .replace(/:\(/g, '<img class="image-smile" src="img/smile2.png">')
            }`).appendTo($chatDataList);
        lastId = message.id;
    });

    if (messagesArray.length > 0) {
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

function imagePreload(imagesArray) {
    imagesArray.forEach((value) => {
        $('<img src="' + value + '">').hide().appendTo('body');
    });
}

function showLog(data) {
    if (data.massageCount === 0) {
        return;
    }
    console.log(`${timestampToDate(data.timestamp)}: ${data.statusCode} - ${data.statusText}`);
}