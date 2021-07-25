const fs = require('fs');

function readFileSync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const student = JSON.parse(data);
      resolve(student);
    });
  });
}

module.exports = { readFileSync };
