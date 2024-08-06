const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const version = packageJson.version;

const versionJson = {
  version: version
};

fs.writeFileSync(
  path.join(__dirname, 'src/assets/version.json'),
  JSON.stringify(versionJson, null, 2)
);

console.log(`Version ${version} written to src/assets/version.json`);
