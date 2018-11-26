const inputText = document.getElementById('input-text');
const output = document.getElementById('output');
const inputRegExp = document.getElementById('regexp');

document.addEventListener('input', () => {
    try {
        markText(inputRegExp.value);
        inputRegExp.className = '';
    } catch (e) {
        markText();
        inputRegExp.className = 'error';
    }
});

function markText(regStr) {
    const regExp = new RegExp(regStr, 'g');
    output.innerHTML = inputText.value.replace(regExp, (el) => {
        return `<mark>${el}</mark>`;
    });
}