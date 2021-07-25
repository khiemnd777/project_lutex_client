const fs = require('fs');

function readFileSync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const student = JSON.parse(data);
        resolve(student);
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = { readFileSync };
