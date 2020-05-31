const POLISH_LANGUAGE = 'pl';
const ENGLISH_LANGUAGE = 'en';
let IS_UPPER_CASE = false;

function getCookie(name = 'lang') {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.pop().split(';').shift();
}

let cookie = getCookie('lang');
if (cookie === '') {
  document.cookie = `lang=${POLISH_LANGUAGE}`;
  cookie = `${POLISH_LANGUAGE}`;
}

class Key {
  constructor (text, size, alternativeText = '') {
    this.text = text.toLowerCase();
    this.displayText = this.text.length < 2
      ? text.toUpperCase()
      : text.charAt(0).toUpperCase() + text.slice(1);
    this.color = '#947cb0';
    this.size = size;
    this.alternativeText = alternativeText;
    this.isSpecialKey = text.length > 1;
    this.isLetter = text.length === 1 && text.match(/[a-z]/i);
    this.isHidden = false;
    this.perform = this.text.length < 2 ? (x) => {
      let output = x;
      if (IS_UPPER_CASE) {
        output = x.toUpperCase();
      }
      document.getElementById('textArea').value += output;
    }
      : () => { };
  }

  setDarkGrayColor() {
    this.color = '#736598';
    return this;
  }

  setDisplayText(input) {
    this.displayText = input;
    return this;
  }

  setPerformAction(action) {
    this.perform = action;
    return this;
  }

  getDisplayText() {
    return this.displayText;
  }

  getText () {
    if (IS_UPPER_CASE) {
      return this.text.toUpperCase();
    } return this.text;
  }

  getSize (width) {
    return this.size * width;
  }

  getColor() {
    return this.color;
  }

  getalternativeText() {
    return this.alternativeText;
  }

  setHiddenLetter(originalKey) {
    this.originalKey = originalKey;
    this.isHidden = true;
    return this;
  }
}

function backspaceAction() {
  const textAreaElement = document.getElementById('textArea');
  textAreaElement.value = textAreaElement.value.slice(0, -1);
}

function moveCursor(move) {
  const element = document.getElementById('textArea');
  element.focus();
  if (element.selectionEnd > 0 || element.selectionEnd > element.value.length) {
    element.selectionEnd += move;
  } if (element.selectionEnd === element.value.length) {
    element.selectionEnd += move;
  }
}

