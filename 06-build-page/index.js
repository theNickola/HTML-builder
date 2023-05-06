const fs = require('fs');
const path = require('path');

const pathDir = path.join('06-build-page', 'project-dist');
const pathNewHtml = path.join(pathDir, 'index.html');

fs.mkdir(pathDir, {recursive: true}, () => {
  fs.writeFile(pathNewHtml, '', () => null);
});