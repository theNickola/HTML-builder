const fs = require('fs');
const path = require('path');

const pathDir = path.join('06-build-page', 'project-dist');
const pathNewHtml = path.join(pathDir, 'index.html');
const pathTemplateHtml = path.join('06-build-page', 'template.html');
const pathDirComponents = path.join('06-build-page', 'components');

fs.mkdir(pathDir, {recursive: true}, () => {
  fs.writeFile(pathNewHtml, '', () => {
    fs.readFile(pathTemplateHtml, 'utf-8', (err, dataTemplate) => {
      if(!err) console.log(dataTemplate);
      console.log('********************************************');
      fs.readdir(pathDirComponents, {withFileTypes: true}, (error, files) => {
        for (const file of files) {
          if (file.isFile() && path.extname(file.name).toLowerCase() === '.html') {
            fs.readFile(path.join(pathDirComponents, file.name), 'utf-8', (err, dataComponent) => {
              if(!err) console.log(dataComponent);
              console.log('********************************************');
            });
          }
        }
      });
    });
  });
});