const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const pathDir = path.join('06-build-page', 'project-dist');
const pathNewHtml = path.join(pathDir, 'index.html');
const pathTemplateHtml = path.join('06-build-page', 'template.html');
const pathDirComponents = path.join('06-build-page', 'components');
const pathDirStyles = path.join('06-build-page', 'styles');
const pathBundleCSS = path.join(pathDir, 'style.css');
const pathAssets = path.join('06-build-page', 'assets');
const pathProjectAssets = path.join(pathDir, 'assets');
let newData = '';

const copyDir = (pathDir, pathNewDir) => {
  fs.rm(pathNewDir, { recursive: true, force: true }, () => {
    fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
      fs.mkdir(pathNewDir, {recursive: true}, () => false );
      for (const file of files) {
        if (file.isFile()) {
          fsPromises.copyFile(
            path.join(pathDir, file.name), 
            path.join(pathNewDir, file.name));
        }
        else if (file.isDirectory()) {
          fs.mkdir(path.join(pathNewDir, file.name), {recursive: true}, () => false );
          copyDir(path.join(pathDir, file.name), path.join(pathNewDir, file.name));
        }
      }
    });
  });
};

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
fs.rm(pathDir, { recursive: true, force: true }, () => {
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
    collectStyles(pathDirStyles, pathBundleCSS);
    copyDir(pathAssets, pathProjectAssets);
  });
});