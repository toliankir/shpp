const regExp = new Map([
    ['ip', /^(([0-9]{1,2}|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(([0-9]{1,2}|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])$)/],
    ['email', /^[^ @]+@[^ @]+\.[^ @]+$/],
    ['time', /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/]
]);

const okClass = 'ok';
const errorClass = 'error';
const jsOkMsg = 'JS: Ok';
const jsErrorMsg = 'JS: Error';
const phpOkMsg = 'PHP: Ok';
const phpErrorMsg = 'PHP: Error';

document.addEventListener('input', (el) => {
    const elementId = el.target.id;
    if (regExp.has(elementId)) {
        const regExpById = regExp.get(elementId);
        testRegExp(el, regExpById);
    }
});

function testRegExp(el, regExp) {
    testJs(el, regExp);
    testPhp(el, regExp);
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
        method: 'POST',
        dataType: 'json',
        data: {
            str: el.target.value,
            regexp: regExp
        },
        success: (data) => {
            if (data.status) {
                phpIndicator.innerText = phpOkMsg;
                phpIndicator.className = okClass;
                return;
            }
            phpIndicator.innerText = phpErrorMsg;
            phpIndicator.className = errorClass;
        },
        error: () => {
            console.log('Php request error');
        }
    });

}