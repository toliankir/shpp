const regExp = {};
Object.defineProperty(regExp, 'ip', {
    value: /^(([0-9]{1,2}|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(([0-9]{1,2}|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])$)/
});
Object.defineProperty(regExp, 'email', {
    value: /^[^ @]+@[^ @]+\.[^ @\d]{2,}$/
});
Object.defineProperty(regExp, 'url', {
    value: /^(\w+:[\/]{2})[^ @]+\.[^ @\d]{2,}$/
});
Object.defineProperty(regExp, 'date', {
    value: /^(([0-2][0-9]|3[0-1])\/(0[13578]|1[02])|((([0-2][0-9]|30)\/(0[469]|11)))|([0-2][0-9]\/02))\/[0-9]{4}$/
});
Object.defineProperty(regExp, 'time', {
    value: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
});

const okClass = 'ok';
const errorClass = 'error';
const jsOkMsg = 'JS: Ok';
const jsErrorMsg = 'JS: Error';
const phpOkMsg = 'PHP: Ok';
const phpErrorMsg = 'PHP: Error';

document.addEventListener('input', (el) => {
    const elementId = el.target.id;
    if (elementId in regExp) {
        testRegExp(el, elementId);
    }
});

function testRegExp(el, regExpId) {
    testJs(el, regExp[regExpId]);
    testPhp(el, regExpId);
}

function testJs(el, regExp) {
    const jsIndicator = document.getElementById(`js-${el.target.id}`);
    if (regExp.test(el.target.value)) {
        jsIndicator.innerText = jsOkMsg;
        jsIndicator.className = okClass;
        return;
    }
    jsIndicator.innerText = jsErrorMsg;
    jsIndicator.className = errorClass;
}

function testPhp(el, regExp) {
    const phpIndicator = document.getElementById(`php-${el.target.id}`);

    $.ajax({
        url: 'regexp.php',
        type: 'POST',
        data: {
            str: el.target.value,
            regexp: regExp
        },
        dataType: 'json'
    })
        .done((jsonData) => {
            if (jsonData.status) {
                phpIndicator.innerText = phpOkMsg;
                phpIndicator.className = okClass;
                return;
            }
            phpIndicator.innerText = phpErrorMsg;
            phpIndicator.className = errorClass;
        });
}