fs = require('fs');
if (fs.existsSync('.env.test')) {
  let stream = fs.createReadStream('.env.test')
    .pipe(fs.createWriteStream('.env'));

  stream.on('close', () => {
    fs.unlink('.env.test');
  });    
}
