fs = require('fs');
fs.createReadStream('.env.test')
  .pipe(fs.createWriteStream('.env'));

fs.on('close', () => {
  fs.unlink('.env.test');
});
