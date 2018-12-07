let $draggedElement = null;
let draggable = false;
let prevX, prevY;

const ENTER_KEY = 13;
const ESC_KEY = 27;
const CORNER_HEIGHT = 10;

const draggableClass = 'draggable';
const draggableSelector = '.' + draggableClass;
const imageContainerClass = 'image-container';
const imageContainerSelector = '.' + imageContainerClass;
const cornerClass = 'message-corner';
const inputSelector = 'input:text';
const propValue = 'data-value';
const propOldValue = 'data-old';
const $imageContainer = $(imageContainerSelector);
const apiUrl = 'api/';

$(() => {
    getAllMessagesFromBase();
});

/**
 * Drag element
 */
$imageContainer.on('mousedown', draggableSelector, (el) => {
    if (!$(el.target).is('div' + draggableSelector)) {
        return;
    }

    $draggedElement = $(el.target);
    draggable = true;

    prevX = el.clientX;
    prevY = el.clientY;
});
/**
 * Save element in base, if element is set and it be dragged.
 */
$(document).on('mouseup', () => {
    if ($draggedElement !== null && draggable) {
        putMessageToBase($draggedElement.attr('id'), $draggedElement[0].outerHTML);
    }
    draggable = false;
});


$imageContainer.on('dblclick', (el) => {
    $element = $(el.target);
    //If dbclick on empty field, creating new massage
    if ($element.is(imageContainerSelector)) {
        $draggedElement = addDraggableItem([el.offsetX, el.offsetY]);
    }

    //If clicked on massage
    if ($element.is(draggableSelector)) {
        //Old element size for saving position of right-bottom corner after element resizing.
        const oldWidth = $draggedElement.outerWidth();
        const oldHeight = $draggedElement.outerHeight();

        //Add input to massage.
        const newInput = $('<input type="text">').val($draggedElement.text()).attr(propValue, $draggedElement.text())
            .attr(propOldValue, $draggedElement.text());
        const $cornerElement = $('<div></div>').addClass(cornerClass);
        $draggedElement.text('').append(newInput).find($('input')).focus();

        //If after adding element to DOM it is position is incorrect
        $.when($draggedElement.append($cornerElement))
            .then($draggedElement.css({
                left: $draggedElement.position().left + (oldWidth - $draggedElement.outerWidth()),
                top: $draggedElement.position().top + (oldHeight - $draggedElement.outerHeight())
            }))
            .then(correctingPosition());
    }

    putMessageToBase($draggedElement.attr('id'), $draggedElement[0].outerHTML);
});

$imageContainer.on('mousemove', (ev) => {
    if (!draggable) {
        return;
    }

    //Calculate new element position according to mouse move.
    let xPos = $draggedElement.position().left - (prevX - ev.clientX);
    let yPos = $draggedElement.position().top - (prevY - ev.clientY);
    //Save new mouse position for next position calculation.
    prevX = ev.clientX;
    prevY = ev.clientY;

    //Checks new element position
    if (xPos < 0) {
        xPos = 0;
    }
    if (yPos < 0) {
        yPos = 0;
    }

    if (xPos + $draggedElement.outerWidth() > $imageContainer.width()) {
        xPos = $imageContainer.width() - $draggedElement.outerWidth();
    }

    if (yPos + $draggedElement.outerHeight() + CORNER_HEIGHT > $imageContainer.height()) {
        yPos = $imageContainer.height() - $draggedElement.outerHeight() - CORNER_HEIGHT;
    }

    $draggedElement.css({
        left: xPos,
        top: yPos
    });

});

$imageContainer.on('keyup', (el) => {
    //If user click on input, not on draggable element. Change draggable element to actual.
    if ($(el.target).is($(inputSelector))) {
        $draggedElement = $(el.target).closest($('div'));
    }
    const $inputDragged = $draggedElement.find($(inputSelector));

    if (el.keyCode === ENTER_KEY) {
        if (messageRemove($draggedElement)) {
            return;
        }
        applyMessageChange($draggedElement);
    }

    if (el.keyCode === ESC_KEY) {
        $inputDragged.val($inputDragged.attr(propOldValue));
        applyMessageChange($draggedElement);
    }

    $inputDragged.attr(propValue, $inputDragged.val());
    putMessageToBase($draggedElement.attr('id'), $draggedElement[0].outerHTML);
});

/**
 * On window resize corrects messages position.
 */
$(window).on('resize', () => {
    correctingPosition();
});

/**
 * Add element to DOM and return it is jquery object.
 * @param position
 * @returns {jQuery}
 */
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

/**
 * Unique id for messages.
 * @param s
 * @returns {number}
 */
function hashCode(s) {
    return s.toString().split("").reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a
    }, 0);
}

/**
 * Put element to base, if element exist in base replace it.
 * @param id
 * @param body
 */
function putMessageToBase(id, body) {
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        data: {
            action: 'put',
            id: id,
            body: body
        },
        error: (jqXHR) => {
            console.log(jqXHR);
        },
        success: (data) => {
            successReport(data);
        }
    });
}

/**
 * Get messages from base
 */
function getAllMessagesFromBase() {
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
            if (!data) {
                return;
            }
            successReport(data);
            addMessages(data.body);
        }
    });

}

/**
 * Add message to DOM from array
 * @param messages
 */
function addMessages(messages) {
    messages.forEach((message) => {
        const $newElement = $(message.body);

        if ($newElement.has(inputSelector)) {
            const $newElementInput = $newElement.find(inputSelector);
            $newElementInput.val($newElementInput.attr(propValue));
        }

        $imageContainer.append($newElement);
    });
}

function successReport(data) {
    // console.log(data.statusText);
}

/**
 * Looking that all massage is in visible area.
 */
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
        if ($element.position().top + $element.outerHeight() + CORNER_HEIGHT > $imageContainer.height()) {
            $element.css({top: $imageContainer.height() - $element.outerHeight() - CORNER_HEIGHT});
            changed = true;
        }

        if (changed) {
            putMessageToBase($element.attr('id'), $element[0].outerHTML);
        }
    });
}

/**
 * Remove message from DOM and database.
 * @param $draggedElement
 * @returns {boolean}
 */
function messageRemove($draggedElement) {
    const inputDragged = $draggedElement.find($(inputSelector));
    if (!inputDragged.val()) {
        putMessageToBase($draggedElement.attr('id'), '');
        $draggedElement.remove();
        return true;
    }
    return false;
}

/**
 * Set propValue attribute of input to text() value of message.
 * @param $draggedElement
 */
function applyMessageChange($draggedElement) {
    const oldWidth = $draggedElement.outerWidth();
    const oldHeight = $draggedElement.outerHeight();
    const $cornerElement = $('<div></div>').addClass(cornerClass);

    $draggedElement.text($draggedElement.find($(inputSelector)).val());
    $draggedElement.append($cornerElement);
    $draggedElement.css({
        left: $draggedElement.position().left - ($draggedElement.outerWidth() - oldWidth),
        top: $draggedElement.position().top - ($draggedElement.outerHeight() - oldHeight)
    });
}
