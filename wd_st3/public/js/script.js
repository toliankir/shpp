let draggable = false;
let prevX, prevY;
let cornerHeight = 0;
let cornerRight = 0;
let cornerBottom = 0;
let timeOutResize = null;
let timeOutKeyup = null;

const ENTER_KEY = 13;
const ESC_KEY = 27;
const newMassageText = 'New message';

const draggableClass = 'draggable';
const draggableSelector = '.' + draggableClass;
const imageContainerClass = 'image-container';
const imageContainerSelector = '.' + imageContainerClass;
const cornerSelector = '.draggable::after';
const inputSelector = 'input:text';
const apiUrl = 'api/';

const propValue = 'data-value';
const propChanged = 'data-changed';
const propOldValue = 'data-old';
const propOldX = 'prop-x';
const propOldY = 'prop-y';

let $draggedElement = null;
const $imageContainer = $(imageContainerSelector);

$(() => {
    cornerHeight = parseInt(getPropertyFromStyleList(cornerSelector, 'borderWidth')) * 2;
    cornerRight = parseInt(getPropertyFromStyleList(cornerSelector, 'right'));
    cornerBottom = parseInt(getPropertyFromStyleList(cornerSelector, 'bottom'));
    getAllMessagesFromBase();

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
        if (draggable) {
            putMessageToBase([$draggedElement]);
        }
        draggable = false;
    });

    $imageContainer.on('dblclick', (el) => {
        const $clickedElement = $(el.target);

        if ($clickedElement.is(inputSelector)) {
            $draggedElement = $clickedElement.closest(draggableSelector);
        }

        //If double clicked on empty area. Creating new massage.
        if ($clickedElement.is(imageContainerSelector)) {
            $draggedElement = addDraggableItem(el.offsetX, el.offsetY);
            setCornerPosition($draggedElement, el.offsetX, el.offsetY);
            correctingPosition($draggedElement);
            $draggedElement.attr(propChanged, true);
        }

        //If double clicked on massage. Open input form.
        if ($clickedElement.is(draggableSelector)) {
            //Old element position for saving position of right-bottom corner after element resizing.
            const oldX = Math.round($draggedElement.position().left + $draggedElement.outerWidth() - cornerRight);
            const oldY = Math.round($draggedElement.position().top + $draggedElement.outerHeight() + cornerHeight);
            $draggedElement.attr(propChanged, true);

            //Add input to massage.
            const newInput = $('<input type="text">')
                .val($draggedElement.text())
                .attr(propOldX, oldX)
                .attr(propOldY, oldY)
                .attr(propValue, $draggedElement.text())
                .attr(propOldValue, $draggedElement.text());

            //If after adding element to DOM it is position is incorrect
            $draggedElement.text('').append(newInput).find($('input')).focus();
            setCornerPosition($draggedElement, oldX, oldY);
            correctingPosition($draggedElement);
        }

        putMessageToBase([$draggedElement]);
    });


    $imageContainer.on('mousemove', (ev) => {
        if (!draggable) {
            return;
        }

        //Calculate new element position according to mouse move.
        let xPos = Math.round($draggedElement.position().left - (prevX - ev.clientX));
        let yPos = Math.round($draggedElement.position().top - (prevY - ev.clientY));
        //Save new mouse position for next position calculation.
        prevX = ev.clientX;
        prevY = ev.clientY;

        //If position change, element mast be save in base
        if (xPos !== parseInt($draggedElement.css('left'))
            || yPos !== parseInt($draggedElement.css('top'))) {
            $draggedElement.attr(propChanged, true);
        }

        $draggedElement.css({
            left: xPos,
            top: yPos
        });
        correctingPosition($draggedElement);
    });

    $imageContainer.on('keyup', (el) => {
        //If user click on input, not on draggable element. Change draggable element to actual.
        if ($(el.target).is($(inputSelector))) {
            $draggedElement = $(el.target).closest($('div'));
        }
        const $inputDragged = $draggedElement.find($(inputSelector));

        if (el.keyCode === ENTER_KEY && $draggedElement.has(inputSelector)) {
            if (messageRemove($draggedElement)) {
                return;
            }
            changeMessageContent($draggedElement, $inputDragged.val());
        }

        if (el.keyCode === ESC_KEY) {
            changeMessageContent($draggedElement, $inputDragged.attr(propOldValue));
        }

        $inputDragged.attr(propValue, $inputDragged.val());
        $draggedElement.attr(propChanged, true);

        clearTimeout(timeOutKeyup);
        timeOutKeyup = setTimeout(() => {
            putMessageToBase([$draggedElement]);
        }, 500);
    });

    /**
     * On window resize corrects messages position.
     */
    $(window).on('resize', () => {
        clearTimeout(timeOutResize);
        timeOutResize = setTimeout(() => {
            const changedElements = correctingPosition();
            putMessageToBase(changedElements);
        }, 250);
    });

})
;


/**
 * Add element to DOM and return it is jquery object.
 * @returns {jQuery}
 * @param x
 * @param y
 */
