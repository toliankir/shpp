const regExp = new Map([
    ['ip', /^(([0-9]{1,2}|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(([0-9]{1,2}|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])$)/],
    ['email', /^[^ @]+@[^ @]+\.[^ @]+$/],
    ['url', /^([a-zA-Z]+:[\/]{2}?).*$/],
    ['date', /^(([0-2][0-9]|3[0-1])\/(0[13578]|1[02])|((([0-2][0-9]|30)\/(0[469]|11)))|([0-2][0-9]\/02))\/[0-9]{4}$/],
    ['time', /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/]
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

async function testPhp(el, regExp) {
    const phpIndicator = document.getElementById(`php-${el.target.id}`);
    console.log(`${regExp.toString()}`);
    // const response = await fetch('regexp.php', {
    //     method: 'POST',
    //     headers: new Headers({
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }),
    //     body: JSON.stringify({
    //         str:el.target.value,
    //         regexp: regExp.toString()
    //     })
    // });
    //
    // const jsonData = await response.json();

    $.ajax({
        url: 'regexp.php',
        type: 'POST',
        data: {
            str: el.target.value,
            regexp: regExp.toString()
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