let draggable = false;
let prevX, prevY;
let cornerHeight = 0;
let cornerRight = 0;
let cornerBottom = 0;
let timeOutResize = null;
let timeOutKeyup = null;


const animationDuration = 250;
const delayResize = 250;
const delayKeyPress = 500;
const ENTER_KEY = 13;
const ESC_KEY = 27;

const draggableClass = 'draggable';
const draggableSelector = '.' + draggableClass;
const imageContainerClass = 'image-container';
const imageContainerSelector = '.' + imageContainerClass;
const cornerSelector = '.draggable::after';
const inputSelector = 'input:text';
const inputTag = '<input type="text">';
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

        $(draggableSelector).css({zIndex: 1});
        $draggedElement = $(el.target);
        $draggedElement.css({zIndex: 2});
        draggable = true;

        prevX = el.clientX;
        prevY = el.clientY;
    });

    /**
     * Save element in base, if element is set and it be dragged.
     */
    $(document).on('mouseup', () => {
        if (draggable) {
            if ($draggedElement.has(inputSelector)) {
                const $currentInput = $draggedElement.find(inputSelector);
                const currentX = Math.round($draggedElement.position().left + $draggedElement.outerWidth() - cornerRight);
                const currentY = Math.round($draggedElement.position().top + $draggedElement.outerHeight() + cornerHeight);
                $currentInput
                    .attr(propOldX, currentX)
                    .attr(propOldY, currentY);
            }
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
        }

        $draggedElement.width('auto');
        const $newInput = createInput($draggedElement);
        $newInput.attr(propOldValue, $draggedElement[0].innerHTML);

        //Show input in massage
        $draggedElement
            .attr(propChanged, '')
            .attr(propChanged, $draggedElement[0].outerHTML)
            .text('')
            .append($newInput)
            .find($('input'))
            .focus();
        setCornerPosition($draggedElement, $newInput.attr(propOldX), $newInput.attr(propOldY));
        correctingPosition($draggedElement);
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
        if ((xPos !== parseInt($draggedElement.css('left'))
            || yPos !== parseInt($draggedElement.css('top'))) && (
            $draggedElement.attr(propChanged) === 'false')) {
            $draggedElement
                .attr(propChanged, '')
                .attr(propChanged, $draggedElement[0].outerHTML);
        }
        if (xPos + Math.ceil($draggedElement.outerWidth()) >= Math.ceil($imageContainer.width())) {
            xPos = $imageContainer.width() - Math.ceil($draggedElement.outerWidth());
        }

        $draggedElement.css({
            left: xPos,
            top: yPos
        });
        correctingPosition($draggedElement);
    });


    /**
     * User typing event.
     */
    $imageContainer.on('keyup', (el) => {
        //If user click on input, not on draggable element. Change draggable element to actual.
        if ($(el.target).is($(inputSelector))) {
            $draggedElement = $(el.target).closest($('div'));
        }
        const $inputDragged = $draggedElement.find($(inputSelector));

        if (el.keyCode === ESC_KEY) {
            if (!$inputDragged.attr(propOldValue)) {
                $draggedElement.remove();
                if (messageRemove($draggedElement)) {
                    return;
                }
            }
               changeMessageContent($draggedElement, $inputDragged.attr(propOldValue));
        }

        if (el.keyCode === ENTER_KEY) {
            if (messageRemove($draggedElement)) {
                return;
            }
            changeMessageContent($draggedElement, $inputDragged.val());
            $draggedElement.width($draggedElement.width());

        }

        //Saving typed text in attribute for saving on server
        $inputDragged.attr(propValue, $inputDragged.val());
        $draggedElement
            .attr(propChanged, '')
            .attr(propChanged, $draggedElement[0].outerHTML);

        //Don't saving message on server if user typing, waiting for he is end.
        clearTimeout(timeOutKeyup);
        timeOutKeyup = setTimeout(() => {
            putMessageToBase([$draggedElement]);
        }, delayKeyPress);
    });

    /**
     * On window resize corrects messages position.
     */
    $(window).on('resize', () => {
        clearTimeout(timeOutResize);
        timeOutResize = setTimeout(() => {
            const changedElements = correctingPosition();
            putMessageToBase(changedElements);
        }, delayResize);
    });

});

