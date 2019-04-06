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
let user = {
    login: null,
    id: null
};

$(document).ready(() => {
    $ajaxXHR = $.ajax({
        url: apiURL,
        dataType: 'json',
        type: 'GET',
        data: {
            id: lastId
        }
    }).fail((jqXHR) => {
        errorCode(jqXHR);
    }).done((data) => {
        showResponseLog(data, 'Check user state');
        if (data.statusCode === 200 || data.statusCode === 202) {
            imagePreload(smiles);
            $loadingContainer.hide();
            $chatContainer.show();
            $chatLogout.show();
            $sendContainer.show();
            messagesAdd(data.body);
            getUserInfo();
            getMessages();
            return;
        }
        if (data.statusCode >= 500) {
            $errorResponse.text('Service temporarily unavailable');
        }
        $loadingContainer.hide();
        $loginContainer.show();
    });

    $chatLogout.on('click', () => {
        $.ajax({
            url: apiURL,
            dataType: 'json',
            type: 'POST',
            data: {
                logout: 'logout'
            }
        }).fail((jqXHR) => {
            errorCode(jqXHR);
        }).done((data) => {
            showResponseLog(data, 'Logout');
            user.id = null;
            user.login = null;
            logout();
        });
    });

    $loginForm.on('submit', ((evt) => {
        evt.preventDefault();
        firstEntry = false;
        login($userName.val(), $userPassword.val());
    }));

    $sendForm.on('submit', ((evt) => {
        evt.preventDefault();
        sendMessage($message.val());
    }));
});

function login(login, password) {
    $.ajax({
        url: apiURL,
        type: 'POST',
        dataType: 'json',
        data: {
            user: login,
            password: password
        }
    }).fail((jqXHR) => {
        errorCode(jqXHR);
    }).done((data) => {
        user.login = data.login;
        user.id = data.userId;
        showResponseLog(data, `User '${login}' try to login`);
        if (data.statusCode !== 200 && data.statusCode !== 202) {
            $errorResponse.text(data.statusText);
            return;
        }
        showChat();
    });
}

function sendMessage(message) {
    $ajaxXHR.abort('SendMessageAbort');
    clearTimeout(requestTimeout);
    $.ajax({
        url: apiURL,
        dataType: 'json',
        data: {
            message: message
        },
        type: 'POST',
    }).fail((jqXHR) => {
        errorCode(jqXHR);
    }).done((data) => {
        showResponseLog(data, 'Send message');
        getMessages();
        $message.val('');
    });
}

function errorCode(jqXHR) {
    if (jqXHR.statusText === 'SendMessageAbort') {
        return;
    }
    $errorResponse.text('Service temporarily unavailable');
    logout();
}

function getUserInfo() {
    $ajaxXHR = $.ajax({
        url: apiURL,
        dataType: 'json',
        type: 'GET',
        data: {
            userInfo: ''
        }
    }).fail((jqXHR) => {
        errorCode(jqXHR);
    }).done((data) => {
        showResponseLog(data, 'Request user data');
        if (data.statusCode !== 200) {
            $errorResponse.text(data.statusText);
            return;
        }
        user.id = data.body.id;
        user.login = data.body.login;
    });

}

function getMessages() {
    $ajaxXHR = $.ajax({
        url: apiURL,
        dataType: 'json',
        type: 'GET',
        data: {
            id: lastId
        }
    }).fail((jqXHR) => {
        errorCode(jqXHR);
    }).done((data) => {
        messagesAdd(data.body);
        showResponseLog(data, 'Request new messages');
        requestTimeout = setTimeout(getMessages, 1000);
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
        $chatData.animate({scrollTop: chatMassagesHeight}, 200);
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

function showResponseLog(data, responseText = '') {
    if (data.massageCount === 0) {
        return;
    }
    const logString = `${timestampToDate(data.timestamp)} ${(user.login !== null && user.id !== null) ? `#${user.id} ${user.login}: ` : ''}Request -> ${responseText} / Response <- ${data.statusCode}:${data.statusText}`;

    if (data.statusCode < 400) {
        console.log(logString);
        return;
    }
    if (data.statusCode < 500) {
        console.warn(logString);
        return;
    }
    console.error(logString);
}
