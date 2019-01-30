const inputText = document.getElementById('input-text');
const output = document.getElementById('output');
const inputRegExp = document.getElementById('regexp');
const inputRegExpFlag = document.getElementById('regexp_flags');

document.addEventListener('input', () => {
    inputRegExp.className = '';
    inputRegExpFlag.className = '';
    try {
        markText(inputRegExp.value, inputRegExpFlag.value);
    } catch (err) {
        if (err.toString().indexOf('Invalid flags supplied') !== -1) {
            inputRegExpFlag.className = 'error';
            return;
        }
        inputRegExp.className = 'error';
    }
});

function markText(regStr, regFlag) {
    const regExp = new RegExp(regStr, regFlag);
    output.innerHTML = inputText.value.replace(regExp, (el) => {
        return `<mark>${el}</mark>`;
    });
}