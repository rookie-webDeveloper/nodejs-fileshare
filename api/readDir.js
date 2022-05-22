const { join } = require('path'),
  { stat, readdir } = require('fs'),
  { contentType } = require('mime-types');

const baseDir = process.cwd();

/**
 * @param {Path} DIRNAME 
 * @param {fileDetailsArray} detailsArray 
 * @param {function=} myCallback callback function
 */
function addFileCount(DIRNAME, detailsArray, myCallback) {
  for (let x = 0; x < detailsArray.length; x++) {
    readdir(
      join(baseDir, DIRNAME, detailsArray[x]['name']),
      (err, files) => {
        if (err) {
          if (detailsArray[x]['kind'] != 'file') {
            detailsArray[x]['fileCount'] = 'error';
          }
        } else {
          detailsArray[x]['fileCount'] = files.length;
        }
        if (x + 1 == detailsArray.length) {
          myCallback(null, detailsArray);
        }
      }
    );
  }
}

/**
 * 
 * @typedef {Array} fileDetailsArray
 * @property {string} name file name
 * @property {boolean} dotFile indicates if file name starts with dot
 * @property {number} FileCount number of files in folder
 * @property {Path} filePath file path
 * @property {string} kind indicates folder or file
 * @property {number} size size of file
 * @property {string} mimeType file mime type
 */

/**
 * @param {Path} DIRNAME 
 * @param {fileDetailsArray} detailsArray 
 * @param {function=} myCallback callback function
 */
function addFileSizeAndKind(DIRNAME, detailsArray, myCallback) {
  for (let x = 0; x < detailsArray.length; x++) {
    //do not go to the target of the link
    stat(join(baseDir, DIRNAME, detailsArray[x]['name']), (err, stats) => {
      detailsArray[x]['mimeType'] = false;
      if (err) {
        detailsArray[x]['size'] =
          detailsArray[x]['fileCount'] =
          detailsArray[x]['kind'] =
            'error';
      } else {
        detailsArray[x]['mimeType'] = contentType(detailsArray[x]['name']);
        detailsArray[x]['size'] = stats.size;
        detailsArray[x]['fileCount'] = 0;
        if (stats.isDirectory()) {
          detailsArray[x]['kind'] = 'folder';
        } else {
          detailsArray[x]['kind'] = 'file';
        }
        if (x + 1 == detailsArray.length) {
          addFileCount(DIRNAME, detailsArray, myCallback);
        }
      }
    });
  }
}

/**
 *
 * @param {Path} DIRNAME Path name to read file names
 * @param {function=} myCallback callback function
 * @returns {fileDetailsArray}
 */
function readDirDetails(DIRNAME, myCallback) {
  readdir(join(baseDir, DIRNAME), (err, files) => {
    if (err) {
      if (myCallback) myCallback(err, null);
    } else {
      let detailsArray = [];
      for (let x = 0; x < files.length; x++) {
        let fileObj = {};
        detailsArray.push(fileObj);
        fileObj['name'] = files[x];
        fileObj['filePath'] = join(DIRNAME, files[x]);
        if (files[x][0] == '.') {
          fileObj['dotFile'] = true;
        } else {
          fileObj['dotFile'] = false;
        }
        if (x + 1 == files.length) {
          addFileSizeAndKind(DIRNAME, detailsArray, myCallback);
        }
      }
    }
  });
}

exports.readDirDetails = readDirDetails;
