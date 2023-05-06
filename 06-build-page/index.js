const fs = require('fs');
const path = require('path');

const pathDir = path.join('06-build-page', 'project-dist');
const pathNewHtml = path.join(pathDir, 'index.html');
const pathTemplateHtml = path.join('06-build-page', 'template.html');
const pathDirComponents = path.join('06-build-page', 'components');
const pathDirStyles = path.join('06-build-page', 'styles');
const pathBundleCSS = path.join(pathDir, 'styles.css');
let newData = '';

const collectStyles = (dirStyles, bundle) => {
  fs.readdir(dirStyles, {withFileTypes: true}, (error, files) => {
    fs.writeFile(bundle, '', () => null);
    for (const file of files) {
      if (file.isFile() && path.extname(file.name).toLowerCase() === '.css') {
        fs.readFile(path.join(dirStyles, file.name), 'utf-8', (err, data) => {
          fs.appendFile(bundle, data + '\n', () => null);
        });
      }
    }
  });
};

fs.mkdir(pathDir, {recursive: true}, () => {
  fs.readFile(pathTemplateHtml, 'utf-8', (err, dataTemplate) => {
    newData = dataTemplate.toString();
    fs.readdir(pathDirComponents, {withFileTypes: true}, (error, files) => {
      for (const file of files) {
        if (file.isFile() && path.extname(file.name).toLowerCase() === '.html') {
          fs.readFile(path.join(pathDirComponents, file.name), 'utf-8', (err, dataComponent) => {
            const onlyNameFile = file.name.toLowerCase().replace('.html','');
            newData = newData.replace(`{{${onlyNameFile}}}`, dataComponent);
            fs.writeFile(pathNewHtml, newData, () => null);
          });
        }
      }
    });
  });
});