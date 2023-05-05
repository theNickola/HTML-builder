const fs = require('fs');
const path = require('path');

const pathDir = path.join('05-merge-styles', 'styles');
fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
  for (const file of files) {
    if (path.extname(file.name).toLowerCase() === '.css') {
      console.log(file.name);
    }
  }
});