const fs = require('fs');
const path = require('path');

const pathDir = path.join('06-build-page', 'project-dist');

fs.mkdir(pathDir, {recursive: true}, () => false );