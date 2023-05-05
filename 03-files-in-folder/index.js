const { stdout } = process;
const fs = require('fs');
const path = require('path');

try {
  const pathDir = path.join('03-files-in-folder', 'secret-folder');
  fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
    for (const file of files) {
      if (file.isFile()) {
        fs.stat(path.join(pathDir, file.name), (err, stats) => {
          let name = path.basename(file.name);
          let extname = path.extname(file.name);
          name = name.replace(extname, '');
          extname = extname.slice(1);

          stdout.write(name + ' - ');
          stdout.write(extname + ' - ');
          stdout.write(stats.size / 1024 + 'kb\n');
        });
      }
    }
  });
} catch (err) {
  console.error(err);
}