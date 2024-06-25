const crypto = require('crypto');


const generatedRandomString = (length) => {
  return crypto.pseudoRandomBytes(length).toString('hex');
}

const generated_string = generatedRandomString(16);
console.log(generated_string);