let keys;
if (cookie === POLISH_LANGUAGE) {
  keys = [
    new Key('§', 1, '£'),
    new Key('£', 1).setHiddenLetter('§'),
    new Key('1', 1, '!'),
    new Key('!', 1).setHiddenLetter('1'),
    new Key('2', 1, '@'),
    new Key('@', 1).setHiddenLetter('2'),
    new Key('3', 1, '#'),
    new Key('#', 1).setHiddenLetter('3'),
    new Key('4', 1, '$'),
    new Key('$', 1).setHiddenLetter('4'),
    new Key('5', 1, '%'),
    new Key('%', 1).setHiddenLetter('5'),
    new Key('6', 1, '^'),
    new Key('^', 1).setHiddenLetter('6'),
    new Key('7', 1, '&'),
    new Key('&', 1).setHiddenLetter('7'),
    new Key('8', 1, '*'),
    new Key('*', 1).setHiddenLetter('8'),
    new Key('9', 1, '('),
    new Key('(', 1).setHiddenLetter('9'),
    new Key('0', 1, ')'),
    new Key(')', 1).setHiddenLetter('0'),
    new Key('-', 1, '_'),
    new Key('_', 1).setHiddenLetter('-'),
    new Key('=', 1, '+'),
    new Key('+', 1).setHiddenLetter('='),
    new Key('backspace', 2.4).setDarkGrayColor().setPerformAction(backspaceAction),
    new Key('tab', 1.2).setDarkGrayColor().setPerformAction(() => { document.getElementById('textArea').value += '\t'; }),
    new Key('q', 1),
    new Key('w', 1),
    new Key('e', 1),
    new Key('r', 1),
    new Key('t', 1),
    new Key('y', 1),
    new Key('u', 1),
    new Key('i', 1),
    new Key('o', 1),
    new Key('ó', 1).setHiddenLetter('o'),
    new Key('p', 1),
    new Key('[', 1, '{'),
    new Key('{', 1).setHiddenLetter(']'),
    new Key(']', 1, '}'),
    new Key('}', 1).setHiddenLetter(']'),
    new Key('enter', 2.2).setDarkGrayColor().setPerformAction(() => { document.getElementById('textArea').value += '\n'; }),
    new Key('capsLock', 2.4).setDarkGrayColor().setPerformAction(() => { IS_UPPER_CASE = !IS_UPPER_CASE; }),
    new Key('a', 1),
    new Key('ą', 1).setHiddenLetter('a'),
    new Key('s', 1),
    new Key('ś', 1).setHiddenLetter('s'),
    new Key('d', 1),
    new Key('f', 1),
    new Key('g', 1),
    new Key('h', 1),
    new Key('j', 1),
    new Key('k', 1),
    new Key('l', 1),
    new Key('ł', 1).setHiddenLetter('l'),
    new Key(';', 1, ':'),
    new Key('\'', 1, '"'),
    new Key('\\', 1, '|'),
    new Key('del', 1).setDarkGrayColor(),
    new Key('shift', 2.4).setDarkGrayColor(),
    new Key('`', 1, '~'),
    new Key('z', 1),
    new Key('ż', 1).setHiddenLetter('z'),
    new Key('x', 1),
    new Key('ź', 1).setHiddenLetter('x'),
    new Key('c', 1),
    new Key('ć', 1).setHiddenLetter('c'),
    new Key('v', 1),
    new Key('b', 1),
    new Key('n', 1),
    new Key('ń', 1).setHiddenLetter('n'),
    new Key('m', 1),
    new Key(',', 1, '<'),
    new Key('.', 1, '>'),
    new Key('/', 1, '?'),
    new Key('arrowUp', 1).setDisplayText('▲').setDarkGrayColor(),
    new Key('shift', 1).setDarkGrayColor(),
    new Key('control', 1.5).setDarkGrayColor(),
    new Key('cmd', 1).setDarkGrayColor(),
    new Key('alt', 1).setDarkGrayColor(),
    new Key(' ', 7.4).setDarkGrayColor().setDisplayText(' ').setPerformAction(() => { document.getElementById('textArea').value += ' '; }),
    new Key('cmd', 1.5).setDarkGrayColor(),
    new Key('alt', 1).setDarkGrayColor(),
    new Key('arrowLeft', 1).setDarkGrayColor().setDisplayText('◄').setPerformAction(() => moveCursor(-1)),
    new Key('arrowDown', 1).setDarkGrayColor().setDisplayText('▼'),
    new Key('arrowRight', 1).setDarkGrayColor().setDisplayText('►').setPerformAction(() => moveCursor(1)),
  ];
}

