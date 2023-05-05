const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const copyDir = (pathDir, pathNewDir) => {
  fs.mkdir(pathNewDir, {recursive: true}, () => false );

  fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
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
};

const source = path.join('04-copy-directory', 'files');
const destination = path.join('04-copy-directory', 'files-copy');
copyDir(source, destination);