/**
 * Creates new input for adds to message.
 * @param $element
 * @returns {*|jQuery}
 */
function createInput($element) {
    //Old element position for saving position of right-bottom corner after element resizing.
    const oldX = Math.round($element.position().left + $element.outerWidth() - cornerRight);
    const oldY = Math.round($element.position().top + $element.outerHeight() + cornerHeight);

    return $(inputTag)
        .val($element.text())
        .attr(propOldX, oldX)
        .attr(propOldY, oldY)
        .attr(propValue, $element.text())
}

/**
 * Add element to DOM and return it is jquery object.
 * @returns {jQuery}
 * @param x
 * @param y
 */
function addDraggableItem(x, y) {
    const $newElement = $('<div></div>')
        .attr(propChanged, false)
        .addClass(draggableClass);

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

    //Excludes messages that marked as not changed.
    const filteredElements = elements.filter(($el) => {
        if ($el.attr(propChanged) === 'false') {
            return false;
        }

        const $req_elem = {
            id: $el.attr('id'),
            body: $el.html(),
            x: Math.round($el.position().left),
            y: Math.round($el.position().top)
        };
        req.push($req_elem);
        return true;
    });

    if (req.length !== 0) {
        $.ajax({
            url: apiUrl,
            dataType: 'json',
            type: 'POST',
            data: {
                messages: req
            }
        })
            .fail((jqXHR) => {
                errorReport(jqXHR);
                restoreState(filteredElements);
            })
            .done((data) => {
                if (data.statusCode === 500) {
                    errorReport(data);
                    restoreState(filteredElements);
                    return;
                }
                setActualState(filteredElements);
                successReport(data);
            });
    }
}

/**
 * Restores elements state if server request failed.
 * @param elements
 */
function restoreState(elements) {
    elements.forEach(($el) => {
        const oldState = $el.attr(propChanged);
        if (!oldState) {
            $el.remove();
            return;
        }

        const $oldState = $(oldState).attr(propChanged, 'false');

        const id = $oldState.attr('id');
        const currentX = $el.position().left;
        const currentY = $el.position().top;
        const targetX = parseInt($oldState.css('left'));
        const targetY = parseInt($oldState.css('top'));
        $oldState.css({left: currentX, top: currentY});

        $el.replaceWith($oldState[0].outerHTML);

        const $elementInDOM = $('#' + id);
        const $input = $elementInDOM.find(inputSelector);
        $input
            .attr(propValue, $input.attr(propOldValue))
            .val($input.attr(propOldValue));

        $elementInDOM.animate({left: targetX, top: targetY}, animationDuration);
    });
}

/**
 * If server request was done, sets new actual state of message by default.
 * @param elements
 */
function setActualState(elements) {
    elements.forEach(($el) => {
        $el
            .attr(propChanged, 'false');
    });
}

/**
 * Get messages from base.
 */
function getAllMessagesFromBase() {
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET'
    })
        .fail((jqXHR) => {
            errorReport(jqXHR);
        })
        .done((data) => {
                if (!data) {
                    return;
                }
                if (data.statusCode === 500) {
                    errorReport(data);
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

        $imageContainer.append($newElement);
        $newElement.width($newElement.width());
    });
}

function successReport(data) {
    console.log(data.statusText);
}

function errorReport(data) {
    console.log(data.statusText);
}

/**
 *
 * @param $element
 * @param x
 * @param y
 */
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
 * Checks that massage is in visible area. If $elements = null corrects
 * position of all messages.
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
            x = Math.round($imageContainer.width() - $element.outerWidth() - 1);
        }
        if (y + $element.outerHeight() + cornerHeight > $imageContainer.height()) {
            y = Math.round($imageContainer.height() - $element.outerHeight() - cornerHeight);
        }

        if ($element.position().left !== x || $element.position().top !== y) {
            $element
                .attr(propChanged, '')
                .attr(propChanged, $element[0].outerHTML)
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
                .html($draggedElement.attr('id'))
                .attr(propChanged, '')
                .attr(propChanged, $draggedElement[0].outerHTML);
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
