/* eslint-disable prefer-promise-reject-errors */
const util = require('util');
const gc = require('../config');

const bucket = gc.bucket('jaminpadi-bucket');

const { format } = util;

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;

  const blob = bucket.file(originalname.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('finish', async (data) => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
    );
    try {
      await bucket.file(originalname).makePublic();
    } catch {
      resolve(publicUrl);
    }
    resolve(publicUrl);
  })
    .on('error', (err) => {
      reject(console.log(err));
    })
    .end(buffer);
});

module.exports = uploadImage;
