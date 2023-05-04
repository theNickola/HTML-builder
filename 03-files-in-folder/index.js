const { stdout } = process;
const fs = require('fs');

try {
  fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, (error, files) => {
    for (const file of files) {
      if (file.isFile()) {
        fs.stat('./03-files-in-folder/secret-folder/' + file.name, (err, stats) => {
          stdout.write(file.name + '\t');
          stdout.write(stats.size / 1024 + 'kb\n');
        });
        console.log(file);
      }
    }
  });
} catch (err) {
  console.error(err);
}