const fs = require('fs');

if (process.env.ADBKIT_DUMP) {
  const out = fs.createWriteStream('adbkit.dump');
  module.exports = function(chunk) {
    out.write(chunk);
    return chunk;
  };
} else {
  module.exports = chunk => chunk;
}
