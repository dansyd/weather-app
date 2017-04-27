fs = require('fs');
fs.createReadStream('.env.test')
  .pipe(fs.createWriteStream('.env'));
