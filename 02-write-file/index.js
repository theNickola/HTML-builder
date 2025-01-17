const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join('02-write-file', 'text.txt'));
stdout.write('Приветствую! Введи какой-нибудь текст:\n');
stdin.on('data', text => {
  if (text.toString().trim()  === 'exit') {
    stdout.write('Прощайте!');
    process.exit();
  }
  else output.write(text);
});

process.on('SIGINT', () => {
  stdout.write('Прощайте!');
  process.exit();
});