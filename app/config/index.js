const Cloud = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, './storage-keys.json');

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'jamin-padi-app',
});
console.log('storage');
console.log(storage);

module.exports = storage;
