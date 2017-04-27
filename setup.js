fs = require('fs');
let stream = fs.createReadStream('.env.test')
  .pipe(fs.createWriteStream('.env'));

stream.on('close', () => {
  fs.unlink('.env.test');
});