if (cookie === ENGLISH_LANGUAGE) {
  keys = [
    new Key('§', 1, '£'),
    new Key('£', 1).setHiddenLetter('§'),
    new Key('1', 1, '!'),
    new Key('!', 1).setHiddenLetter('1'),
    new Key('2', 1, '@'),
    new Key('@', 1).setHiddenLetter('2'),
    new Key('3', 1, '#'),
    new Key('#', 1).setHiddenLetter('3'),
    new Key('4', 1, '$'),
    new Key('$', 1).setHiddenLetter('4'),
    new Key('5', 1, '%'),
    new Key('%', 1).setHiddenLetter('5'),
    new Key('6', 1, '^'),
    new Key('^', 1).setHiddenLetter('6'),
    new Key('7', 1, '&'),
    new Key('&', 1).setHiddenLetter('7'),
    new Key('8', 1, '*'),
    new Key('*', 1).setHiddenLetter('8'),
    new Key('9', 1, '('),
    new Key('(', 1).setHiddenLetter('9'),
    new Key('0', 1, ')'),
    new Key(')', 1).setHiddenLetter('0'),
    new Key('-', 1, '_'),
    new Key('_', 1).setHiddenLetter('-'),
    new Key('=', 1, '+'),
    new Key('+', 1).setHiddenLetter('='),
    new Key('backspace', 2.4).setDarkGrayColor().setPerformAction(backspaceAction),
    new Key('tab', 1.2).setDarkGrayColor().setPerformAction(() => { document.getElementById('textArea').value += '\t'; }),
    new Key('q', 1),
    new Key('w', 1),
    new Key('e', 1),
    new Key('r', 1),
    new Key('t', 1),
    new Key('y', 1),
    new Key('u', 1),
    new Key('i', 1),
    new Key('o', 1),
    new Key('p', 1),
    new Key('[', 1, '{'),
    new Key('{', 1).setHiddenLetter(']'),
    new Key(']', 1, '}'),
    new Key('}', 1).setHiddenLetter(']'),
    new Key('enter', 2.2).setDarkGrayColor().setPerformAction(() => { document.getElementById('textArea').value += '\n'; }),
    new Key('capsLock', 2.4).setDarkGrayColor().setPerformAction(() => { IS_UPPER_CASE = !IS_UPPER_CASE; }),
    new Key('a', 1),
    new Key('s', 1),
    new Key('d', 1),
    new Key('f', 1),
    new Key('g', 1),
    new Key('h', 1),
    new Key('j', 1),
    new Key('k', 1),
    new Key('l', 1),
    new Key(';', 1, ':'),
    new Key('\'', 1, '"'),
    new Key('\\', 1, '|'),
    new Key('del', 1).setDarkGrayColor(),
    new Key('shift', 2.4).setDarkGrayColor(),
    new Key('`', 1, '~'),
    new Key('z', 1),
    new Key('x', 1),
    new Key('c', 1),
    new Key('v', 1),
    new Key('b', 1),
    new Key('n', 1),
    new Key('m', 1),
    new Key(',', 1, '<'),
    new Key('.', 1, '>'),
    new Key('/', 1, '?'),
    new Key('arrowUp', 1).setDisplayText('▲').setDarkGrayColor().setPerformAction(() => moveCursor(-1)),
    new Key('shift', 1).setDarkGrayColor(),
    new Key('control', 1.5).setDarkGrayColor(),
    new Key('cmd', 1).setDarkGrayColor(),
    new Key('alt', 1).setDarkGrayColor(),
    new Key(' ', 7.4).setDarkGrayColor().setDisplayText(' ').setPerformAction(() => { document.getElementById('textArea').value += ' '; }),
    new Key('cmd', 1.5).setDarkGrayColor(),
    new Key('alt', 1).setDarkGrayColor(),
    new Key('arrowLeft', 1).setDarkGrayColor().setDisplayText('◄').setPerformAction(() => moveCursor(-1)),
    new Key('arrowDown', 1).setDarkGrayColor().setDisplayText('▼'),
    new Key('arrowRight', 1).setDarkGrayColor().setDisplayText('►').setPerformAction(() => moveCursor(1)),
  ];
}

const languageInfo = document.createElement('DIV');
languageInfo.innerHTML = 'Press ctrl + l to change language';
languageInfo.style.color = 'gray';
languageInfo.style.fontFamily = 'verdena, sans-serif';

document.body.appendChild(languageInfo);

const textArea = document.createElement('TEXTAREA');
textArea.id = 'textArea';
textArea.style.width = '500px';
textArea.style.height = '100px';
textArea.style.margin = '20px';

document.body.appendChild(textArea);

const currentLanguage = document.createElement('DIV');
currentLanguage.id = 'currentLanguage';
currentLanguage.style.width = '50px';
currentLanguage.style.height = '50px';
currentLanguage.style.borderRadius = '25px';
currentLanguage.style.marginLeft = '850px';
currentLanguage.style.marginBottom = '20px';
currentLanguage.style.fontFamily = 'verdena, sans-serif';
currentLanguage.style.color = 'gray';
currentLanguage.style.display = 'flex';
currentLanguage.style.alignItems = 'center';
currentLanguage.style.justifyContent = 'center';
if (cookie === POLISH_LANGUAGE) {
  currentLanguage.innerHTML = 'POL';
} else if (cookie === ENGLISH_LANGUAGE) {
  currentLanguage.innerHTML = 'EN';
}
document.body.appendChild(currentLanguage);

const keyboardArea = document.createElement('DIV');
keyboardArea.id = 'keyboardArea';
keyboardArea.style.display = 'flex';
keyboardArea.style.flexDirection = 'column';
keyboardArea.style.alignItems = 'center';

keyboardArea.appendChild(currentLanguage);


