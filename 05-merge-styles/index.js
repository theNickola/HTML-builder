const fs = require('fs');
const path = require('path');

const pathDir = path.join('05-merge-styles', 'styles');
const pathBundleCSS = path.join('05-merge-styles', 'project-dist', 'bundle.css');

fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
  fs.writeFile(pathBundleCSS, '', () => null);
  for (const file of files) {
    if (file.isFile() && path.extname(file.name).toLowerCase() === '.css') {
      fs.readFile(path.join(pathDir, file.name), 'utf-8', (err, data) => {
        fs.appendFile(pathBundleCSS, data + '\n', () => null);
      });
    }
  }
});