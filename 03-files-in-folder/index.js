const { stdout } = process;
const fs = require('fs');

try {
  fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, (error, files) => {
    for (const file of files) {
      if (!file.isDirectory()) {
        stdout.write(file.name + '\t');
        console.log(file);
      }
    }
  });
} catch (err) {
  console.error(err);
}