const keyboard = document.createElement('DIV');
keyboard.id = 'keyboard';
keyboard.style.display = 'flex';
keyboard.style.flexWrap = 'wrap';
keyboard.style.width = '920px';

keyboardArea.appendChild(keyboard);
document.body.appendChild(keyboardArea);

function activateKey(key) {
  const element = document.getElementById(key.text);
  element.style.background = 'pink';
  element.style.transition = 'background-color 200ms linear';
  key.perform(key.getText());
  if (key.text === 'capslock' && IS_UPPER_CASE) {
    return;
  }
  setTimeout(() => { element.style.background = key.getColor(); }, 500);
}


for (let i = 0; i < keys.length; i += 1) {
  const htmlKey = document.createElement('DIV');
  const text = keys[i].getText();

  htmlKey.id = text;
  htmlKey.style.height = '50px';
  htmlKey.style.width = `${keys[i].getSize(50)}px`;
  htmlKey.style.borderRadius = '5px';
  htmlKey.style.margin = '5px';
  htmlKey.style.background = keys[i].getColor();
  htmlKey.style.display = 'flex';
  htmlKey.style.alignItems = 'center';
  htmlKey.style.justifyContent = 'center';
  htmlKey.style.animation = 'impuls 1s 2';

  htmlKey.addEventListener('click', () => activateKey(keys[i]));

  const htmlAlternativeText = document.createElement('DIV');
  htmlAlternativeText.innerHTML = keys[i].getalternativeText();
  htmlAlternativeText.style.color = '#fff';
  htmlAlternativeText.style.position = 'absolute';
  htmlAlternativeText.style.marginLeft = '-16px';
  htmlAlternativeText.style.marginTop = '-14px';
  htmlAlternativeText.style.fontFamily = 'verdena, sans-serif';

  htmlKey.appendChild(htmlAlternativeText);

  const htmlLetter = document.createElement('DIV');
  htmlLetter.innerHTML = keys[i].getDisplayText();
  htmlLetter.style.fontFamily = 'verdena, sans-serif';
  htmlLetter.style.color = '#fff';

  htmlKey.appendChild(htmlLetter);

  document.getElementById('keyboard').appendChild(htmlKey);
  document.getElementById('keyboardArea').appendChild(currentLanguage);
  document.getElementById('keyboardArea').appendChild(textArea);
  document.getElementById('keyboardArea').appendChild(keyboard);
  if (keys[i].isHidden) {
    htmlKey.style.display = 'none';
  }
}


document.body.addEventListener('keydown', (x) => {
  const id = x.key.toLowerCase();
  const element = document.getElementById(id);
  const key = keys.filter((k) => k.text === id)[0];

  element.style.background = 'pink';

  if (key.isSpecialKey) {
    key.perform();
  } else if (x.shiftKey) {
    if (key.isLetter) {
      key.perform(x.key.toUpperCase());
    } else {
      const originalKeyElement = document.getElementById(key.originalKey);
      originalKeyElement.style.background = 'pink';
      key.perform(key.getText());
    }
  } else if (x.altKey) {
    const originalKeyElement = document.getElementById(key.originalKey);
    originalKeyElement.style.background = 'pink';
    key.perform(key.getText());
  } else {
    key.perform(x.key);
  }
});

document.body.addEventListener('keyup', (x) => {
  let id = x.key.toLowerCase();
  const key = keys.filter((k) => k.text === id)[0];

  if (key.originalKey) {
    id = key.originalKey;
  } else if (id === 'capslock') {
    key.perform();
  }

  const element = document.getElementById(id);
  element.style.background = keys.filter((k) => k.text === id)[0].getColor();
});

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'l' && e.ctrlKey) {
    if (getCookie() === POLISH_LANGUAGE) {
      document.cookie = `lang=${ENGLISH_LANGUAGE}`;
    } else if (getCookie() === ENGLISH_LANGUAGE) {
      document.cookie = `lang=${POLISH_LANGUAGE}`;
    }
  }
});

const textAreaElement = document.getElementById('textArea');
textAreaElement.addEventListener('keydown', (e) => {
  const id = e.key.toLowerCase();
  const key = keys.filter((k) => k.getText() === id)[0];
  if (!key.isSpecialKey) {
    e.preventDefault();
  }
});
