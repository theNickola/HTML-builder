const fs = require('fs');
const path = require('path');

const pathDir = path.join('06-build-page', 'project-dist');
const pathNewHtml = path.join(pathDir, 'index.html');
const pathTemplateHtml = path.join('06-build-page', 'template.html');

fs.mkdir(pathDir, {recursive: true}, () => {
  fs.writeFile(pathNewHtml, '', () => {
    fs.readFile(pathTemplateHtml, 'utf-8', (err, data) => {
      if(!err) console.log(data);
    });
  });
});