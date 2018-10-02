const $chatContainer = $('#chatContainer');
const $loginContainer = $('#loginContainer');
const $sendContainer = $('#sendContainer');

const $userName = $('#userName');
const $userPassword = $('#userPassword');
const $errorResponse = $('#errorResponse');

const $chatData = $('#chatData');
const $chatDataList = $("#chatDataList");

const $message = $('#message');

let timestamp = 0;
let refreshInterval;

$('#login').on('click', () => {
    login();
});

$('#sendMessage').on('click', () => {
    if (!$message.val()) {
        return;
    }

    $.ajax({
        url: './api/chat.php',
        error: (jqXHR) => {
            errorCode(jqXHR.status);
        },
        data: {
            message: $message.val()
        },
        type: 'POST',
        success: () => {
            getMessages();
            $message.val('');
        }
    });
});

function login() {
    if (!$userName.val() || !$userPassword.val()) {
        return;
    }

    $.ajax({
        url: './api/chat.php',
        type: 'POST',
        data: {
            user: $userName.val(),
            password: $userPassword.val()
        },
        error: (jqXHR) => {
            if (jqXHR.status === 401) {
                $errorResponse.text(jqXHR.responseText);
                return;
            }
            errorCode(jqXHR);
        },
        success: () => {
            $loginContainer.hide();
            $chatContainer.show();
            $sendContainer.show();
            getMessages();
            refreshInterval = setInterval(getMessages, 1000);
        }
    });
}

function logout() {
    $chatContainer.hide();
    $sendContainer.hide();
    $loginContainer.show();
    clearInterval(refreshInterval);
}

function errorCode(code) {
    $errorResponse.text('Service temporarily unavailable');
    console.log(code.responseText);
    logout();
}

function getMessages() {
    $.ajax({
        url: './api/chat.php',
        type: 'GET',
        data: {
            timestamp: timestamp
        },
        error: (jqXHR) => {
            errorCode(jqXHR.status);
        },
        success: (data) => {
            messagesAdd(data);
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
    $chatData.animate({scrollTop: chatMassagesHeight}, 200);
}


function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}