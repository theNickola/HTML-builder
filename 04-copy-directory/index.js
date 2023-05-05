const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const copyDir = (pathDir, pathNewDir) => {
  fs.mkdir(pathNewDir, {recursive: true}, () => false );

  fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
    for (const file of files) {
      if (file.isFile()) {
        fsPromises.copyFile(
          path.join('04-copy-directory', 'files', file.name), 
          path.join('04-copy-directory', 'files-copy', file.name));
      }
      else if (file.isDirectory())
        fs.mkdir(path.join('04-copy-directory/files-copy',file.name), {recursive: true}, () => false );
    }
  });
};

const source = path.join('04-copy-directory', 'files');
const destination = path.join('04-copy-directory', 'files-copy');
copyDir(source, destination);
