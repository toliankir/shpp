let $draggedElement = null;
let draggable = false;
let prevX, prevY;

const draggableClass = 'draggable';
const draggableSelector = '.' + draggableClass;
const imageContainerClass = 'image-container';
const imageContainerSelector = '.' + imageContainerClass;
const cornerClass = 'message-corner';
const inputSelector = 'input[type="text"]';
const propValue = 'data-value';
const propOldValue = 'data-old';
const $imageContainer = $(imageContainerSelector);
const apiUrl = 'api/';

$(() => {
    getAllMessages();
});

$imageContainer.on('mousedown', draggableSelector, (el) => {
    if (!$(el.target).is('div' + draggableSelector, 'span')) {
        return;
    }

    $draggedElement = $(el.target);
    draggable = true;

    prevX = el.clientX;
    prevY = el.clientY;
});

$imageContainer.on('click', 'input', (el) => {

    $draggedElement = $(el.target).closest($('div'));
});

$imageContainer.on('blur', 'input',  () => {
    submitMessageChange($draggedElement);
    putMessage($draggedElement);
});

$(document).on('mouseup', () => {
    if ($draggedElement !== null && draggable) {
        putMessage($draggedElement);
    }
    draggable = false;
});

$imageContainer.on('dblclick', (el) => {
    $element = $(el.target);
    if ($element.is(imageContainerSelector)) {
        $draggedElement = addDraggableItem([el.offsetX, el.offsetY]);
    }

    if ($element.is(draggableSelector)) {
        const oldWidth = $draggedElement.outerWidth();
        const oldHeight = $draggedElement.outerHeight();

        const newInput = $('<input type="text">').val($draggedElement.text()).attr(propValue, $draggedElement.text()).attr(propOldValue, $draggedElement.text());
        const $cornerElement = $('<div></div>').addClass(cornerClass);
        $draggedElement.text('').append(newInput).find($('input')).focus();
        $.when($draggedElement.append($cornerElement))
            .then($draggedElement.css({
                left: $draggedElement.position().left + (oldWidth - $draggedElement.outerWidth()),
                top: $draggedElement.position().top + (oldHeight - $draggedElement.outerHeight())
            }))
            .then(correctingPosition());

    }

    putMessage($draggedElement);
});

$imageContainer.on('mousemove', (ev) => {
    if (!draggable) {
        return;
    }

    let xPos = $draggedElement.position().left - (prevX - ev.clientX);
    let yPos = $draggedElement.position().top - (prevY - ev.clientY);
    prevX = ev.clientX;
    prevY = ev.clientY;

    if (xPos < 0) {
        xPos = 0;
    }
    if (yPos < 0) {
        yPos = 0;
    }

    if (xPos + $draggedElement.outerWidth() > $imageContainer.width()) {
        xPos = $imageContainer.width() - $draggedElement.outerWidth();
    }

    if (yPos + $draggedElement.outerHeight() > $imageContainer.height()) {
        yPos = $imageContainer.height() - $draggedElement.outerHeight();
    }
    $draggedElement.css({
        left: xPos,
        top: yPos
    });

});

$imageContainer.on('keyup', (el) => {
     if ($(el.target).is($(inputSelector))) {
        $draggedElement = $(el.target).closest($('div'));
    }
    const inputDragged = $draggedElement.find($(inputSelector));

    if (el.keyCode === 13) {
        submitMessageChange($draggedElement);
    }

    if (el.keyCode === 27) {
        $draggedElement.text(inputDragged.attr(propOldValue));
    }

    inputDragged.attr(propValue, inputDragged.val());
    putMessage($draggedElement);
});

$(window).on('resize', () => {
    correctingPosition();
});

function addDraggableItem(position = null) {
    const $newElement = $('<div></div>').addClass(draggableClass).text('New button');
    const $cornerElement = $('<div></div>').addClass(cornerClass);
    $newElement.append($cornerElement);
    $imageContainer.append($newElement);

    if (!position) {
        position = [];
        position[0] = Math.random() * ($(imageContainerSelector).width() - $newElement.width());
        position[1] = Math.random() * ($(imageContainerSelector).height() - $newElement.height());

    } else {
        position[0] -= $newElement.outerWidth() - parseInt($cornerElement.css("right"));
        position[1] -= $newElement.outerHeight() - parseInt($cornerElement.css("bottom"));
    }

    const uniqId = Math.abs(hashCode(Date.now() + position[0] + position[1]));

    $newElement.attr('id', uniqId).css({left: Math.round(position[0]), top: Math.round(position[1])});
    correctingPosition();
    return $newElement;
}


function hashCode(s) {
    return s.toString().split("").reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a
    }, 0);
}

function putMessage(element) {
    const id = element.attr('id');
    const html = element[0].outerHTML;
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        data: {
            action: 'put',
            id: id,
            body: html
        },
        error: (jqXHR) => {
            console.log(jqXHR);
        },
        success: (data) => {
            successReport(data);
        }
    });
}

function getAllMessages() {
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        data: {
            action: 'getAllMessages'
        },
        error: (jqXHR) => {
            console.log(jqXHR);
        },
        success: (data) => {
            successReport(data);
            addMessages(data.body);
        }
    });

}

function deleteMessage(id) {
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        data: {
            action: 'deleteMessage',
            id: id
        },
        error: (jqXHR) => {
            console.log(jqXHR);
        },
        success: (data) => {
            successReport(data);
        }
    });
}

function addMessages(messages) {
    messages.forEach((message) => {
        const newElement = $(message.body);
        const newElementInput = newElement.find(inputSelector);

        if (newElementInput.length !== 0) {
            newElementInput.val(newElementInput.attr(propValue));
        }
        $imageContainer.append(newElement);
    });
}

function successReport(data) {
    console.log(data.statusText);
}

function correctingPosition() {
    const $elements = $(draggableSelector);
    $elements.each((index, value) => {
        let changed = false;
        const $element = $(value);

        if ($element.position().left < 0) {
            $element.css({left: 0});
        }
        if ($element.position().top < 0) {
            $element.css({top: 0});
        }
        if ($element.position().left + $element.outerWidth() > $imageContainer.width()) {
            $element.css({left: $imageContainer.width() - $element.outerWidth()});
            changed = true;
        }
        if ($element.position().top + $element.outerHeight() > $imageContainer.height()) {
            $element.css({top: $imageContainer.height() - $element.outerHeight()});
            changed = true;
        }

        if (changed) {
            putMessage($element);
        }
    });
}

function submitMessageChange($draggedElement) {
    const inputDragged = $draggedElement.find($(inputSelector));
    if (!inputDragged.val()) {
        deleteMessage($draggedElement.attr('id'));
        $draggedElement.remove();
        return;
    }
    const oldWidth = $draggedElement.outerWidth();
    const oldHeight = $draggedElement.outerHeight();
    const $cornerElement = $('<div></div>').addClass(cornerClass);
    $draggedElement.text(inputDragged.val());
    $draggedElement.append($cornerElement);
    $draggedElement.css({
        left: $draggedElement.position().left - ($draggedElement.outerWidth() - oldWidth),
        top: $draggedElement.position().top - ($draggedElement.outerHeight() - oldHeight)
    });
}
