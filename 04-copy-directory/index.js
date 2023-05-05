const path = require('path');

const copyDir = () => {
  const fs = require('fs');
  fs.mkdir(path.join('04-copy-directory','files-copy'), {recursive: true}, () => false );
};

copyDir();