function addDraggableItem(x, y) {
    const $newElement = $('<div></div>')
        .attr(propChanged, false)
        .addClass(draggableClass)
        .text(newMassageText);
    $imageContainer.append($newElement);

    const uniqId = Math.abs(hashCode(Date.now() + x + y));

    $newElement.attr('id', uniqId);
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
 * @param elements
 */
function putMessageToBase(elements) {
    let req = [];
    const filterdElements = elements.filter(($el) => {
        if ($el.attr(propChanged) === 'false') {
            return false;
        }
        const $req_elem = {
            id: $el.attr('id'),
            body: $el.html(),
            x: Math.round($el.position().left),
            y: Math.round($el.position().top)
        };
        $el.attr(propChanged, false);
        req.push($req_elem);
        return true;
    });

    if (req.length === 0) {
        return;
    }

    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        data: {
            action: 'put',
            message: req
        }
    })
        .fail((jqXHR) => {
            errorReport(jqXHR);
            restoreState(filterdElements);
        })
        .done((data) => {
            if (data.statusCode === 500) {
                errorReport(data);
                restoreState(filterdElements);
                return;
            }
            setActualState(filterdElements);
            successReport(data);
        });
}

function restoreState(elements) {
    elements.forEach(($el) => {
        const oldState = $el.attr(propOldValue);
        const $oldState = $(oldState).attr(propOldValue, oldState);
        $el.replaceWith($oldState);
    });
}

function setActualState(elements) {
    elements.forEach(($el) => {
        $el.attr(propOldValue, $el[0].outerHTML);
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
        }
    })
        .fail((jqXHR) => {
            errorReport(jqXHR);
        })
        .done((data) => {
                if (!data) {
                    return;
                }
                successReport(data);
                addMessages(data.body);
                correctingPosition();
            }
        );
}

/**
 * Add message to DOM from array
 * @param messages
 */
function addMessages(messages) {
    if (!messages) {
        return;
    }
    messages.forEach((message) => {
        const $newElement = $('<div></div>')
            .addClass(draggableClass)
            .css({left: parseInt(message.x), top: parseInt(message.y)})
            .attr('id', message.id)
            .attr(propChanged, false)
            .html(message.body);

        if ($newElement.has(inputSelector)) {
            const $newElementInput = $newElement.find(inputSelector);
            $newElementInput.val($newElementInput.attr(propValue));
        }

        $newElement.attr(propOldValue, $newElement[0].outerHTML);

        $imageContainer.append($newElement);
    });
}

function successReport(data) {

    console.log(data.statusText);
}

function errorReport(data) {
    console.log(data.statusText);
}

function setCornerPosition($element, x, y) {
    if (!$element) {
        return;
    }
    $element.css({
        left: Math.round(x - $element.outerWidth() + cornerRight),
        top: Math.round(y - $element.outerHeight() - cornerHeight)
    });
}

/**
 * Looking that all massage is in visible area.
 */
function correctingPosition($elements = null) {
    if (!$elements) {
        $elements = $(draggableSelector);
    }
    let $changedElements = [];

    $elements.each((index, value) => {
        const $element = $(value);
        let x = $element.position().left,
            y = $element.position().top;

        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x + $element.outerWidth() > $imageContainer.width()) {
            x = Math.round($imageContainer.width() - $element.outerWidth());
        }
        if (y + $element.outerHeight() + cornerHeight > $imageContainer.height()) {
            y = Math.round($imageContainer.height() - $element.outerHeight() - cornerHeight);
        }

        if ($element.position().left !== x || $element.position().top !== y) {
            $element
                .attr(propChanged, true)
                .css({left: x, top: y});
            $changedElements.push($element);
        }

    });
    return $changedElements;
}

/**
 * Remove message from DOM and database.
 * @param $draggedElement
 * @returns {boolean}
 */
function messageRemove($draggedElement) {
    const inputDragged = $draggedElement.find($(inputSelector));
    if (!inputDragged.val()) {
        $draggedElement
            .html('')
            .attr(propChanged, true);
        putMessageToBase([$draggedElement]);
        $draggedElement.remove();
        return true;
    }
    return false;
}

/**
 * Set propValue attribute of input to text() value of message.
 * @param $draggedElement
 * @param value
 */
function changeMessageContent($draggedElement, value) {
    const $inputDragged = $draggedElement.find(inputSelector);
    const x = $inputDragged.attr(propOldX);
    const y = $inputDragged.attr(propOldY);
    $draggedElement
        .text(value);
    setCornerPosition($draggedElement, x, y);
    correctingPosition($draggedElement);
}

/**
 * Get style parameter from StyleList, use if element not present in DOM.
 * @param selector
 * @param property
 * @returns {*}
 */
function getPropertyFromStyleList(selector, property) {
    const allStyleLists = document.styleSheets;
    for (let styleListNum = 0; styleListNum < allStyleLists.length; styleListNum++) {
        const cssRules = allStyleLists[styleListNum].cssRules;
        for (let cssRulesNum = 0; cssRulesNum < cssRules.length; cssRulesNum++) {
            if (cssRules[cssRulesNum].selectorText === selector) {
                return cssRules[cssRulesNum].style[property];
            }
        }
    }
}
